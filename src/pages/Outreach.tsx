import { useState } from "react";
import { QrCode, Upload, Download, Send, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  last_emailed_at?: string;
  status: "pending" | "sent" | "bounced";
}

// Mock data
const mockContacts: Contact[] = [
  { id: "1", name: "John Smith", email: "john@example.com", status: "sent", last_emailed_at: "2024-01-10" },
  { id: "2", name: "Sarah Wilson", email: "sarah@example.com", status: "pending" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", status: "bounced" },
];

export default function Outreach() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const { toast } = useToast();

  // Generate QR Code (mock implementation)
  const qrCodeUrl = "https://chart.googleapis.com/chart?cht=qr&chl=https%3A//reputa.ai/r/demo-business&chs=200x200";
  const reviewUrl = "https://g.page/your-business/review";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Mock CSV parsing
      setTimeout(() => {
        const newContacts: Contact[] = [
          { id: Date.now().toString(), name: "Alice Brown", email: "alice@example.com", status: "pending" },
          { id: (Date.now() + 1).toString(), name: "Bob Davis", email: "bob@example.com", status: "pending" },
        ];
        setContacts(prev => [...prev, ...newContacts]);
        toast({ description: `Uploaded ${newContacts.length} new contacts` });
        setSelectedFile(null);
      }, 1000);
    }
  };

  const handleSendCampaign = () => {
    if (!campaignName.trim()) {
      toast({ variant: "destructive", description: "Please enter a campaign name" });
      return;
    }

    const pendingContacts = contacts.filter(c => c.status === "pending");
    if (pendingContacts.length === 0) {
      toast({ variant: "destructive", description: "No pending contacts to send to" });
      return;
    }

    // Mock sending
    setContacts(prev => prev.map(contact => 
      contact.status === "pending" 
        ? { ...contact, status: "sent" as const, last_emailed_at: new Date().toISOString().split('T')[0] }
        : contact
    ));

    toast({ description: `Campaign "${campaignName}" sent to ${pendingContacts.length} contacts!` });
    setCampaignName("");
    setCustomMessage("");
  };

  const downloadQR = () => {
    // Mock download
    toast({ description: "QR code downloaded!" });
  };

  const getStatusBadge = (status: Contact["status"]) => {
    switch (status) {
      case "sent":
        return <Badge variant="secondary">Sent</Badge>;
      case "bounced":
        return <Badge variant="destructive">Bounced</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Request Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Generate QR codes and send review requests to your customers
        </p>
      </div>

      <Tabs defaultValue="qr" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qr" className="gap-2">
            <QrCode className="w-4 h-4" />
            QR Code
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="w-4 h-4" />
            Email Campaign
          </TabsTrigger>
        </TabsList>

        {/* QR Code Tab */}
        <TabsContent value="qr" className="space-y-6">
          <Card className="p-6">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Review QR Code</h3>
                <p className="text-muted-foreground">
                  Display this QR code for customers to easily leave reviews
                </p>
              </div>

              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg border border-border shadow-soft">
                  <img 
                    src={qrCodeUrl} 
                    alt="Review QR Code" 
                    className="w-48 h-48"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Scan to leave a review at:
                </p>
                <code className="block text-sm bg-muted p-2 rounded font-mono">
                  {reviewUrl}
                </code>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={downloadQR} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download QR Code
                </Button>
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(reviewUrl)}>
                  Copy Link
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Email Campaign Tab */}
        <TabsContent value="email" className="space-y-6">
          {/* Upload Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Upload Contacts</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="csv-upload">CSV File</Label>
                <div className="mt-1 flex items-center gap-3">
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  CSV should include: name, email, phone_number (optional)
                </p>
              </div>
            </div>
          </Card>

          {/* Campaign Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., January Review Request"
                />
              </div>

              <div>
                <Label htmlFor="custom-message">Custom Message (Optional)</Label>
                <Textarea
                  id="custom-message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add a personal touch to your review request..."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be added to the default review request template
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {contacts.filter(c => c.status === "pending").length} contacts ready to send
                </div>
                <Button onClick={handleSendCampaign} className="gap-2">
                  <Send className="w-4 h-4" />
                  Send Campaign
                </Button>
              </div>
            </div>
          </Card>

          {/* Contacts List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact List</h3>
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No contacts yet. Upload a CSV file to get started.
                </p>
              ) : (
                contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      {contact.last_emailed_at && (
                        <p className="text-xs text-muted-foreground">
                          Last emailed: {new Date(contact.last_emailed_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {getStatusBadge(contact.status)}
                  </div>
                ))
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}