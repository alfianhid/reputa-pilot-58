import { Star, TrendingUp, MessageSquare, Users } from "lucide-react";
import { StatsCard } from "@/components/analytics/StatsCard";
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data - replace with actual API calls
const ratingTrendData = [
  { month: 'Jan', rating: 4.2 },
  { month: 'Feb', rating: 4.3 },
  { month: 'Mar', rating: 4.1 },
  { month: 'Apr', rating: 4.4 },
  { month: 'May', rating: 4.5 },
  { month: 'Jun', rating: 4.6 },
];

const volumeData = [
  { month: 'Jan', reviews: 12 },
  { month: 'Feb', reviews: 19 },
  { month: 'Mar', reviews: 15 },
  { month: 'Apr', reviews: 25 },
  { month: 'May', reviews: 22 },
  { month: 'Jun', reviews: 30 },
];

const sentimentData = [
  { name: 'Positive', value: 65, color: 'hsl(var(--success))' },
  { name: 'Neutral', value: 25, color: 'hsl(var(--warning))' },
  { name: 'Negative', value: 10, color: 'hsl(var(--destructive))' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Insights and trends from your customer reviews
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Average Rating"
          value="4.6"
          change="+0.2 this month"
          trend="up"
          icon={Star}
          description="Based on 123 reviews"
        />
        <StatsCard
          title="Total Reviews"
          value="123"
          change="+23% vs last month"
          trend="up"
          icon={MessageSquare}
          description="30 this month"
        />
        <StatsCard
          title="Response Rate"
          value="87%"
          change="+12% vs last month"
          trend="up"
          icon={TrendingUp}
          description="107 of 123 replied"
        />
        <StatsCard
          title="New Customers"
          value="89"
          change="+5% vs last month"
          trend="up"
          icon={Users}
          description="From review referrals"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Rating Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                domain={[3.5, 5]} 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Review Volume */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Review Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="reviews" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Key Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Response Time</span>
              <span className="font-semibold text-foreground">2.3 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">5-Star Reviews</span>
              <span className="font-semibold text-success">78 (63%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">1-Star Reviews</span>
              <span className="font-semibold text-destructive">5 (4%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Flagged Reviews</span>
              <span className="font-semibold text-warning">3 (2%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Review Growth</span>
              <span className="font-semibold text-success">+23% MoM</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}