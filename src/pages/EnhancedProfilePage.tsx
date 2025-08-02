import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import NewBrandLogo from "@/components/NewBrandLogo";
import EnhancedProfile from "@/components/EnhancedProfile";

const EnhancedProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50">
      {/* Navigation Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <NewBrandLogo variant="full" size="lg" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
              Dashboard
            </Link>
            <Link to="/blog" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
              Blog
            </Link>
            <Link to="/pricing" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
              Pricing
            </Link>
            <Button 
              asChild 
              variant="outline" 
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Profile Component */}
      <EnhancedProfile />
    </div>
  );
};

export default EnhancedProfilePage;