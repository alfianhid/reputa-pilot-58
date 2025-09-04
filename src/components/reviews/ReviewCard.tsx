import { useState } from "react";
import { Star, Flag, Send, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  reviewer_name: string;
  star_rating: number;
  text: string;
  language: string;
  created_at_ext: string;
  reply_text?: string;
  reply_posted_at?: string;
  anomaly_score?: number;
  anomaly_reason?: string;
  flags?: any;
}

interface ReviewCardProps {
  review: Review;
  onReplyGenerated?: (reviewId: string, draft: string) => void;
  onReplyPosted?: (reviewId: string, reply: string) => void;
  onFlagged?: (reviewId: string, reason: string) => void;
}

export function ReviewCard({ 
  review, 
  onReplyGenerated, 
  onReplyPosted, 
  onFlagged 
}: ReviewCardProps) {
  const [replyText, setReplyText] = useState(review.reply_text || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating
                ? "fill-warning text-warning"
                : "text-muted-foreground"
            )}
          />
        ))}
      </div>
    );
  };

  const handleGenerateReply = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const generatedReply = `Thank you for your ${review.star_rating >= 4 ? 'positive' : ''} feedback! We truly appreciate you taking the time to share your experience with us.`;
      setReplyText(generatedReply);
      onReplyGenerated?.(review.id, generatedReply);
      toast({ description: "Smart reply generated successfully!" });
    } catch (error) {
      toast({ 
        variant: "destructive", 
        description: "Failed to generate reply. Please try again." 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePostReply = async () => {
    if (!replyText.trim()) return;
    
    setIsPosting(true);
    try {
      // Simulate posting - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onReplyPosted?.(review.id, replyText);
      toast({ description: "Reply posted successfully!" });
    } catch (error) {
      toast({ 
        variant: "destructive", 
        description: "Failed to post reply. Please try again." 
      });
    } finally {
      setIsPosting(false);
    }
  };

  const handleFlag = () => {
    onFlagged?.(review.id, "Manual flag");
    toast({ description: "Review flagged for review." });
  };

  return (
    <Card className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground">{review.reviewer_name}</h3>
            {renderStars(review.star_rating)}
            {review.anomaly_score && review.anomaly_score > 0.5 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                Anomaly
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDate(review.created_at_ext)}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleFlag}
          className="text-muted-foreground hover:text-foreground"
        >
          <Flag className="w-4 h-4" />
        </Button>
      </div>

      {/* Review text */}
      <div className="space-y-2">
        <p className="text-foreground leading-relaxed">{review.text}</p>
        {review.anomaly_reason && (
          <div className="flex items-center gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive">{review.anomaly_reason}</span>
          </div>
        )}
      </div>

      {/* Reply section */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Reply to Review</h4>
          {!review.reply_posted_at && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateReply}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Generate Smart Reply
            </Button>
          )}
        </div>

        {review.reply_posted_at ? (
          <div className="p-3 bg-primary-muted rounded-lg">
            <p className="text-sm text-foreground mb-2">{review.reply_text}</p>
            <p className="text-xs text-muted-foreground">
              Posted on {formatDate(review.reply_posted_at)}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="min-h-[100px] resize-none focus-ring"
              disabled={isGenerating}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {replyText.length}/280 characters
              </p>
              <Button
                onClick={handlePostReply}
                disabled={!replyText.trim() || isPosting || replyText.length > 280}
                className="gap-2"
              >
                {isPosting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Post Reply
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}