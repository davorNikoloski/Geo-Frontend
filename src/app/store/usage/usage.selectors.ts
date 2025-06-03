import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsageState } from './usage.state';
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

export const selectUsageState = createFeatureSelector<UsageState>('usage');

// Data selectors
export const selectUsage = createSelector(
  selectUsageState,
  (state: UsageState) => state.usage
);

export const selectUsageStats = createSelector(
  selectUsageState,
  (state: UsageState) => state.usageStats
);

export const selectUsageSummary = createSelector(
  selectUsageState,
  (state: UsageState) => state.usageSummary
);

export const selectRouteAnalytics = createSelector(
  selectUsageState,
  (state: UsageState) => state.routeAnalytics
);

export const selectGeocodingAnalytics = createSelector(
  selectUsageState,
  (state: UsageState) => state.geocodingAnalytics
);

export const selectAnalyticsSummary = createSelector(
  selectUsageState,
  (state: UsageState) => state.analyticsSummary
);

export const selectRouteTypeDistribution = createSelector(
  selectUsageState,
  (state: UsageState) => state.routeTypeDistribution
);

export const selectApiUsageSummary = createSelector(
  selectUsageState,
  (state: UsageState) => state.apiUsageSummary
);

// General loading selector
export const selectIsLoading = createSelector(
  selectUsageState,
  (state: UsageState) => state.isLoading
);

// Error selector
export const selectError = createSelector(
  selectUsageState,
  (state: UsageState) => state.error
);

// Computed selectors
export const selectUsageByApi = createSelector(
  selectUsage,
  (usage) => {
    return usage.reduce((acc, item) => {
      if (!acc[item.api_id]) {
        acc[item.api_id] = [];
      }
      acc[item.api_id].push(item);
      return acc;
    }, {} as Record<number, ApiUsage[]>);
  }
);

export const selectTotalRequests = createSelector(
  selectUsage,
  (usage) => usage.length
);

export const selectAverageResponseTime = createSelector(
  selectUsage,
  (usage) => {
    if (usage.length === 0) return 0;
    const total = usage.reduce((sum, item) => sum + (item.response_time || 0), 0);
    return total / usage.length;
  }
);

export const selectMostUsedApis = createSelector(
  selectUsageSummary,
  (summary) => {
    return summary
      .sort((a, b) => b.total_requests - a.total_requests)
      .slice(0, 5);
  }
);

export const selectRouteAnalyticsByType = createSelector(
  selectRouteAnalytics,
  (routes) => {
    return routes.reduce((acc, route) => {
      const type = route.route_type || 'unknown';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(route);
      return acc;
    }, {} as Record<string, RouteAnalytics[]>);
  }
);