import { createAction, props } from '@ngrx/store';
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

// Get User Usage
export const getUserUsage = createAction(
  '[Usage] Get User Usage',
  props<{ userId: number; limit?: number }>()
);

export const getUserUsageSuccess = createAction(
  '[Usage] Get User Usage Success',
  props<{ usage: ApiUsage[] }>()
);

export const getUserUsageFailure = createAction(
  '[Usage] Get User Usage Failure',
  props<{ error: string }>()
);

// Get Usage Stats
export const getUserUsageStats = createAction(
  '[Usage] Get User Usage Stats',
  props<{ userId: number; period?: 'hour' | 'day' | 'month' }>()
);

export const getUserUsageStatsSuccess = createAction(
  '[Usage] Get User Usage Stats Success',
  props<{ stats: UsageStats[] }>()
);

export const getUserUsageStatsFailure = createAction(
  '[Usage] Get User Usage Stats Failure',
  props<{ error: string }>()
);

// Get Usage Summary
export const getUserUsageSummary = createAction(
  '[Usage] Get User Usage Summary',
  props<{ userId: number }>()
);

export const getUserUsageSummarySuccess = createAction(
  '[Usage] Get User Usage Summary Success',
  props<{ summary: UsageSummary[] }>()
);

export const getUserUsageSummaryFailure = createAction(
  '[Usage] Get User Usage Summary Failure',
  props<{ error: string }>()
);

// Get Route Analytics
export const getUserRouteAnalytics = createAction(
  '[Usage] Get User Route Analytics',
  props<{ userId: number; apiId?: number; days?: number }>()
);

export const getUserRouteAnalyticsSuccess = createAction(
  '[Usage] Get User Route Analytics Success',
  props<{ routeAnalytics: RouteAnalytics[] }>()
);

export const getUserRouteAnalyticsFailure = createAction(
  '[Usage] Get User Route Analytics Failure',
  props<{ error: string }>()
);

// Get Geocoding Analytics
export const getUserGeocodingAnalytics = createAction(
  '[Usage] Get User Geocoding Analytics',
  props<{ userId: number; apiId?: number; limit?: number }>()
);

export const getUserGeocodingAnalyticsSuccess = createAction(
  '[Usage] Get User Geocoding Analytics Success',
  props<{ geocodingAnalytics: GeocodingAnalytics[] }>()
);

export const getUserGeocodingAnalyticsFailure = createAction(
  '[Usage] Get User Geocoding Analytics Failure',
  props<{ error: string }>()
);

// Get Analytics Summary
export const getUserAnalyticsSummary = createAction(
  '[Usage] Get User Analytics Summary',
  props<{ userId: number; apiId?: number }>()
);

export const getUserAnalyticsSummarySuccess = createAction(
  '[Usage] Get User Analytics Summary Success',
  props<{ summary: AnalyticsSummary }>()
);

export const getUserAnalyticsSummaryFailure = createAction(
  '[Usage] Get User Analytics Summary Failure',
  props<{ error: string }>()
);

// Get Route Type Distribution
export const getUserRouteTypeDistribution = createAction(
  '[Usage] Get User Route Type Distribution',
  props<{ userId: number; apiId?: number }>()
);

export const getUserRouteTypeDistributionSuccess = createAction(
  '[Usage] Get User Route Type Distribution Success',
  props<{ distribution: RouteTypeDistribution[] }>()
);

export const getUserRouteTypeDistributionFailure = createAction(
  '[Usage] Get User Route Type Distribution Failure',
  props<{ error: string }>()
);

// Get API Usage Summary
export const getUserApiUsageSummary = createAction(
  '[Usage] Get User API Usage Summary',
  props<{ userId: number }>()
);

export const getUserApiUsageSummarySuccess = createAction(
  '[Usage] Get User API Usage Summary Success',
  props<{ apiUsageSummary: ApiUsageSummary }>()
);

export const getUserApiUsageSummaryFailure = createAction(
  '[Usage] Get User API Usage Summary Failure',
  props<{ error: string }>()
);

// Clear Usage Data
export const clearUsageData = createAction('[Usage] Clear Usage Data');

// Clear Error
export const clearError = createAction('[Usage] Clear Error');