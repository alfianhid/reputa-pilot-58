import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewFilters } from "@/components/reviews/ReviewFilters";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ConnectBanner } from "@/components/dashboard/ConnectBanner";
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

// Mock data - replace with actual API calls
const mockReviews: Review[] = [
  {
    id: "1",
    reviewer_name: "Sarah Johnson",
    star_rating: 5,
    text: "Amazing service! The staff was incredibly helpful and the quality exceeded my expectations. Will definitely recommend to friends and family.",
    language: "en",
    created_at_ext: "2024-01-15T10:30:00Z",
    reply_text: "Thank you so much for your wonderful feedback, Sarah! We're thrilled to hear about your positive experience.",
    reply_posted_at: "2024-01-15T14:20:00Z"
  },
  {
    id: "2", 
    reviewer_name: "Michael Chen",
    star_rating: 2,
    text: "Service was slower than expected and the product quality wasn't great. Hope they can improve.",
    language: "en",
    created_at_ext: "2024-01-14T16:45:00Z",
    anomaly_score: 0.3
  },
  {
    id: "3",
    reviewer_name: "Anonymous User",
    star_rating: 1,
    text: "Terrible experience worst service ever dont go here fake reviews everywhere",
    language: "en", 
    created_at_ext: "2024-01-13T09:15:00Z",
    anomaly_score: 0.8,
    anomaly_reason: "Unnatural language patterns detected"
  }
];

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnected, setIsConnected] = useState(true); // Set to false to show connect banner
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter reviews based on rating and search
  useEffect(() => {
    let filtered = reviews;

    if (selectedRating !== null) {
      filtered = filtered.filter(review => review.star_rating === selectedRating);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(review => 
        review.reviewer_name.toLowerCase().includes(query) ||
        review.text.toLowerCase().includes(query)
      );
    }

    setFilteredReviews(filtered);
  }, [reviews, selectedRating, searchQuery]);

  const handleConnect = () => {
    navigate("/connect");
  };

  const handleReplyGenerated = (reviewId: string, draft: string) => {
    // Update local state optimistically
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, reply_text: draft }
        : review
    ));
  };

  const handleReplyPosted = (reviewId: string, reply: string) => {
    // Update local state optimistically
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            reply_text: reply,
            reply_posted_at: new Date().toISOString()
          }
        : review
    ));
  };

  const handleFlagged = (reviewId: string, reason: string) => {
    // Update local state optimistically
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            flags: { manual: true, reason }
          }
        : review
    ));
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reviews Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and respond to your Google Business Profile reviews
            </p>
          </div>
        </div>

        <ConnectBanner onConnect={handleConnect} />

        <EmptyState
          title="Connect Your Business"
          description="Connect your Google Business Profile to start managing reviews, generating AI-powered responses, and gaining valuable insights about your customers."
          actionLabel="Connect Google Business Profile"
          onAction={handleConnect}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reviews Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage and respond to your Google Business Profile reviews
          </p>
        </div>
      </div>

      {/* Filters */}
      <ReviewFilters
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalReviews={reviews.length}
        filteredCount={filteredReviews.length}
      />

      {/* Reviews list */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <EmptyState
            title="No Reviews Found"
            description={
              searchQuery || selectedRating
                ? "No reviews match your current filters. Try adjusting your search criteria."
                : "You don't have any reviews yet. Encourage your customers to leave reviews!"
            }
            actionLabel="Request Reviews"
            onAction={() => navigate("/outreach")}
          />
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReplyGenerated={handleReplyGenerated}
              onReplyPosted={handleReplyPosted}
              onFlagged={handleFlagged}
            />
          ))
        )}
      </div>
    </div>
  );
}