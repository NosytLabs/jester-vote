import { useState, useCallback } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLegacyLoginUrl } from "@/const";
import { toast } from "sonner";
import Header from "@/components/Header";
import {
  SocialShareButtons,
  TheArcTimeline,
  NotableClipsSection,
  ControversiesSection,
  NewsSection,
  ExternalLinksSection,
  TweetSection,
  RedditSection,
  KickClipSection,
  KickLiveSection,
  BaseballCard,
} from "@/components";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { NomineePageSkeleton } from "@/components/SkeletonLoader";
import { useRealtimeVotes, useAnimatedVote } from "@/hooks/useRealtimeVotes";
import type { VoteUpdate } from "@/hooks/useRealtimeVotes";
import { VoteButtonPair } from "@/components/VoteButton";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowLeft, Send, Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LolcowPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");

  const { data: lolcow, isLoading, error, refetch } = trpc.nominees.getById.useQuery(
    { id },
    { enabled: !!id }
  );
  const voteHistory = lolcow?.voteHistory || [];
  const { data: comments, refetch: refetchComments } = trpc.comments.list.useQuery(
    { nomineeId: id },
    { enabled: !!id }
  );
  const { data: richData } = trpc.profile.getRichData.useQuery({ id }, { enabled: !!id });
  const { data: myVotes } = trpc.votes.myVotes.useQuery(undefined, { enabled: isAuthenticated });

  // Animated vote state with optimistic updates
  // Get initial vote counts from the lolcow data or default to 0
  const initialUpvotes = (lolcow as any)?.upvotes || 0;
  const initialDownvotes = (lolcow as any)?.downvotes || 0;

  const {
    upvotes,
    downvotes,
    score,
    userVote,
    isAnimating,
    animationType,
    handleVote,
    updateFromRealtime,
    isPending,
  } = useAnimatedVote({
    nomineeId: id,
    initialUpvotes,
    initialDownvotes,
  });

  // Real-time connection
  const { isConnected, lastUpdate } = useRealtimeVotes({
    enabled: true,
    onVoteUpdate: useCallback(
      (update: VoteUpdate) => {
        if (update.nomineeId === id) {
          updateFromRealtime(update);
        }
      },
      [id, updateFromRealtime]
    ),
  });

  const addComment = trpc.comments.add.useMutation({
    onSuccess: () => {
      setComment("");
      refetchComments();
    },
    onError: (e) => toast.error(e.message),
  });

  const onVoteClick = (voteType: "up" | "down") => {
    if (!isAuthenticated) {
      toast.error("Login with Kick to vote!", {
        action: {
          label: "Login",
          onClick: () => (window.location.href = getLegacyLoginUrl()),
        },
      });
      return;
    }
    handleVote(voteType);
  };

  if (isLoading) {
    return <NomineePageSkeleton />;
  }

  if (error || !lolcow) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="jester-border p-8 text-center text-destructive">
            Jester not found.
          </div>
        </main>
      </div>
    );
  }

  const myVote = myVotes?.[id] || userVote;
  const calculatedScore = score;

  // Get platform from lolcow name or default
  const getPlatform = (name: string): string => {
    const kickStreamers = ["Adin Ross", "TrainwrecksTV", "xQc", "N3on", "Nickmercs", "BruceDropEmOff"];
    const youtubeStreamers = ["IShowSpeed", "Sneako", "N3on"];
    if (kickStreamers.includes(name)) return "kick";
    if (youtubeStreamers.includes(name)) return "youtube";
    return "twitch";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main" className="container py-4 sm:py-6">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link href="/">
            <motion.span
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] cursor-pointer transition-colors"
              whileHover={{ x: -3 }}
            >
              <ArrowLeft size={12} /> BACK TO THE COURT
            </motion.span>
          </Link>
        </motion.div>

        {/* Social sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="jester-border-subtle bg-card p-2 mb-4"
        >
          <SocialShareButtons
            lolcowName={lolcow.name}
            lolcowId={id}
            description={lolcow.description ?? undefined}
          />
        </motion.div>

        {/* Baseball Card Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-6 mb-6"
        >
          {/* Baseball Card - Left side */}
          <div className="flex justify-center lg:justify-start">
            <BaseballCard
              lolcow={{
                name: lolcow.name,
                platform: getPlatform(lolcow.name),
                category: "Jester",
                imageUrl: lolcow.imageUrl || undefined,
                bio: lolcow.description || undefined,
              }}
              stats={{
                score: calculatedScore,
                upvotes: upvotes,
                downvotes: downvotes,
                controversyCount: richData?.controversies?.length || 0,
                momentCount: richData?.moments?.length || 0,
                newsCount: richData?.news?.length || 0,
                yearsActive: 3,
              }}
            />
          </div>

          {/* Voting controls - Right side */}
          <motion.div
            className="flex-1 jester-border bg-card p-4 sm:p-6 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              {/* Name with glow effect */}
              <motion.h1
                className="text-2xl sm:text-3xl font-black mb-2"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  color: "oklch(0.92 0 0)",
                  textShadow: "0 0 20px oklch(0.75 0.25 140 / 0.4)",
                }}
              >
                {lolcow.name}
              </motion.h1>

              {/* Platform Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-1 text-xs font-bold uppercase rounded"
                  style={{
                    background: getPlatform(lolcow.name) === "kick"
                      ? "#53FC18"
                      : getPlatform(lolcow.name) === "youtube"
                      ? "#FF0000"
                      : "#9146FF",
                    color: "#000",
                  }}
                >
                  {getPlatform(lolcow.name)}
                </span>
                <span className="text-xs text-muted-foreground">Verified Jester</span>
              </div>

              {lolcow.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-muted-foreground mb-4"
                >
                  {lolcow.description}
                </motion.p>
              )}
            </div>

            {/* Animated vote buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <VoteButtonPair
                nomineeId={id}
                upvotes={upvotes}
                downvotes={downvotes}
                userVote={myVote}
                onVote={onVoteClick}
                disabled={isPending}
                isAnimating={isAnimating}
                animationType={animationType}
                size="md"
              />

              {!isAuthenticated && (
                <motion.a
                  href={getLegacyLoginUrl()}
                  className="inline-block mt-3 text-xs text-muted-foreground hover:text-[oklch(0.75_0.25_140)] transition-colors"
                  whileHover={{ x: 2 }}
                >
                  Login to vote and track your stats →
                </motion.a>
              )}
            </motion.div>

            {/* Live indicator */}
            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
              <motion.div
                className="relative"
                animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isConnected
                      ? "oklch(0.75 0.25 140)"
                      : "oklch(0.65 0.22 25)",
                  }}
                />
                {isConnected && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.25 140)" }}
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{
                  color: isConnected
                    ? "oklch(0.75 0.25 140)"
                    : "oklch(0.65 0.22 25)",
                }}
              >
                {isConnected ? "Live Updates" : "Offline"}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Vote history chart */}
        <AnimatePresence>
          {voteHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="jester-border-subtle bg-card p-4 mb-4"
            >
              <h2
                className="text-xs font-bold mb-3 tracking-widest"
                style={{ color: "oklch(0.75 0.25 140)" }}
              >
                JESTER RANKING HISTORY (BY WEEK)
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={voteHistory}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="weekKey"
                    tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }}
                  />
                  <YAxis tick={{ fontSize: 9, fill: "oklch(0.6 0 0)" }} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.12 0 0)",
                      border: "1px dashed oklch(0.75 0.25 140)",
                      fontSize: 11,
                    }}
                    labelStyle={{ color: "oklch(0.92 0 0)" }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar
                    dataKey="upvotes"
                    fill="oklch(0.75 0.25 140)"
                    name="Upvotes"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="downvotes"
                    fill="oklch(0.55 0.22 25)"
                    name="Downvotes"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rich Profile Content */}
        <AnimatePresence>
          {richData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TheArcTimeline
                moments={richData.moments}
                controversies={richData.controversies.map((c) => ({
                  ...c,
                  severity: c.severity ?? "moderate",
                }))}
              />
              <NotableClipsSection moments={richData.moments} />
              <ControversiesSection
                controversies={richData.controversies.map((c) => ({
                  ...c,
                  severity: c.severity ?? "moderate",
                }))}
              />
              <NewsSection
                news={richData.news.map((n) => ({
                  ...n,
                  approved: n.approved ?? false,
                }))}
              />
              <ExternalLinksSection links={richData.links} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="jester-border-subtle bg-card p-4"
        >
          <h2
            className="text-xs font-bold mb-3 tracking-widest"
            style={{ color: "oklch(0.75 0.25 140)" }}
          >
            COURT JESTER COMMENTARY
          </h2>

          {/* Add comment */}
          {isAuthenticated ? (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && comment.trim())
                    addComment.mutate({
                      nomineeId: id,
                      content: comment.trim(),
                    });
                }}
                placeholder="Add your jest..."
                maxLength={500}
                className="flex-1 bg-input border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors"
              />
              <motion.button
                onClick={() => {
                  if (comment.trim())
                    addComment.mutate({
                      nomineeId: id,
                      content: comment.trim(),
                    });
                }}
                disabled={!comment.trim() || addComment.isPending}
                className="px-3 py-2 bg-primary text-primary-foreground text-xs disabled:opacity-50 hover:bg-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={12} />
              </motion.button>
            </div>
          ) : (
            <div className="mb-4 text-xs text-muted-foreground">
              <a
                href={getLegacyLoginUrl()}
                className="text-[oklch(0.75_0.25_140)] hover:underline transition-colors"
              >
                Enter the Court
              </a>{" "}
              to leave your jest.
            </div>
          )}

          {/* Comment list */}
          <div className="space-y-2">
            <AnimatePresence>
              {comments && comments.length > 0 ? (
                comments.map((c, index) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="jester-border-subtle p-3 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {c.kickAvatarUrl ? (
                        <img
                          src={c.kickAvatarUrl}
                          alt=""
                          width="20"
                          height="20"
                          loading="lazy"
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[8px] text-primary-foreground font-bold">
                          {(c.kickUsername ?? c.userName ?? "?")[0]?.toUpperCase()}
                        </div>
                      )}
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: "oklch(0.75 0.25 140)" }}
                      >
                        {c.kickUsername ?? c.userName ?? "Anonymous"}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-foreground">{c.content}</p>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground text-center py-4"
                >
                  No jests yet. Be the first to mock!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Connection status */}
      <ConnectionStatus
        isConnected={isConnected}
        lastUpdate={lastUpdate}
        onReconnect={() => window.location.reload()}
      />
    </div>
  );
}
