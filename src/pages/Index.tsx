import { useState } from "react";
import { StatusCard } from "@/components/StatusCard";
import { ControlButton } from "@/components/ControlButton";
import { MapView } from "@/components/MapView";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCarAPI } from "@/hooks/useCarAPI";
import { 
  Car, 
  Square, 
  TriangleAlert, 
  Route, 
  Wifi, 
  WifiOff,
  Eye,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { status, route, isConnected, loading, controlMotor, toggleHazard } = useCarAPI();

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Smart Car Dashboard
        </h1>
        <div className="flex items-center justify-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4 text-success" />
              <span className="text-sm text-success">Connected to Vehicle</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">
                {loading ? "Connecting..." : "Vehicle Offline"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusCard
          title="Driver Status"
          status={status.drowsy ? "Drowsy" : "Alert"}
          emoji={status.drowsy ? "😴" : "🙂"}
          isGood={!status.drowsy}
          description={status.drowsy ? "Please take a break" : "Driver is alert"}
        />
        <StatusCard
          title="Traffic Conditions"
          status={status.traffic_jam ? "Heavy Traffic" : "Clear Road"}
          emoji={status.traffic_jam ? "🔴" : "🟢"}
          isGood={!status.traffic_jam}
          description={status.traffic_jam ? "Delays expected" : "Smooth traffic flow"}
        />
      </div>

      {/* Current Route */}
      {route && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Route className="h-4 w-4" />
              Current Route
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">From:</span>
              <span className="font-medium">{route.from}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">To:</span>
              <span className="font-medium">{route.to}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{route.distance}</div>
                <div className="text-xs text-muted-foreground">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{route.duration}</div>
                <div className="text-xs text-muted-foreground">ETA</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <ControlButton
              icon={status.motor_on ? Square : Car}
              label={status.motor_on ? "Stop Car" : "Start Car"}
              onClick={() => controlMotor(status.motor_on ? 'off' : 'on')}
              variant={status.motor_on ? "destructive" : "success"}
              isActive={status.motor_on}
            />
            <ControlButton
              icon={TriangleAlert}
              label="Hazard Lights"
              onClick={toggleHazard}
              variant="default"
              isActive={status.hazard_on}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMapTab = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Live Map View</h2>
        <p className="text-sm text-muted-foreground">Real-time traffic and route optimization</p>
      </div>
      <MapView />
      {route && (
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Route Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Traffic Level:</span>
              <span className={cn(
                "text-sm font-medium",
                route.traffic_level === 'low' ? "text-success" : 
                route.traffic_level === 'medium' ? "text-warning" : "text-destructive"
              )}>
                {route.traffic_level.charAt(0).toUpperCase() + route.traffic_level.slice(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderControlTab = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Vehicle Control</h2>
        <p className="text-sm text-muted-foreground">Remote control your smart car</p>
      </div>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-sm">Motor Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ControlButton
              icon={Car}
              label="Start Engine"
              onClick={() => controlMotor('on')}
              variant="success"
              disabled={status.motor_on}
            />
            <ControlButton
              icon={Square}
              label="Stop Engine"
              onClick={() => controlMotor('off')}
              variant="destructive"
              disabled={!status.motor_on}
            />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Engine Status: <span className={cn(
              "font-medium",
              status.motor_on ? "text-success" : "text-muted-foreground"
            )}>
              {status.motor_on ? "Running" : "Stopped"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-sm">Safety Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <ControlButton
            icon={TriangleAlert}
            label={status.hazard_on ? "Turn Off Hazards" : "Turn On Hazards"}
            onClick={toggleHazard}
            variant="default"
            isActive={status.hazard_on}
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-sm">Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Driver Monitoring</span>
            </div>
            <span className={cn(
              "text-sm font-medium",
              status.drowsy ? "text-destructive" : "text-success"
            )}>
              {status.drowsy ? "Alert Detected" : "Normal"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              <span className="text-sm">Traffic Analysis</span>
            </div>
            <span className={cn(
              "text-sm font-medium",
              status.traffic_jam ? "text-warning" : "text-success"
            )}>
              {status.traffic_jam ? "Heavy" : "Light"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 pb-20">
          {activeTab === "home" && renderHomeTab()}
          {activeTab === "map" && renderMapTab()}
          {activeTab === "control" && renderControlTab()}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
