import { AlertCircle, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ConnectBannerProps {
  onConnect: () => void;
}

export function ConnectBanner({ onConnect }: ConnectBannerProps) {
  return (
    <Alert className="border-warning bg-warning/10">
      <AlertCircle className="h-4 w-4 text-warning" />
      <AlertDescription className="flex items-center justify-between w-full">
        <span className="text-warning-foreground">
          Connect your Google Business Profile to start managing reviews and generating insights.
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onConnect}
          className="ml-4 gap-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
        >
          <Link className="w-4 h-4" />
          Connect Now
        </Button>
      </AlertDescription>
    </Alert>
  );
}