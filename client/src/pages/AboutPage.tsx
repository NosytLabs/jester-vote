import { motion } from "framer-motion";
import { Crown, Scale, Gavel, Scroll, Users, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🏰</div>
          <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
            About the Court
          </h1>
          <p className="text-xl text-muted-foreground italic">
            "Where the jesters of streaming are judged by the people"
          </p>
        </motion.div>

        {/* What is TopJester */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="jester-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Crown className="w-6 h-6 text-[#fbbf24]" />
                What is TopJester?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                TopJester is a community-driven platform where viewers vote on their favorite 
                (or least favorite) streamers. Think of it as a ranking system for the biggest 
                personalities in streaming - the ones who make us laugh, cry, or just shake our heads.
              </p>
              <p>
                The Court of Fools is a place where the community decides who wears the crown 
                of the biggest jester in streaming. No algorithms, no corporate decisions - 
                just pure community voting.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="jester-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Scale className="w-6 h-6 text-[#fbbf24]" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">👑</div>
                  <h3 className="font-bold text-foreground mb-2">1. Nominate</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit your favorite streamers to the Court for consideration
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⚔️</div>
                  <h3 className="font-bold text-foreground mb-2">2. Vote</h3>
                  <p className="text-sm text-muted-foreground">
                    Cast your votes - upvote the entertainers, downvote the drama
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-bold text-foreground mb-2">3. Crown</h3>
                  <p className="text-sm text-muted-foreground">
                    The top jesters rise to the throne based on community votes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="jester-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Gavel className="w-6 h-6 text-[#fbbf24]" />
                Court Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-[#fbbf24] font-bold">1.</span>
                  <span>Be respectful - this is all in good fun, not harassment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#fbbf24] font-bold">2.</span>
                  <span>No doxxing or posting private information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#fbbf24] font-bold">3.</span>
                  <span>Vote based on entertainment value, not personal attacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#fbbf24] font-bold">4.</span>
                  <span>Nominees must be public figures (streamers/content creators)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#fbbf24] font-bold">5.</span>
                  <span>One vote per nominee per user - no botting</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="jester-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Scroll className="w-6 h-6 text-[#fbbf24]" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">Who can be nominated?</h3>
                <p className="text-muted-foreground">
                  Any public streamer or content creator on platforms like Twitch, YouTube, Kick, etc. 
                  They should have some public presence and be known in the streaming community.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">How are votes calculated?</h3>
                <p className="text-muted-foreground">
                  Simple score = upvotes - downvotes. The leaderboard shows the highest scoring jesters. 
                  We also track weekly rankings to see who's trending.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Can I change my vote?</h3>
                <p className="text-muted-foreground">
                  Yes! You can change your vote anytime. Your latest vote is what counts.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Is this affiliated with any platform?</h3>
                <p className="text-muted-foreground">
                  No. TopJester is an independent community project. We're not affiliated with 
                  Twitch, YouTube, Kick, or any streaming platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="jester-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="w-6 h-6 text-[#fbbf24]" />
                Join the Community
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                The Court of Fools is run by the community, for the community. 
                Your votes shape the rankings. Your nominations bring new jesters to the stage.
              </p>
              <div className="flex justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl cursor-pointer"
                >
                  🎭
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl cursor-pointer"
                >
                  🤡
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl cursor-pointer"
                >
                  🃏
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Long live the Court of Fools
            <Sparkles className="w-4 h-4 inline ml-1" />
          </p>
        </motion.div>
      </main>
    </div>
  );
}
