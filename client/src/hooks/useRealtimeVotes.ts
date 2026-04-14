import { useEffect, useRef, useState, useCallback } from 'react';
import { trpc } from '@/lib/trpc';

export interface VoteUpdate {
  nomineeId: number;
  upvotes: number;
  downvotes: number;
  score: number;
  userVote?: 'up' | 'down' | null;
}

interface UseRealtimeVotesOptions {
  enabled?: boolean;
  onVoteUpdate?: (update: VoteUpdate) => void;
}

export function useRealtimeVotes({ enabled = true, onVoteUpdate }: UseRealtimeVotesOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;

  const connect = useCallback(() => {
    if (!enabled) return;

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource('/api/votes/stream');
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as VoteUpdate;
        setLastUpdate(new Date());
        onVoteUpdate?.(data);
      } catch (e) {
        console.error('SSE parse error:', e);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();

      // Attempt reconnection with exponential backoff
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttemptsRef.current++;
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
        reconnectTimeoutRef.current = setTimeout(connect, delay);
      }
    };
  }, [enabled, onVoteUpdate]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      eventSourceRef.current?.close();
    };
  }, [connect]);

  const close = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    eventSourceRef.current?.close();
    setIsConnected(false);
  }, []);

  return { isConnected, lastUpdate, close };
}

// Hook for optimistic vote updates with animation state
interface UseAnimatedVoteOptions {
  nomineeId: number;
  initialUpvotes: number;
  initialDownvotes: number;
}

interface VoteState {
  upvotes: number;
  downvotes: number;
  score: number;
  userVote: 'up' | 'down' | null;
  isAnimating: boolean;
  animationType: 'up' | 'down' | null;
}

export function useAnimatedVote({ nomineeId, initialUpvotes, initialDownvotes }: UseAnimatedVoteOptions) {
  const [state, setState] = useState<VoteState>({
    upvotes: initialUpvotes,
    downvotes: initialDownvotes,
    score: initialUpvotes - initialDownvotes,
    userVote: null,
    isAnimating: false,
    animationType: null,
  });

  const castVote = trpc.votes.cast.useMutation();
  const utils = trpc.useUtils();

  const handleVote = useCallback(async (voteType: 'up' | 'down') => {
    // Optimistic update
    setState(prev => {
      const isRemovingVote = prev.userVote === voteType;
      const isChangingVote = prev.userVote && prev.userVote !== voteType;
      
      let newUpvotes = prev.upvotes;
      let newDownvotes = prev.downvotes;
      let newUserVote: 'up' | 'down' | null = voteType;

      if (isRemovingVote) {
        // Remove vote
        if (voteType === 'up') newUpvotes--;
        else newDownvotes--;
        newUserVote = null;
      } else if (isChangingVote) {
        // Change vote type
        if (prev.userVote === 'up') newUpvotes--;
        else newDownvotes--;
        
        if (voteType === 'up') newUpvotes++;
        else newDownvotes++;
      } else {
        // New vote
        if (voteType === 'up') newUpvotes++;
        else newDownvotes++;
      }

      return {
        ...prev,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        score: newUpvotes - newDownvotes,
        userVote: newUserVote,
        isAnimating: true,
        animationType: voteType,
      };
    });

    // Trigger animation reset
    setTimeout(() => {
      setState(prev => ({ ...prev, isAnimating: false, animationType: null }));
    }, 600);

    // Actual API call
    try {
      await castVote.mutateAsync({ nomineeId, voteType });
      // Invalidate related queries
      utils.nominees.list.invalidate();
      utils.votes.myVotes.invalidate();
    } catch (error) {
      // Revert on error
      setState(prev => ({
        ...prev,
        upvotes: initialUpvotes,
        downvotes: initialDownvotes,
        score: initialUpvotes - initialDownvotes,
        userVote: null,
        isAnimating: false,
        animationType: null,
      }));
    }
  }, [nomineeId, initialUpvotes, initialDownvotes, castVote, utils]);

  const updateFromRealtime = useCallback((update: VoteUpdate) => {
    if (update.nomineeId !== nomineeId) return;
    
    setState(prev => ({
      ...prev,
      upvotes: update.upvotes,
      downvotes: update.downvotes,
      score: update.score,
      userVote: update.userVote ?? prev.userVote,
    }));
  }, [nomineeId]);

  return {
    ...state,
    handleVote,
    updateFromRealtime,
    isPending: castVote.isPending,
  };
}

// Hook for vote streaks and gamification
export interface VoteStreak {
  currentStreak: number;
  longestStreak: number;
  totalVotes: number;
  lastVoteDate: string | null;
  weeklyVotes: number;
  rank: string;
  nextRank: string;
  progressToNext: number;
  globalStats?: {
    totalVotes24h?: number;
    totalVoters?: number;
  };
}

