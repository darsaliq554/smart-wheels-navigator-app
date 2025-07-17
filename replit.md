# SmartWheels - Smart Car Dashboard

## Project Overview
SmartWheels is a comprehensive smart car dashboard application that provides real-time monitoring and control of vehicle systems. The app features drowsiness detection, traffic analysis, motor control, and hazard light management with an intuitive mobile-first interface.

## Project Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Wouter for routing, TanStack React Query for data fetching
- **Backend**: Express.js with TypeScript, in-memory storage for real-time data
- **Mobile**: Capacitor for cross-platform mobile app development
- **Styling**: Tailwind CSS with custom automotive dark theme, shadcn/ui components
- **Map Integration**: Mapbox GL for live vehicle tracking

### Key Features
- **Real-time Monitoring**: Live drowsiness detection and traffic status updates
- **Vehicle Control**: Remote start/stop engine and hazard light control
- **Navigation**: Multi-tab interface (Dashboard, Map, Control)
- **Mobile Ready**: Capacitor setup for Android deployment
- **Responsive Design**: Optimized for both web and mobile experiences

## Recent Changes (January 17, 2025)

### Migration from Lovable to Replit
- ✅ **Routing Migration**: Converted from React Router to Wouter for Replit compatibility
- ✅ **API Integration**: Refactored API layer to use Replit backend structure with `/api` prefix
- ✅ **Database Schema**: Updated shared schema with car status, route, and user models
- ✅ **React Query Setup**: Implemented proper data fetching with real-time updates
- ✅ **Storage Layer**: Created in-memory storage with simulated real-time data
- ✅ **Backend Routes**: Added comprehensive API endpoints for car control and monitoring

### Mobile App Setup
- ✅ **Capacitor Configuration**: Initialized with "SmartWheels" (com.smart.wheels)
- ✅ **Android Platform**: Added Android support with proper build configuration
- ✅ **Build Process**: Configured production build pipeline for mobile deployment
- ✅ **Sync Complete**: Successfully synced web assets with mobile platforms

## User Preferences
- **Communication Style**: Concise, professional, action-oriented
- **Code Style**: TypeScript with proper typing, clean component structure
- **Project Priorities**: Mobile-first design, real-time functionality, secure API practices

## API Endpoints
- `GET /api/status` - Get complete car status
- `GET /api/route` - Get current route information
- `POST /api/control` - Control motor and hazard lights
- `GET /api/drowsiness` - Get drowsiness detection status
- `GET /api/traffic` - Get traffic analysis data

## Development Workflow
1. **Web Development**: Use `npm run dev` for local development
2. **Mobile Build**: Use `npm run build` followed by `npx cap sync`
3. **Android Testing**: Use `npx cap open android` to open in Android Studio

## Next Steps
- Ready for further development and feature additions
- Mobile app can be built and deployed to Android devices
- Backend can be extended with real hardware integration
- Additional features can be added to the dashboard interface