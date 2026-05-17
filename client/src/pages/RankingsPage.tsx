import { motion } from "framer-motion";
import { Crown, TrendingUp, Flame, Award, Target, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function RankingsPage() {
  const { isAuthenticated } = useAuth();
  
  const { data: nominees, isLoading } = trpc.nominees.list.useQuery({
    status: "approved",
    limit: 50,
  });

  // Get top jesters by score
  const sortedNominees = [...(nominees || [])].sort((a, b) => b.score - a.score);
  const topJesters = sortedNominees.slice(0, 10);
  
  // Calculate stats
  const totalVotes = (nominees || []).reduce(
    (sum, n) => sum + n.upvotes + n.downvotes, 
    0
  );
  const totalUpvotes = (nominees || []).reduce((sum, n) => sum + n.upvotes, 0);

  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />

      <main id="main-content" className="container py-8 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
            The Royal Rankings
          </h1>
          <p className="text-xl text-muted-foreground italic">
            "Where the biggest jesters earn their crowns"
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="jester-card text-center">
            <CardContent className="pt-6">
              <Crown className="w-8 h-8 text-[#fbbf24] mx-auto mb-2" />
              <div className="text-3xl font-bold text-[#fbbf24]">{sortedNominees.length}</div>
              <div className="text-sm text-muted-foreground">Jesters Ranked</div>
            </CardContent>
          </Card>
          <Card className="jester-card text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-400">{totalVotes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Votes</div>
            </CardContent>
          </Card>
          <Card className="jester-card text-center">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-400">{totalUpvotes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Crowns Given</div>
            </CardContent>
          </Card>
          <Card className="jester-card text-center">
            <CardContent className="pt-6">
              <Flame className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-400">24/7</div>
              <div className="text-sm text-muted-foreground">Live Updates</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How Rankings Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="jester-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-[#fbbf24]" />
                How the Court Determines Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">👑</div>
                  <h3 className="font-bold text-foreground mb-2">Crown Score</h3>
                  <p className="text-sm text-muted-foreground">
                    Score = Upvotes - Downvotes. Higher scores mean more entertainment value in the Court's eyes.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold text-foreground mb-2">Real-Time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Rankings update instantly as the community votes. No delays, no algorithms.
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⚖️</div>
                  <h3 className="font-bold text-foreground mb-2">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Every vote counts. The people decide who wears the jester's crown.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top 3 Podium */}
        {topJesters.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex justify-center items-end gap-4 md:gap-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🥈</div>
                <div className="relative">
                  <img
                    src={topJesters[1].imageUrl || `https://i.pravatar.cc/100?u=${topJesters[1].id}`}
                    alt={topJesters[1].name}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-gray-400 object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-bold text-gray-300">{topJesters[1].name}</p>
                  <p className="text-sm text-[#fbbf24]">+{topJesters[1].score}</p>
                </div>
                <div className="w-20 md:w-28 h-16 bg-gradient-to-t from-gray-400/20 to-transparent rounded-t-lg mt-2" />
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center -mt-6">
                <div className="text-4xl mb-2">👑</div>
                <div className="relative">
                  <img
                    src={topJesters[0].imageUrl || `https://i.pravatar.cc/120?u=${topJesters[0].id}`}
                    alt={topJesters[0].name}
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-[#fbbf24] object-cover shadow-xl shadow-[#fbbf24]/20"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-bold text-[#fbbf24] text-lg">{topJesters[0].name}</p>
                  <p className="text-[#fbbf24] font-bold">+{topJesters[0].score}</p>
                </div>
                <div className="w-24 md:w-36 h-24 bg-gradient-to-t from-[#fbbf24]/30 to-transparent rounded-t-lg mt-2" />
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🥉</div>
                <div className="relative">
                  <img
                    src={topJesters[2].imageUrl || `https://i.pravatar.cc/100?u=${topJesters[2].id}`}
                    alt={topJesters[2].name}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-amber-600 object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-bold text-amber-600">{topJesters[2].name}</p>
                  <p className="text-sm text-[#fbbf24]">+{topJesters[2].score}</p>
                </div>
                <div className="w-20 md:w-28 h-12 bg-gradient-to-t from-amber-600/20 to-transparent rounded-t-lg mt-2" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Full Rankings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="jester-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="w-5 h-5 text-[#fbbf24]" />
                Complete Court Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading rankings...
                </div>
              ) : topJesters.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No jesters have been ranked yet.
                  </p>
                  <Link href="/submit">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="jester-btn honk-btn"
                    >
                      Nominate the First Jester
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedNominees.map((nominee, index) => (
                    <Link key={nominee.id} href={`/nominee/${nominee.id}`}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#27273a]/50 transition-colors cursor-pointer group"
                      >
                        {/* Rank */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                            index === 0
                              ? "bg-[#fbbf24] text-black"
                              : index === 1
                              ? "bg-gray-400 text-black"
                              : index === 2
                              ? "bg-amber-600 text-black"
                              : "bg-[#3f3f5f] text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Avatar */}
                        <img
                          src={nominee.imageUrl || `https://i.pravatar.cc/60?u=${nominee.id}`}
                          alt={nominee.name}
                          className="w-12 h-12 rounded-full bg-[#3f3f5f] object-cover flex-shrink-0"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white group-hover:text-[#fbbf24] transition-colors truncate">
                            {nominee.name}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {nominee.platform} • {nominee.category}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="text-right flex-shrink-0">
                          <p
                            className={`font-bold ${
                              nominee.score > 0
                                ? "text-green-400"
                                : nominee.score < 0
                                ? "text-red-400"
                                : "text-gray-400"
                            }`}
                          >
                            {nominee.score > 0 ? "+" : ""}
                            {nominee.score}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {nominee.upvotes.toLocaleString()} 👑{" "}
                            {nominee.downvotes.toLocaleString()} 📉
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="jester-card max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-[#fbbf24] mb-3">
                  Join the Court
                </h3>
                <p className="text-muted-foreground mb-6">
                  Login to cast your votes and influence the rankings. 
                  Your voice matters in deciding who deserves the jester's crown.
                </p>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="jester-btn honk-btn px-8 py-3"
                  >
                    Enter the Court
                  </motion.button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
