import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Car status endpoints
  app.get("/api/status", async (req, res) => {
    try {
      const status = await storage.getCarStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to get car status" });
    }
  });

  // Drowsiness detection endpoint
  app.get("/api/drowsiness", async (req, res) => {
    try {
      const status = await storage.getCarStatus();
      res.json({ drowsy: status?.drowsy || false });
    } catch (error) {
      res.status(500).json({ error: "Failed to get drowsiness status" });
    }
  });

  // Traffic status endpoint
  app.get("/api/traffic", async (req, res) => {
    try {
      const status = await storage.getCarStatus();
      res.json({ traffic_jam: status?.traffic_jam || false });
    } catch (error) {
      res.status(500).json({ error: "Failed to get traffic status" });
    }
  });

  // Control endpoint
  app.post("/api/control", async (req, res) => {
    try {
      const { motor, hazard } = req.body;
      const updates: any = {};
      
      if (motor !== undefined) {
        updates.motor_on = motor === 'on';
      }
      
      if (hazard !== undefined) {
        updates.hazard_on = hazard;
      }
      
      const status = await storage.updateCarStatus(updates);
      res.json({ success: true, ...status });
    } catch (error) {
      res.status(500).json({ error: "Failed to control car" });
    }
  });

  // Route endpoint
  app.get("/api/route", async (req, res) => {
    try {
      const route = await storage.getCarRoute();
      if (route) {
        res.json({
          from: route.from_location,
          to: route.to_location,
          distance: route.distance,
          duration: route.duration,
          traffic_level: route.traffic_level,
        });
      } else {
        res.status(404).json({ error: "No route found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get route" });
    }
  });

  // Simulate real-time data updates
  setInterval(async () => {
    try {
      // Simulate drowsiness detection changes
      const shouldToggleDrowsy = Math.random() < 0.1; // 10% chance
      if (shouldToggleDrowsy) {
        const currentStatus = await storage.getCarStatus();
        await storage.updateCarStatus({
          drowsy: !currentStatus?.drowsy,
        });
      }

      // Simulate traffic changes
      const shouldToggleTraffic = Math.random() < 0.05; // 5% chance
      if (shouldToggleTraffic) {
        const currentStatus = await storage.getCarStatus();
        await storage.updateCarStatus({
          traffic_jam: !currentStatus?.traffic_jam,
        });
      }
    } catch (error) {
      console.error("Error updating simulated data:", error);
    }
  }, 5000); // Update every 5 seconds

  const httpServer = createServer(app);

  return httpServer;
}