const RANKS = [
  { name: 'Jester Novice', threshold: 0 },
  { name: 'Court Fool', threshold: 10 },
  { name: 'Royal Jester', threshold: 50 },
  { name: 'Master of Mirth', threshold: 100 },
  { name: 'Legendary Lolcow', threshold: 500 },
  { name: 'Supreme Jester', threshold: 1000 },
];

export function useVoteStreak() {
  const [streak, setStreak] = useState<VoteStreak>({
    currentStreak: 0,
    longestStreak: 0,
    totalVotes: 0,
    lastVoteDate: null,
    weeklyVotes: 0,
    rank: 'Jester Novice',
    nextRank: 'Court Fool',
    progressToNext: 0,
  });

  const { data: myVotes } = trpc.votes.myVotes.useQuery();

  useEffect(() => {
    if (!myVotes) return;

    const voteEntries = Object.entries(myVotes);
    const totalVotes = voteEntries.length;
    
    // Calculate current rank
    const currentRank = RANKS.slice().reverse().find(r => totalVotes >= r.threshold) || RANKS[0];
    const nextRankIndex = RANKS.findIndex(r => r.name === currentRank.name) + 1;
    const nextRank = RANKS[nextRankIndex] || currentRank;
    
    const progressToNext = nextRank.threshold > currentRank.threshold
      ? ((totalVotes - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100
      : 100;

    // Simple streak calculation (would be more sophisticated with real data)
    const today = new Date().toISOString().split('T')[0];
    const hasVotedToday = voteEntries.length > 0; // Simplified

    setStreak(prev => ({
      ...prev,
      totalVotes,
      rank: currentRank.name,
      nextRank: nextRank.name,
      progressToNext: Math.min(progressToNext, 100),
      weeklyVotes: voteEntries.length, // Simplified - would count actual weekly votes
    }));
  }, [myVotes]);

  return streak;
}

// Hook for leaderboard with rank change animations
export interface LeaderboardEntry {
  nomineeId: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  upvotes: number;
  downvotes: number;
  score: number;
  previousRank?: number;
  currentRank: number;
  rankChange: 'up' | 'down' | 'same';
}

export function useAnimatedLeaderboard(period: 'alltime' | 'week') {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [animatingRanks, setAnimatingRanks] = useState<Set<number>>(new Set());
  const previousEntriesRef = useRef<Map<number, number>>(new Map());

  const { data: nominees, isLoading, refetch } = trpc.nominees.list.useQuery({ period });
  const { data: myVotes } = trpc.votes.myVotes.useQuery();

  // Process nominees with rank change detection
  useEffect(() => {
    if (!nominees) return;

    const newEntries: LeaderboardEntry[] = nominees.map((nominee, idx) => {
      const currentRank = idx + 1;
      const previousRank = previousEntriesRef.current.get(nominee.nomineeId);
      
      let rankChange: 'up' | 'down' | 'same' = 'same';
      if (previousRank !== undefined) {
        if (currentRank < previousRank) rankChange = 'up';
        else if (currentRank > previousRank) rankChange = 'down';
      }

      return {
        ...nominee,
        currentRank,
        previousRank,
        rankChange,
      };
    });

    // Detect which ranks changed for animation
    const changedRanks = new Set<number>();
    newEntries.forEach(entry => {
      if (entry.rankChange !== 'same') {
        changedRanks.add(entry.nomineeId);
      }
    });

    if (changedRanks.size > 0) {
      setAnimatingRanks(changedRanks);
      setTimeout(() => setAnimatingRanks(new Set()), 1000);
    }

    // Update previous entries ref
    const newMap = new Map<number, number>();
    newEntries.forEach(entry => {
      newMap.set(entry.nomineeId, entry.currentRank);
    });
    previousEntriesRef.current = newMap;

    setEntries(newEntries);
  }, [nominees]);

  // Subscribe to real-time updates
  useRealtimeVotes({
    enabled: true,
    onVoteUpdate: (update) => {
      setEntries(prev => {
        const index = prev.findIndex(e => e.nomineeId === update.nomineeId);
        if (index === -1) return prev;

        const newEntries = [...prev];
        newEntries[index] = {
          ...newEntries[index],
          upvotes: update.upvotes,
          downvotes: update.downvotes,
          score: update.score,
        };

        // Re-sort by score
        newEntries.sort((a, b) => b.score - a.score);

        // Recalculate ranks
        return newEntries.map((entry, idx) => ({
          ...entry,
          currentRank: idx + 1,
        }));
      });
    },
  });

  return {
    entries,
    isLoading,
    animatingRanks,
    myVotes: myVotes || {},
    refetch,
  };
}
