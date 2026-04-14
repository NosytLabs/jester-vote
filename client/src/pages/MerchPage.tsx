import { motion } from "framer-motion";
import { ShoppingBag, Crown, Sparkles, Star } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Certified Lolcow™ T-Shirt",
    price: 24.99,
    image: "👕",
    description: "Let everyone know you're a certified lolcow with this premium tee",
    badge: "Bestseller",
    colors: ["Black", "Navy", "Purple"],
  },
  {
    id: 2,
    name: "Court of Fools Hoodie",
    price: 44.99,
    image: "🧥",
    description: "Stay warm while judging the biggest jesters in streaming",
    badge: "New",
    colors: ["Black", "Dark Purple"],
  },
  {
    id: 3,
    name: "Jester Hat Beanie",
    price: 19.99,
    image: "🎩",
    description: "The official headwear of the Court of Fools",
    badge: null,
    colors: ["Purple/Gold", "Black/Red"],
  },
  {
    id: 4,
    name: "I Voted Sticker Pack",
    price: 4.99,
    image: "⭐",
    description: "10 stickers to show you participated in the clownery",
    badge: null,
    colors: null,
  },
  {
    id: 5,
    name: "Top Jester Mug",
    price: 14.99,
    image: "☕",
    description: "Drink your morning coffee like a true court member",
    badge: null,
    colors: ["Black", "Purple"],
  },
  {
    id: 6,
    name: "Clown World Poster",
    price: 12.99,
    image: "🎨",
    description: "Decorate your space with premium jester art",
    badge: "Limited",
    colors: null,
  },
];

const featuredDrops = [
  {
    name: "Jester of the Month Exclusive",
    description: "Limited edition merch celebrating this month's top clown",
    available: true,
    endsIn: "7 days",
  },
  {
    name: "Halloween Clown Collection",
    description: "Spooky season special - perfect for October",
    available: false,
    endsIn: "Coming Oct 1",
  },
];

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-gradient-court">
      <Header />
      
      <main className="container py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl md:text-5xl font-black text-gradient-jester mb-4">
            Royal Merchandise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Official Court of Fools merchandise. Wear your clownery with pride.
          </p>
        </motion.div>

        {/* Featured Drops */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#fbbf24] mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Limited Drops
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredDrops.map((drop, index) => (
              <Card key={index} className="jester-card border-[#fbbf24]/30">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{drop.name}</h3>
                    {drop.available ? (
                      <span className="text-xs bg-[#fbbf24] text-black px-2 py-1 rounded font-bold">
                        LIVE
                      </span>
                    ) : (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{drop.description}</p>
                  <p className="text-xs text-[#fbbf24]">⏰ {drop.endsIn}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[#fbbf24] mb-6 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            All Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="jester-card h-full group">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${
                          product.badge === "Bestseller" 
                            ? "bg-[#fbbf24] text-black" 
                            : product.badge === "New"
                            ? "bg-green-500 text-white"
                            : "bg-purple-500 text-white"
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                      {product.image}
                    </div>
                    
                    {/* Product Info */}
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {product.description}
                    </p>
                    
                    {/* Colors */}
                    {product.colors && (
                      <div className="flex gap-2 mb-4">
                        {product.colors.map((color) => (
                          <span 
                            key={color} 
                            className="text-xs px-2 py-1 bg-white/10 rounded"
                            title={color}
                          >
                            {color.split("/")[0]}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-black text-[#fbbf24]">
                        ${product.price}
                      </span>
                      <Button size="sm" className="bg-[#fbbf24] text-black hover:bg-[#fbbf24]/90">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Affiliate Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5"
        >
          <p className="text-sm text-muted-foreground text-center">
            <Star className="w-4 h-4 inline mr-1" />
            <strong>Support the Court:</strong> Every purchase helps keep TopJester running. 
            We also earn commissions from affiliate links to streaming gear and platforms.
            <br />
            <span className="text-xs">Thank you for supporting independent community platforms! 👑</span>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            🎭 Long live the Court of Fools 🎭
          </p>
        </motion.div>
      </main>
    </div>
  );
}
