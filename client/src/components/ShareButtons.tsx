import { Share2, Twitter, MessageCircle, Share, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

interface ShareButtonsProps {
  nomineeName: string;
  nomineeId: number;
  description?: string;
  rank?: number;
  score?: number;
  variant?: "compact" | "full";
}

export default function ShareButtons({ 
  nomineeName, 
  nomineeId, 
  description, 
  rank,
  score,
  variant = "compact" 
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://topjester.com";
  const nomineeUrl = `${baseUrl}/nominee/${nomineeId}`;
  const shareText = rank 
    ? `${nomineeName} is ranked #${rank} on TopJester! 🃏 Cast your vote.`
    : `Check out ${nomineeName} on TopJester! 🃏 Top lolcow rankings.`;
  const fullShareText = `${shareText}\n\nScore: ${score && score > 0 ? '+' : ''}${score ?? 0}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(nomineeUrl)}`;
        break;
      case "reddit":
        url = `https://reddit.com/submit?url=${encodeURIComponent(nomineeUrl)}&title=${encodeURIComponent(`${nomineeName} - TopJester Ranking`)}`;
        break;
      case "discord":
        navigator.clipboard.writeText(`${fullShareText}\n\n${nomineeUrl}`);
        toast.success("Discord share text copied to clipboard!");
        return;
      case "copy":
        navigator.clipboard.writeText(nomineeUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    if (url) window.open(url, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const buttonClass = variant === "full" 
    ? "flex items-center gap-2 px-3 py-2 text-xs border transition-all hover:scale-105 active:scale-95"
    : "p-1.5 text-xs border border-border transition-all hover:scale-110 active:scale-95";

  const iconSize = variant === "full" ? 14 : 12;

  return (
    <div className={`flex items-center gap-2 ${variant === "full" ? "flex-wrap" : ""}`}>
      <span className={`font-bold text-muted-foreground tracking-widest ${variant === "full" ? "text-sm w-full mb-2" : "text-xs"}`}>
        {variant === "full" ? "SHARE THIS NOMINEE" : "SHARE:"}
      </span>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare("twitter")}
        className={`${buttonClass} border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)] hover:shadow-[0_0_10px_oklch(0.75_0.25_140/0.3)]`}
        title="Share on Twitter/X"
      >
        <Twitter size={iconSize} />
        {variant === "full" && <span>Twitter</span>}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare("reddit")}
        className={`${buttonClass} border-border text-muted-foreground hover:border-[oklch(0.75_0.18_30)] hover:text-[oklch(0.75_0.18_30)] hover:shadow-[0_0_10px_oklch(0.75_0.18_30/0.3)]`}
        title="Share on Reddit"
      >
        <MessageCircle size={iconSize} />
        {variant === "full" && <span>Reddit</span>}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare("discord")}
        className={`${buttonClass} border-border text-muted-foreground hover:border-[oklch(0.65_0.2_280)] hover:text-[oklch(0.65_0.2_280)] hover:shadow-[0_0_10px_oklch(0.65_0.2_280/0.3)]`}
        title="Copy Discord message"
      >
        <Share2 size={iconSize} />
        {variant === "full" && <span>Discord</span>}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare("copy")}
        className={`${buttonClass} border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)] hover:shadow-[0_0_10px_oklch(0.75_0.25_140/0.3)]`}
        title="Copy link"
      >
        {copied ? <Check size={iconSize} className="text-[oklch(0.75_0.25_140)]" /> : <Link2 size={iconSize} />}
        {variant === "full" && <span>{copied ? "Copied!" : "Copy Link"}</span>}
      </motion.button>
    </div>
  );
}
