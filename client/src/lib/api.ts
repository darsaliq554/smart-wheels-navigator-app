interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Generic API fetch wrapper with error handling
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    return { 
      error: error instanceof Error ? error.message : 'Network error - check backend connection'
    };
  }
}

// Drowsiness detection API
export async function getDrowsinessStatus(): Promise<ApiResponse<{ drowsy: boolean; confidence?: number }>> {
  return apiCall('/drowsiness');
}

// Traffic detection API  
export async function getTrafficStatus(): Promise<ApiResponse<{ traffic_jam: boolean; congestion_score?: number }>> {
  return apiCall('/traffic');
}

// Motor control API
export async function controlMotor(action: 'on' | 'off'): Promise<ApiResponse<{ success: boolean; motor_on: boolean }>> {
  return apiCall('/control', {
    method: 'POST',
    body: JSON.stringify({ motor: action }),
  });
}

// Hazard lights control API
export async function toggleHazard(state: boolean): Promise<ApiResponse<{ success: boolean; hazard_on: boolean }>> {
  return apiCall('/control', {
    method: 'POST',
    body: JSON.stringify({ hazard: state }),
  });
}

// Get route information (if available)
export async function getRoute(from?: string, to?: string): Promise<ApiResponse<{
  from: string;
  to: string;
  distance: string;
  duration: string;
  traffic_level: 'low' | 'medium' | 'high';
}>> {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  
  return apiCall(`/route${params.toString() ? `?${params.toString()}` : ''}`);
}