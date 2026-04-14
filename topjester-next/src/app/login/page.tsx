import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - TopJester",
  description: "Login to TopJester to vote on the biggest internet lolcows.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gradient-jester mb-2">
              ENTER THE COURT
            </h1>
            <p className="text-muted-foreground">
              Login to cast your votes
            </p>
          </div>

          <div className="bg-[#1a1a2e] border border-[#3f3f5f] rounded-xl p-8">
            <div className="space-y-4">
              <button className="w-full bg-[#53FC18] text-[#0f0f1a] py-3 px-4 rounded-lg font-bold hover:bg-[#4ae016] transition-colors flex items-center justify-center gap-2">
                <span>💚</span> Login with Kick
              </button>
              
              <button className="w-full bg-[#9146FF] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#7c3aed] transition-colors flex items-center justify-center gap-2">
                <span>💜</span> Login with Twitch
              </button>
              
              <button className="w-full bg-[#FF0000] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2">
                <span>❤️</span> Login with YouTube
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>OAuth integration coming with Next.js migration</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
