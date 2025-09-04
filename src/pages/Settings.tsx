import { useState } from "react";
import { Link2, Unlink, User, Bot, Clock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock connection data
const mockConnection = {
  google_account_email: "business@example.com",
  location_name: "Example Coffee Shop",
  connected_at: "2024-01-01T00:00:00Z"
};

export default function Settings() {
  const [aiTone, setAiTone] = useState("Friendly");
  const [cooldownDays, setCooldownDays] = useState("90");
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Mock save
    toast({ description: "Settings saved successfully!" });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({ description: "Google Business Profile disconnected." });
  };

  const handleConnect = () => {
    setIsConnected(true);
    toast({ description: "Google Business Profile connected successfully!" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and integrations
        </p>
      </div>

      {/* Google Connection */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center">
            <Link2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Google Business Profile</h3>
            <p className="text-sm text-muted-foreground">Connect to manage your reviews</p>
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  Connected
                </Badge>
                <div>
                  <p className="font-medium text-foreground">{mockConnection.location_name}</p>
                  <p className="text-sm text-muted-foreground">{mockConnection.google_account_email}</p>
                  <p className="text-xs text-muted-foreground">
                    Connected on {new Date(mockConnection.connected_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleDisconnect} className="gap-2">
                <Unlink className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-warning-foreground mb-3">
                Connect your Google Business Profile to start managing reviews and generating insights.
              </p>
              <Button onClick={handleConnect} className="gap-2">
                <Link2 className="w-4 h-4" />
                Connect Google Business Profile
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* AI Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Reply Settings</h3>
            <p className="text-sm text-muted-foreground">Customize how AI generates responses</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ai-tone">Reply Tone</Label>
            <Select value={aiTone} onValueChange={setAiTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friendly">Friendly & Casual</SelectItem>
                <SelectItem value="Formal">Professional & Formal</SelectItem>
                <SelectItem value="Empathetic">Warm & Empathetic</SelectItem>
                <SelectItem value="Concise">Brief & Direct</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This tone will be used when generating smart replies to reviews
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Preview</h4>
            <p className="text-sm text-muted-foreground italic">
              {aiTone === "Friendly" && "Thanks so much for the amazing review! We're thrilled you had such a great experience with us. 😊"}
              {aiTone === "Formal" && "Thank you for taking the time to share your feedback. We appreciate your business and look forward to serving you again."}
              {aiTone === "Empathetic" && "We're so grateful for your kind words! It truly means the world to us knowing we made your day a little brighter."}
              {aiTone === "Concise" && "Thank you for the review! We appreciate your business."}
            </p>
          </div>
        </div>
      </Card>

      {/* Outreach Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Review Request Settings</h3>
            <p className="text-sm text-muted-foreground">Control how often you contact customers</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cooldown">Cooldown Period (Days)</Label>
            <Input
              id="cooldown"
              type="number"
              min="1"
              max="365"
              value={cooldownDays}
              onChange={(e) => setCooldownDays(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Do not send a review request to the same customer more than once every {cooldownDays} days
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-2">How it works</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Prevents spam by limiting contact frequency</li>
              <li>• Applies to email campaigns and automated requests</li>
              <li>• Helps maintain positive customer relationships</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
            <p className="text-sm text-muted-foreground">Your profile and business details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" defaultValue="Example Coffee Shop" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" defaultValue="owner@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-type">Business Type</Label>
            <Select defaultValue="restaurant">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant/Café</SelectItem>
                <SelectItem value="retail">Retail Store</SelectItem>
                <SelectItem value="salon">Beauty Salon</SelectItem>
                <SelectItem value="clinic">Medical Clinic</SelectItem>
                <SelectItem value="service">Service Business</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}