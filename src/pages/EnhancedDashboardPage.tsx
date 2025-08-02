import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import NewBrandLogo from "@/components/NewBrandLogo";
import EnhancedDashboard from "@/components/EnhancedDashboard";

const EnhancedDashboardPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <NewBrandLogo variant="full" size="md" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
                Profile
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
                size="sm"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Dashboard Component */}
      <EnhancedDashboard />
    </div>
  );
};

export default EnhancedDashboardPage;