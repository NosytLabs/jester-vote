import { useState, useCallback, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Send, CheckCircle, AlertCircle, Loader2, Search } from "lucide-react";
import { Link } from "wouter";

interface NominationFormProps {
  onSuccess?: () => void;
}

const MAX_NAME_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 1000;

export default function NominationForm({ onSuccess }: NominationFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [streamerUrl, setStreamerUrl] = useState("");
  const [category, setCategory] = useState<"lolcow" | "jester" | "controversial" | "other">("lolcow");
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState<{ exists: boolean; status: string | null; name: string | null } | null>(null);
  const [touched, setTouched] = useState({ name: false });

  const utils = trpc.useUtils();
  const checkDuplicate = trpc.nominees.checkDuplicate.useQuery(
    { name: name.trim() },
    { enabled: false }
  );

  const submit = trpc.nominees.submit.useMutation({
    onSuccess: (data) => {
      toast.success(data.message || "Your clown has been nominated!");
      setName("");
      setDescription("");
      setImageUrl("");
      setStreamerUrl("");
      setDuplicateInfo(null);
      utils.nominees.myNominations.invalidate();
      onSuccess?.();
    },
    onError: (e) => {
      toast.error("Something went wrong: " + e.message);
    },
  });

  // Debounced duplicate check
  useEffect(() => {
    if (!name.trim() || name.length < 2) {
      setDuplicateInfo(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingDuplicate(true);
      try {
        const result = await checkDuplicate.refetch();
        if (result.data) {
          setDuplicateInfo(result.data);
        }
      } catch (e) {
        console.error("Duplicate check failed:", e);
      } finally {
        setIsCheckingDuplicate(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  const validateForm = useCallback(() => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > MAX_NAME_LENGTH) return `Name must be less than ${MAX_NAME_LENGTH} characters`;
    if (duplicateInfo?.exists) {
      return duplicateInfo.status === "approved"
        ? `"${duplicateInfo.name}" is already in the rankings!`
        : `"${duplicateInfo.name}" is already pending approval.`;
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) return `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`;
    if (imageUrl && !isValidUrl(imageUrl)) return "Please enter a valid image URL";
    if (streamerUrl && !isValidUrl(streamerUrl)) return "Please enter a valid streamer URL";
    return null;
  }, [name, description, imageUrl, streamerUrl, duplicateInfo]);

  const error = validateForm();
  const canSubmit = !error && !submit.isPending && !isCheckingDuplicate;

  const handleSubmit = () => {
    if (!canSubmit) {
      if (error) toast.error(error);
      return;
    }

    submit.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      streamerUrl: streamerUrl.trim() || undefined,
      category,
    });
  };

  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">
          NAME <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setTouched((t) => ({ ...t, name: true }));
            }}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="e.g. DSP, Boogie2988, Wings of Redemption..."
            maxLength={MAX_NAME_LENGTH}
            className={`w-full bg-input border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
              duplicateInfo?.exists
                ? "border-destructive focus:border-destructive"
                : touched.name && !name.trim()
                ? "border-destructive"
                : "border-border focus:border-[oklch(0.75_0.25_140)]"
            }`}
          />
          {isCheckingDuplicate && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 size={14} className="animate-spin text-muted-foreground" />
            </div>
          )}
          {!isCheckingDuplicate && duplicateInfo?.exists && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle size={14} className="text-destructive" />
            </div>
          )}
        </div>
        
        {/* Duplicate Warning */}
        {duplicateInfo?.exists && (
          <div className="mt-2 p-2 bg-destructive/10 border border-destructive/30 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="text-destructive shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-destructive">Duplicate detected!</span>
                <p className="text-muted-foreground mt-0.5">
                  {duplicateInfo.status === "approved" ? (
                    <>
                      "{duplicateInfo.name}" is already in the rankings. 
                      <Link href="/">
                        <span className="text-[oklch(0.75_0.25_140)] hover:underline cursor-pointer ml-1">
                          View rankings →
                        </span>
                      </Link>
                    </>
                  ) : (
                    `"${duplicateInfo.name}" is already pending admin approval. Please wait for the review.`
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* No Duplicate - Available */}
        {!isCheckingDuplicate && !duplicateInfo?.exists && name.trim().length >= 2 && touched.name && (
          <div className="mt-2 flex items-center gap-1 text-xs text-[oklch(0.75_0.25_140)]">
            <CheckCircle size={12} />
            <span>Name is available!</span>
          </div>
        )}
        
        <div className="text-right text-[10px] text-muted-foreground mt-1">
          {name.length}/{MAX_NAME_LENGTH}
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">
          CATEGORY
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "lolcow", label: "Lolcow", desc: "Infamous internet personality" },
            { value: "jester", label: "Jester", desc: "Entertaining chaos agent" },
            { value: "controversial", label: "Controversial", desc: "Divisive figure" },
            { value: "other", label: "Other", desc: "Something else" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value as typeof category)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                category === opt.value
                  ? "bg-[oklch(0.75_0.25_140)] text-black border-[oklch(0.75_0.25_140)]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">
          DESCRIPTION
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's their deal? Why do they belong in the Court of Fools? Spill the tea."
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={4}
          className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors resize-none"
        />
        <div className="text-right text-[10px] text-muted-foreground">
          {description.length}/{MAX_DESCRIPTION_LENGTH}
        </div>
      </div>

      {/* Image URL Field */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">
          THEIR FACE (IMAGE URL)
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Drop a link to their pic - helps people recognize the clown (optional)"
          className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors"
        />
        {imageUrl && (
          <div className="mt-2 flex items-center gap-3">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-16 h-16 object-cover"
              style={{ border: "1px dashed oklch(0.45 0.15 140)" }}
              onError={(e) => { 
                (e.target as HTMLImageElement).style.display = "none";
                toast.error("Failed to load image preview");
              }}
            />
            <span className="text-xs text-muted-foreground">Image preview</span>
          </div>
        )}
      </div>

      {/* Streamer URL Field */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1 tracking-widest">
          WHERE TO FIND THEM
        </label>
        <input
          type="url"
          value={streamerUrl}
          onChange={(e) => setStreamerUrl(e.target.value)}
          placeholder="Their Kick, Twitch, or YouTube link so people can witness the chaos (optional)"
          className="w-full bg-input border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.75_0.25_140)] transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submit.isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            SUBMITTING...
          </>
        ) : (
          <>
            <Send size={14} />
            SEND TO THE COURT
          </>
        )}
      </button>

      {/* Helper Text */}
      <p className="text-[10px] text-muted-foreground text-center">
        Your nomination gets reviewed before going live. Don't nominate someone who's already in the Court - we check for duplicates.
      </p>
    </div>
  );
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
