import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Map, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent h-16">
          <TabsTrigger 
            value="home" 
            className="flex-col gap-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger 
            value="map" 
            className="flex-col gap-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Map className="h-5 w-5" />
            <span>Map</span>
          </TabsTrigger>
          <TabsTrigger 
            value="control" 
            className="flex-col gap-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Settings className="h-5 w-5" />
            <span>Control</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}