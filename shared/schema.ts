import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Car status schema
export const carStatus = pgTable("car_status", {
  id: serial("id").primaryKey(),
  drowsy: boolean("drowsy").notNull().default(false),
  traffic_jam: boolean("traffic_jam").notNull().default(false),
  motor_on: boolean("motor_on").notNull().default(false),
  hazard_on: boolean("hazard_on").notNull().default(false),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const insertCarStatusSchema = createInsertSchema(carStatus).pick({
  drowsy: true,
  traffic_jam: true,
  motor_on: true,
  hazard_on: true,
});

export type InsertCarStatus = z.infer<typeof insertCarStatusSchema>;
export type CarStatus = typeof carStatus.$inferSelect;

// Car route schema
export const carRoute = pgTable("car_route", {
  id: serial("id").primaryKey(),
  from_location: text("from_location").notNull(),
  to_location: text("to_location").notNull(),
  distance: text("distance").notNull(),
  duration: text("duration").notNull(),
  traffic_level: text("traffic_level").notNull(),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const insertCarRouteSchema = createInsertSchema(carRoute).pick({
  from_location: true,
  to_location: true,
  distance: true,
  duration: true,
  traffic_level: true,
});

export type InsertCarRoute = z.infer<typeof insertCarRouteSchema>;
export type CarRoute = typeof carRoute.$inferSelect;
