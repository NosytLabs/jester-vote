import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Twitter, Youtube, MessageSquare, Newspaper } from 'lucide-react';

// Tweet Embed Component
export function TweetEmbed({ url, title }: { url: string; title?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const tweetId = url.split('/status/')[1]?.split('?')[0];
  
  if (!tweetId) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-[#1DA1F2]/10 rounded-lg border border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 transition-colors">
        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
        <span className="text-sm text-[#1DA1F2]">View Tweet</span>
        <ExternalLink className="w-4 h-4 text-[#1DA1F2] ml-auto" />
      </a>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[#1DA1F2]/30 bg-[#1DA1F2]/5">
      <div className="p-3 border-b border-[#1DA1F2]/20 flex items-center gap-2">
        <Twitter className="w-4 h-4 text-[#1DA1F2]" />
        <span className="text-sm font-medium text-[#1DA1F2]">{title || 'Tweet'}</span>
      </div>
      <div className="p-4">
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={url}></a>
        </blockquote>
        {!isLoaded && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1DA1F2]" />
          </div>
        )}
      </div>
    </div>
  );
}

// YouTube Embed Component
export function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden border border-[#FF0000]/30 bg-[#FF0000]/5">
      <div className="p-3 border-b border-[#FF0000]/20 flex items-center gap-2">
        <Youtube className="w-4 h-4 text-[#FF0000]" />
        <span className="text-sm font-medium text-[#FF0000]">{title || 'YouTube Video'}</span>
      </div>
      <div className="relative aspect-video bg-black">
        {!isPlaying ? (
          <motion.button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title || 'YouTube video'}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

// Kick Clip Embed Component
export function KickClipEmbed({ clipId, title }: { clipId: string; title?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#53FC18]/30 bg-[#53FC18]/5">
      <div className="p-3 border-b border-[#53FC18]/20 flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-[#53FC18] flex items-center justify-center text-black text-[10px] font-bold">K</span>
        <span className="text-sm font-medium text-[#53FC18]">{title || 'Kick Clip'}</span>
      </div>
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://kick.com/clips/${clipId}?autoplay=false`}
          title={title || 'Kick clip'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// Reddit Post Embed Component
export function RedditEmbed({ url, title }: { url: string; title?: string }) {
  const subreddit = url.match(/reddit\.com\/r\/([^/]+)/)?.[1];
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center gap-2 p-3 bg-[#FF4500]/10 rounded-lg border border-[#FF4500]/30 hover:bg-[#FF4500]/20 transition-colors"
    >
      <MessageSquare className="w-5 h-5 text-[#FF4500]" />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-[#FF4500] font-medium truncate block">{title || 'Reddit Discussion'}</span>
        {subreddit && <span className="text-xs text-[#FF4500]/70">r/{subreddit}</span>}
      </div>
      <ExternalLink className="w-4 h-4 text-[#FF4500]" />
    </a>
  );
}

// News Article Embed Component
export function NewsEmbed({ url, title, source, date }: { url: string; title: string; source?: string; date?: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-start gap-3 p-3 bg-[#fbbf24]/10 rounded-lg border border-[#fbbf24]/30 hover:bg-[#fbbf24]/20 transition-colors"
    >
      <Newspaper className="w-5 h-5 text-[#fbbf24] mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-[#fbbf24] font-medium line-clamp-2 block">{title}</span>
        <div className="flex items-center gap-2 mt-1">
          {source && <span className="text-xs text-[#fbbf24]/70">{source}</span>}
          {date && <span className="text-xs text-[#fbbf24]/50">{date}</span>}
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-[#fbbf24] flex-shrink-0" />
    </a>
  );
}

// Streamable Embed Component
export function StreamableEmbed({ shortCode, title }: { shortCode: string; title?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#00adef]/30 bg-[#00adef]/5">
      <div className="p-3 border-b border-[#00adef]/20 flex items-center gap-2">
        <Play className="w-4 h-4 text-[#00adef]" />
        <span className="text-sm font-medium text-[#00adef]">{title || 'Clip'}</span>
      </div>
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://streamable.com/e/${shortCode}`}
          title={title || 'Streamable clip'}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// Embed Grid Component for Nominee Page
export function EmbedGrid({ 
  tweets, 
  redditPosts, 
  youtubeVideos, 
  kickClips, 
  newsArticles,
  streamableClips 
}: {
  tweets?: { url: string; title?: string }[];
  redditPosts?: { url: string; title?: string }[];
  youtubeVideos?: { videoId: string; title?: string }[];
  kickClips?: { clipId: string; title?: string }[];
  newsArticles?: { url: string; title: string; source?: string; date?: string }[];
  streamableClips?: { shortCode: string; title?: string }[];
}) {
  const hasContent = tweets?.length || redditPosts?.length || youtubeVideos?.length || 
                     kickClips?.length || newsArticles?.length || streamableClips?.length;
  
  if (!hasContent) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[#fbbf24] flex items-center gap-2">
        <ExternalLink className="w-5 h-5" />
        External Content
      </h3>
      
      <div className="grid gap-4">
        {/* YouTube Videos */}
        {youtubeVideos?.map((video, i) => (
          <motion.div
            key={`yt-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <YouTubeEmbed {...video} />
          </motion.div>
        ))}

        {/* Kick Clips */}
        {kickClips?.map((clip, i) => (
          <motion.div
            key={`kick-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <KickClipEmbed {...clip} />
          </motion.div>
        ))}

        {/* Streamable Clips */}
        {streamableClips?.map((clip, i) => (
          <motion.div
            key={`streamable-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StreamableEmbed {...clip} />
          </motion.div>
        ))}

        {/* News Articles */}
        {newsArticles?.map((article, i) => (
          <motion.div
            key={`news-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <NewsEmbed {...article} />
          </motion.div>
        ))}

        {/* Reddit Posts */}
        {redditPosts?.map((post, i) => (
          <motion.div
            key={`reddit-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <RedditEmbed {...post} />
          </motion.div>
        ))}

        {/* Tweets */}
        {tweets?.map((tweet, i) => (
          <motion.div
            key={`tweet-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TweetEmbed {...tweet} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
