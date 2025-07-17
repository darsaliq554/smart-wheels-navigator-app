import { useState, useEffect } from 'react';
import { getDrowsinessStatus, getTrafficStatus, controlMotor as apiControlMotor, toggleHazard as apiToggleHazard, getRoute } from '@/lib/api';

interface CarStatus {
  drowsy: boolean;
  traffic_jam: boolean;
  motor_on: boolean;
  hazard_on: boolean;
}

interface CarRoute {
  from: string;
  to: string;
  distance: string;
  duration: string;
  traffic_level: 'low' | 'medium' | 'high';
}

export function useCarAPI() {
  const [status, setStatus] = useState<CarStatus>({
    drowsy: false,
    traffic_jam: false,
    motor_on: false,
    hazard_on: false,
  });
  const [route, setRoute] = useState<CarRoute | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real-time status from Flask backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [drowsinessResult, trafficResult] = await Promise.all([
          getDrowsinessStatus(),
          getTrafficStatus()
        ]);

        if (drowsinessResult.error || trafficResult.error) {
          setError(drowsinessResult.error || trafficResult.error || 'API connection failed');
          setIsConnected(false);
        } else {
          setStatus(prev => ({
            ...prev,
            drowsy: drowsinessResult.data?.drowsy || false,
            traffic_jam: trafficResult.data?.traffic_jam || false,
          }));
          setIsConnected(true);
          setError(null);
        }
      } catch (err) {
        setError('Failed to connect to Flask backend');
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStatus();

    // Poll for updates every 3 seconds
    const interval = setInterval(fetchStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fetch route data
  useEffect(() => {
    const fetchRoute = async () => {
      const routeResult = await getRoute();
      if (routeResult.data) {
        setRoute(routeResult.data);
      } else {
        // Fallback route data if API doesn't have route endpoint yet
        setRoute({
          from: "Home",
          to: "Office", 
          distance: "12.3 km",
          duration: "18 min",
          traffic_level: 'low',
        });
      }
    };

    fetchRoute();
  }, []);

  const controlMotor = async (action: 'on' | 'off') => {
    try {
      const result = await apiControlMotor(action);
      if (result.error) {
        setError(result.error);
      } else {
        setStatus(prev => ({ ...prev, motor_on: action === 'on' }));
        setError(null);
      }
    } catch (error) {
      console.error('Motor control failed:', error);
      setError('Motor control failed');
    }
  };

  const toggleHazard = async () => {
    try {
      const newState = !status.hazard_on;
      const result = await apiToggleHazard(newState);
      if (result.error) {
        setError(result.error);
      } else {
        setStatus(prev => ({ ...prev, hazard_on: newState }));
        setError(null);
      }
    } catch (error) {
      console.error('Hazard toggle failed:', error);
      setError('Hazard control failed');
    }
  };

  return {
    status,
    route,
    isConnected,
    loading,
    error,
    controlMotor,
    toggleHazard,
  };
}