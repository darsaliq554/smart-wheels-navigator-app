import { 
  users, 
  type User, 
  type InsertUser,
  carStatus,
  type CarStatus,
  type InsertCarStatus,
  carRoute,
  type CarRoute,
  type InsertCarRoute
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Car status methods
  getCarStatus(): Promise<CarStatus | undefined>;
  updateCarStatus(status: Partial<InsertCarStatus>): Promise<CarStatus>;
  
  // Car route methods
  getCarRoute(): Promise<CarRoute | undefined>;
  updateCarRoute(route: InsertCarRoute): Promise<CarRoute>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private carStatusData: CarStatus | undefined;
  private carRouteData: CarRoute | undefined;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Initialize with default car status
    this.carStatusData = {
      id: 1,
      drowsy: false,
      traffic_jam: false,
      motor_on: false,
      hazard_on: false,
      last_updated: new Date(),
    };
    
    // Initialize with default route
    this.carRouteData = {
      id: 1,
      from_location: "Home",
      to_location: "Office",
      distance: "12.3 km",
      duration: "18 min",
      traffic_level: "low",
      last_updated: new Date(),
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCarStatus(): Promise<CarStatus | undefined> {
    return this.carStatusData;
  }

  async updateCarStatus(status: Partial<InsertCarStatus>): Promise<CarStatus> {
    this.carStatusData = {
      ...this.carStatusData!,
      ...status,
      last_updated: new Date(),
    };
    return this.carStatusData;
  }

  async getCarRoute(): Promise<CarRoute | undefined> {
    return this.carRouteData;
  }

  async updateCarRoute(route: InsertCarRoute): Promise<CarRoute> {
    this.carRouteData = {
      id: this.carRouteData?.id || 1,
      ...route,
      last_updated: new Date(),
    };
    return this.carRouteData;
  }
}

export const storage = new MemStorage();
