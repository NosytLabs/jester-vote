import { Share2, Twitter, MessageCircle, Share } from "lucide-react";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  lolcowName: string;
  lolcowId: number;
  description?: string;
}

export default function SocialShareButtons({ lolcowName, lolcowId, description }: SocialShareButtonsProps) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://topjester.com";
  const lolcowUrl = `${baseUrl}/lolcow/${lolcowId}`;
  const shareText = `I just voted for ${lolcowName} on TopJester! 🃏 Top lolcow rankings.`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(lolcowUrl)}`;
        break;
      case "reddit":
        url = `https://reddit.com/submit?url=${encodeURIComponent(lolcowUrl)}&title=${encodeURIComponent(`${lolcowName} - TopJester`)}`;
        break;
      case "discord":
        // Discord doesn't have a direct share URL, so we copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n${lolcowUrl}`);
        toast.success("Discord share text copied to clipboard!");
        return;
      case "copy":
        navigator.clipboard.writeText(lolcowUrl);
        toast.success("Link copied to clipboard!");
        return;
    }
    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-muted-foreground tracking-widest">SPREAD THE JEST:</span>
      <button
        onClick={() => handleShare("twitter")}
        className="p-1.5 text-xs border border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)] transition-colors"
        title="Share on Twitter/X"
      >
        <Twitter size={12} />
      </button>
      <button
        onClick={() => handleShare("reddit")}
        className="p-1.5 text-xs border border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)] transition-colors"
        title="Share on Reddit"
      >
        <MessageCircle size={12} />
      </button>
      <button
        onClick={() => handleShare("discord")}
        className="p-1.5 text-xs border border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)] transition-colors"
        title="Share on Discord"
      >
        <Share2 size={12} />
      </button>
      <button
        onClick={() => handleShare("copy")}
        className="p-1.5 text-xs border border-border text-muted-foreground hover:border-[oklch(0.75_0.25_140)] hover:text-[oklch(0.75_0.25_140)] transition-colors"
        title="Copy link"
      >
        <Share size={12} />
      </button>
    </div>
  );
}
