export interface ApiUsage {
  id: number;
  user_id: number;
  api_id: number;
  api_key_id: number;
  timestamp: string;
  endpoint: string;
  response_time: number;
  status_code: number;
  ip_address: string;
  request_size: number;
  response_size: number;
  user_agent: string;
  created_at: string;
  modified_at: string;
}

export interface UsageStats {
  time_period: string;
  count: number;
  avg_response_time: number;
  total_request_size: number;
  total_response_size: number;
  api_id: number;
}

export interface UsageSummary {
  api_id: number;
  total_requests: number;
  avg_response_time: number;
  first_used: string | null;
  last_used: string | null;
}

export interface RouteAnalytics {
  id: number;
  user_id: number;
  api_id: number;
  start_point: {
    latitude: number | null;
    longitude: number | null;
  };
  end_point: {
    latitude: number | null;
    longitude: number | null;
  };
  distance_meters: number;
  duration_seconds: number;
  route_type: string;
  timestamp: string;
}

export interface GeocodingAnalytics {
  id: number;
  user_id: number;
  api_id: number;
  address: string;
  formatted_address: string;
  place_id: string;
  location_type: string;
  timestamp: string;
}

// Updated AnalyticsSummary to include both totals and averages
export interface AnalyticsSummary {
  total_requests: number;
  // Total values
  total_distance: number;
  total_duration: number;
  // Average values
  avg_distance: number;
  avg_duration: number;
  // Maximum values
  max_distance: number;
  max_duration: number;
}

export interface RouteTypeDistribution {
  route_type: string;
  count: number;
}

export interface ApiUsageSummary {
  total_apis: number;
  used_apis_count: number;
  used_apis: Array<{
    id: number;
    name: string;
  }>;
}