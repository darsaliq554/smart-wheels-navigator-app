import { useState, useEffect } from 'react';

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

export function useCarAPI(baseUrl: string = 'https://your-pi-ip:5000') {
  const [status, setStatus] = useState<CarStatus>({
    drowsy: false,
    traffic_jam: false,
    motor_on: false,
    hazard_on: false,
  });
  const [route, setRoute] = useState<CarRoute | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for demo purposes
  useEffect(() => {
    // Simulate API connection
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        drowsy: Math.random() > 0.8,
        traffic_jam: Math.random() > 0.7,
      }));
      setIsConnected(true);
      setLoading(false);
    }, 2000);

    // Mock route data
    setRoute({
      from: "Home",
      to: "Office",
      distance: "12.3 km",
      duration: "18 min",
      traffic_level: Math.random() > 0.5 ? 'low' : 'medium',
    });

    return () => clearInterval(interval);
  }, []);

  const controlMotor = async (action: 'on' | 'off') => {
    try {
      // Mock API call
      setStatus(prev => ({ ...prev, motor_on: action === 'on' }));
      // In real implementation:
      // await fetch(`${baseUrl}/control`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ motor: action })
      // });
    } catch (error) {
      console.error('Motor control failed:', error);
    }
  };

  const toggleHazard = async () => {
    try {
      const newState = !status.hazard_on;
      setStatus(prev => ({ ...prev, hazard_on: newState }));
      // In real implementation:
      // await fetch(`${baseUrl}/control`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ hazard: newState })
      // });
    } catch (error) {
      console.error('Hazard toggle failed:', error);
    }
  };

  return {
    status,
    route,
    isConnected,
    loading,
    controlMotor,
    toggleHazard,
  };
}