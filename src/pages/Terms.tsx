import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <Card className="border-accent/20">
          <CardContent className="p-8 prose prose-slate max-w-none">
            
            <h2 className="text-2xl font-bold text-primary mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing and using Love by Flavour, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Service Description</h2>
            <p className="text-muted-foreground mb-6">
              Love by Flavour provides personality assessments and relationship compatibility insights 
              through our flavor-based metaphor system. Our service is for entertainment and 
              self-reflection purposes and should not be considered professional psychological advice.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Use License</h2>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• You may use our service for personal, non-commercial purposes</li>
              <li>• You may not redistribute or resell our content without permission</li>
              <li>• You may share your results on social media with proper attribution</li>
              <li>• You may not attempt to reverse engineer our assessment algorithms</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">When using our service, you agree to:</p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Provide accurate information in our assessments</li>
              <li>• Use the service in accordance with applicable laws</li>
              <li>• Not attempt to harm or disrupt our website or services</li>
              <li>• Respect the intellectual property rights of Love by Flavour</li>
              <li>• Not use the service for any illegal or unauthorized purpose</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4">Disclaimer</h2>
            <p className="text-muted-foreground mb-6">
              The information provided by Love by Flavour is for general informational and 
              entertainment purposes only. Our assessments are not intended as professional 
              psychological, relationship, or medical advice. Always seek the advice of qualified 
              professionals for serious relationship or mental health concerns.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Limitations of Liability</h2>
            <p className="text-muted-foreground mb-6">
              Love by Flavour shall not be liable for any damages arising from the use or 
              inability to use our service, including but not limited to relationship decisions 
              made based on our assessments. Use our service at your own discretion.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Accuracy of Information</h2>
            <p className="text-muted-foreground mb-6">
              While we strive to provide accurate and helpful information, we make no representations 
              or warranties about the completeness, accuracy, or reliability of any information 
              provided through our service.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All content on Love by Flavour, including but not limited to text, graphics, logos, 
              images, and software, is the property of Love by Flavour and is protected by 
              intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Termination</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to terminate or suspend access to our service immediately, 
              without prior notice or liability, for any reason, including breach of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of the service constitutes acceptance 
              of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Governing Law</h2>
            <p className="text-muted-foreground mb-6">
              These Terms shall be governed by and construed in accordance with applicable laws, 
              without regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms & Conditions, please contact us at: 
              <strong> legal@lovebyflavour.com</strong>
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

export default Terms;