import { motion } from "framer-motion";
import { Settings, Moon, Sun, Bell, Eye, Shield, User } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main className="container py-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-gradient-jester flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#fbbf24]" />
            Royal Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your Court experience
          </p>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="jester-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-[#fbbf24]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#fbbf24]" />
                )}
                Appearance
              </CardTitle>
              <CardDescription>
                Choose your preferred court ambiance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Court</Label>
                  <p className="text-sm text-muted-foreground">
                    The traditional jester experience
                  </p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Light Court</Label>
                  <p className="text-sm text-muted-foreground">
                    For daytime clownery
                  </p>
                </div>
                <Switch
                  checked={theme === "light"}
                  onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="jester-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#fbbf24]" />
                Notifications
              </CardTitle>
              <CardDescription>
                Stay informed about court proceedings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Vote Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when your nominees change rank
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">New Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when someone comments on your nominees
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Results</Label>
                  <p className="text-sm text-muted-foreground">
                    Get the weekly clownery summary
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="jester-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#fbbf24]" />
                Privacy
              </CardTitle>
              <CardDescription>
                Control your visibility in the Court
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Show your voting activity to others
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Vote Streak</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your voting streak on leaderboard
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="jester-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#fbbf24]" />
                  Account
                </CardTitle>
                <CardDescription>
                  Your Court identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#6b21a8] flex items-center justify-center text-2xl">
                    {user?.kickAvatarUrl ? (
                      <img 
                        src={user.kickAvatarUrl} 
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>👑</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{user?.name || "Unknown Jester"}</p>
                    <p className="text-sm text-muted-foreground">{user?.role === "admin" ? "👑 Court Admin" : "🎭 Court Member"}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Refresh Profile
                  </Button>
                  <Button variant="destructive" size="sm">
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Admin Settings */}
        {user?.role === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="jester-card border-[#fbbf24]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#fbbf24]">
                  <Shield className="w-5 h-5" />
                  Admin Settings
                </CardTitle>
                <CardDescription>
                  Royal decree controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-approve Nominations</Label>
                    <p className="text-sm text-muted-foreground">
                      Skip approval queue for new nominees
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Public Voting</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow guest votes (no login required)
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Close the Court for maintenance
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
