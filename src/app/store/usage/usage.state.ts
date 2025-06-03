import {
  ApiUsage,
  UsageStats,
  UsageSummary,
  RouteAnalytics,
  GeocodingAnalytics,
  AnalyticsSummary,
  RouteTypeDistribution,
  ApiUsageSummary
} from './usage.model';

export interface UsageState {
  // API Usage
  usage: ApiUsage[];
  usageStats: UsageStats[];
  usageSummary: UsageSummary[];
  
  // Analytics
  routeAnalytics: RouteAnalytics[];
  geocodingAnalytics: GeocodingAnalytics[];
  analyticsSummary: AnalyticsSummary | null;
  routeTypeDistribution: RouteTypeDistribution[];
  apiUsageSummary: ApiUsageSummary | null;
  
  // Loading states
  loadingUsage: boolean;
  loadingStats: boolean;
  loadingSummary: boolean;
  loadingRouteAnalytics: boolean;
  loadingGeocodingAnalytics: boolean;
  loadingAnalyticsSummary: boolean;
  loadingRouteTypeDistribution: boolean;
  loadingApiUsageSummary: boolean;
  isLoading: boolean;
  
  // Error states
  error: string | null;
}

export const initialState: UsageState = {
  usage: [],
  usageStats: [],
  usageSummary: [],
  routeAnalytics: [],
  geocodingAnalytics: [],
  analyticsSummary: null,
  routeTypeDistribution: [],
  apiUsageSummary: null,
  loadingUsage: false,
  loadingStats: false,
  loadingSummary: false,
  loadingRouteAnalytics: false,
  loadingGeocodingAnalytics: false,
  loadingAnalyticsSummary: false,
  loadingRouteTypeDistribution: false,
  loadingApiUsageSummary: false,
  isLoading: false,
  error: null
};