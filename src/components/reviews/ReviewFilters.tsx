import { Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewFiltersProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalReviews: number;
  filteredCount: number;
}

export function ReviewFilters({
  selectedRating,
  onRatingChange,
  searchQuery,
  onSearchChange,
  totalReviews,
  filteredCount
}: ReviewFiltersProps) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-4 p-4 bg-card border border-border rounded-lg shadow-soft">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 focus-ring"
        />
      </div>

      {/* Rating filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedRating === null ? "default" : "outline"}
          size="sm"
          onClick={() => onRatingChange(null)}
          className="transition-smooth"
        >
          All Reviews
        </Button>
        {ratings.map((rating) => (
          <Button
            key={rating}
            variant={selectedRating === rating ? "default" : "outline"}
            size="sm"
            onClick={() => onRatingChange(rating)}
            className="gap-1 transition-smooth"
          >
            <Star className={cn(
              "w-3 h-3",
              selectedRating === rating ? "fill-current" : ""
            )} />
            {rating}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalReviews} reviews
      </div>
    </div>
  );
}