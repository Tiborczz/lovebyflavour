import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <Card className="border-accent/20">
          <CardContent className="p-8 prose prose-slate max-w-none">
            
            <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-6">
              Love by Flavour ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website and use our services.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-primary mb-3">Information You Provide</h3>
            <ul className="text-muted-foreground mb-4 space-y-2">
              <li>• Quiz responses and personality assessment data</li>
              <li>• Email address (if you choose to subscribe to our newsletter)</li>
              <li>• Feedback or comments you provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3">Automatically Collected Information</h3>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Browser type and version</li>
              <li>• Operating system</li>
              <li>• IP address</li>
              <li>• Pages visited and time spent on our site</li>
              <li>• Referring website addresses</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">How We Use Your Information</h2>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• To provide and maintain our personality assessment service</li>
              <li>• To calculate your flavor profile and compatibility results</li>
              <li>• To send you newsletters and updates (only if you opt-in)</li>
              <li>• To improve our website and services</li>
              <li>• To analyze usage patterns and trends</li>
              <li>• To respond to your inquiries and provide customer support</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• With your explicit consent</li>
              <li>• To comply with legal obligations</li>
              <li>• To protect our rights, property, or safety</li>
              <li>• With trusted service providers who assist in operating our website (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Object to processing of your data</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground mb-6">
              Our service is not intended for individuals under the age of 18. We do not knowingly 
              collect personal information from children under 18.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page with an updated "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy, please contact us at: 
              <strong> privacy@lovebyflavour.com</strong>
            </p>
            
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;