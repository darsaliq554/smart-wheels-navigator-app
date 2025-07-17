import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  status: string;
  emoji: string;
  isGood: boolean;
  description?: string;
  className?: string;
}

export function StatusCard({ title, status, emoji, isGood, description, className }: StatusCardProps) {
  return (
    <Card className={cn(
      "bg-gradient-card border-border shadow-card hover:shadow-status transition-all duration-300",
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{emoji}</div>
          <div className="flex-1">
            <div className={cn(
              "text-lg font-semibold",
              isGood ? "text-success" : "text-destructive"
            )}>
              {status}
            </div>
            {description && (
              <div className="text-sm text-muted-foreground mt-1">
                {description}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}