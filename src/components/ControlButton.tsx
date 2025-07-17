import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "success" | "destructive";
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ControlButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = "default",
  isActive = false,
  disabled = false,
  className 
}: ControlButtonProps) {
  const getVariant = () => {
    if (variant === "success") return "success";
    if (variant === "destructive") return "destructive";
    return "control";
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={getVariant()}
      size="lg"
      className={cn(
        "h-16 flex-col gap-2 text-xs font-medium relative",
        isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className
      )}
    >
      <Icon className="h-6 w-6" />
      <span>{label}</span>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}
    </Button>
  );
}