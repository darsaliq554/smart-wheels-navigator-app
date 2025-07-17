import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

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
  // Use React Query for status data
  const { data: statusData, isLoading, error } = useQuery({
    queryKey: ['/api/status'],
    refetchInterval: 3000, // Refetch every 3 seconds
    refetchIntervalInBackground: true,
  });

  // Use React Query for route data
  const { data: routeData } = useQuery({
    queryKey: ['/api/route'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Motor control mutation
  const motorMutation = useMutation({
    mutationFn: async (action: 'on' | 'off') => {
      return apiRequest('/api/control', {
        method: 'POST',
        body: JSON.stringify({ motor: action }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/status'] });
    },
  });

  // Hazard control mutation
  const hazardMutation = useMutation({
    mutationFn: async (state: boolean) => {
      return apiRequest('/api/control', {
        method: 'POST',
        body: JSON.stringify({ hazard: state }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/status'] });
    },
  });

  const status: CarStatus = {
    drowsy: statusData?.drowsy || false,
    traffic_jam: statusData?.traffic_jam || false,
    motor_on: statusData?.motor_on || false,
    hazard_on: statusData?.hazard_on || false,
  };

  const route: CarRoute | null = routeData ? {
    from: routeData.from,
    to: routeData.to,
    distance: routeData.distance,
    duration: routeData.duration,
    traffic_level: routeData.traffic_level,
  } : null;

  const controlMotor = (action: 'on' | 'off') => {
    motorMutation.mutate(action);
  };

  const toggleHazard = () => {
    hazardMutation.mutate(!status.hazard_on);
  };

  return {
    status,
    route,
    isConnected: !error,
    loading: isLoading,
    error: error?.message,
    controlMotor,
    toggleHazard,
  };
}