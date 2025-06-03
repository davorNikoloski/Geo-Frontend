import { createReducer, on } from '@ngrx/store';
import { initialState } from './usage.state';
import * as UsageActions from './usage.actions';

export const usageReducer = createReducer(
  initialState,

  // Get User Usage
  on(UsageActions.getUserUsage, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserUsageSuccess, (state, { usage }) => ({
    ...state,
    usage,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserUsageFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get Usage Stats
  on(UsageActions.getUserUsageStats, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserUsageStatsSuccess, (state, { stats }) => ({
    ...state,
    usageStats: stats,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserUsageStatsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get Usage Summary
  on(UsageActions.getUserUsageSummary, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserUsageSummarySuccess, (state, { summary }) => ({
    ...state,
    usageSummary: summary,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserUsageSummaryFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get Route Analytics
  on(UsageActions.getUserRouteAnalytics, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserRouteAnalyticsSuccess, (state, { routeAnalytics }) => ({
    ...state,
    routeAnalytics,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserRouteAnalyticsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get Geocoding Analytics
  on(UsageActions.getUserGeocodingAnalytics, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserGeocodingAnalyticsSuccess, (state, { geocodingAnalytics }) => ({
    ...state,
    geocodingAnalytics,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserGeocodingAnalyticsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get Analytics Summary
  on(UsageActions.getUserAnalyticsSummary, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserAnalyticsSummarySuccess, (state, { summary }) => ({
    ...state,
    analyticsSummary: summary,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserAnalyticsSummaryFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get Route Type Distribution
  on(UsageActions.getUserRouteTypeDistribution, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserRouteTypeDistributionSuccess, (state, { distribution }) => ({
    ...state,
    routeTypeDistribution: distribution,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserRouteTypeDistributionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Get API Usage Summary
  on(UsageActions.getUserApiUsageSummary, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UsageActions.getUserApiUsageSummarySuccess, (state, { apiUsageSummary }) => ({
    ...state,
    apiUsageSummary,
    isLoading: false,
    error: null
  })),

  on(UsageActions.getUserApiUsageSummaryFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Clear Usage Data
  on(UsageActions.clearUsageData, state => ({
    ...initialState,
    isLoading: false,
    error: null
  })),

  // Clear Error
  on(UsageActions.clearError, state => ({
    ...state,
    error: null
  }))
);