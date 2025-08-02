import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import NewBrandLogo from "@/components/NewBrandLogo";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Why We Love the Wrong People Again and Again",
      excerpt: "Understanding the psychological patterns that keep us attracted to partners who aren't good for us.",
      category: "Psychology",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      emoji: "💔",
      featured: true
    },
    {
      id: 2,
      title: "Vanilla in Love: What We Can Learn About Long-Term Relationships",
      excerpt: "The underrated power of stability and how Vanilla personalities create lasting bonds.",
      category: "Flavor Profiles",
      readTime: "6 min read",
      date: "Dec 12, 2024",
      emoji: "🍦"
    },
    {
      id: 3,
      title: "How to Break Toxic Dating Patterns Based on Your Flavor",
      excerpt: "Practical strategies for each personality type to escape relationship cycles that don't serve them.",
      category: "Self-Improvement",
      readTime: "10 min read",
      date: "Dec 10, 2024",
      emoji: "🔄"
    },
    {
      id: 4,
      title: "The Chocolate Dilemma: When Passion Becomes Chaos",
      excerpt: "Understanding the fine line between intensity and instability in romantic relationships.",
      category: "Flavor Profiles",
      readTime: "7 min read",
      date: "Dec 8, 2024",
      emoji: "🍫"
    },
    {
      id: 5,
      title: "Attachment Styles Through the Lens of Flavor",
      excerpt: "How your flavor connects to your attachment style and what it means for your relationships.",
      category: "Psychology",
      readTime: "9 min read",
      date: "Dec 5, 2024",
      emoji: "💝"
    },
    {
      id: 6,
      title: "The Mango Mystery: Why Emotional Distance Feels Safe",
      excerpt: "Exploring the psychology behind emotional unavailability and how to recognize it in yourself.",
      category: "Flavor Profiles",
      readTime: "5 min read",
      date: "Dec 3, 2024",
      emoji: "🥭"
    }
  ];

  const categories = ["All", "Psychology", "Flavor Profiles", "Self-Improvement"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <NewBrandLogo variant="full" size="lg" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/quiz" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
              <Button variant="outline" className="hidden md:flex">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Love Insights Blog
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Deep dives into relationship psychology, dating patterns, and how to use 
            your flavor profile to build <strong className="text-purple-400">better connections</strong>.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "All" ? "default" : "outline"}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                category === "All" 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600" 
                  : "border-pink-300 text-candy-cocoa-700 hover:bg-pink-100"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {posts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 border-pink-200 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-candy-peach-50 to-candy-mint-50 p-8">
                <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">Featured</Badge>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{post.emoji}</span>
                  <Badge variant="outline" className="border-pink-300 text-candy-cocoa-700">{post.category}</Badge>
                </div>
                <h2 className="text-3xl font-bold text-candy-cocoa-800 mb-4">{post.title}</h2>
                <p className="text-lg text-candy-cocoa-600 mb-6">{post.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-candy-cocoa-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
                <Button className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="border-pink-200 hover:border-purple-300 transition-colors group cursor-pointer shadow-lg hover:shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{post.emoji}</span>
                  <Badge variant="outline" className="text-xs border-pink-300 text-candy-cocoa-700">{post.category}</Badge>
                </div>
                <h3 className="text-xl font-bold text-candy-cocoa-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-candy-cocoa-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-candy-cocoa-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="group/btn p-0 h-auto font-semibold text-purple-500 hover:text-purple-600">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter CTA */}
        <Card className="mt-16 border-pink-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-candy-cocoa-800">Get Weekly Flavor Insights</h3>
            <p className="text-candy-cocoa-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly relationship tips, flavor-specific dating advice, 
              and early access to new compatibility features.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400/50 text-candy-cocoa-700"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">Subscribe</Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-pink-300 text-candy-cocoa-700 hover:bg-pink-50">
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;