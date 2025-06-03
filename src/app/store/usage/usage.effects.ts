import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as UsageActions from './usage.actions';
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

@Injectable()
export class UsageEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  getUserUsage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserUsage),
      tap(action => console.log(`Fetching user usage for userId: ${action.userId}, limit: ${action.limit}`)),
      mergeMap(action => {
        let params = new HttpParams();
        if (action.limit) {
          params = params.set('limit', action.limit.toString());
        }

        return this.http.get<ApiUsage[]>(
          `${environment.apiUrl}/api/users/${action.userId}/usage`,
          { params }
        ).pipe(
          map(usage => UsageActions.getUserUsageSuccess({ usage })),
          catchError(error => of(UsageActions.getUserUsageFailure({ 
            error: error.error?.error || error.message || 'Failed to get usage data'
          })))
        );
      })
    )
  );

  getUserUsageStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserUsageStats),
      tap(action => console.log(`Fetching usage stats for userId: ${action.userId}, period: ${action.period}`)),
      mergeMap(action => {
        let params = new HttpParams();
        if (action.period) {
          params = params.set('period', action.period);
        }

        return this.http.get<UsageStats[]>(
          `${environment.apiUrl}/api/users/${action.userId}/usage/stats`,
          { params }
        ).pipe(
          map(stats => UsageActions.getUserUsageStatsSuccess({ stats })),
          catchError(error => of(UsageActions.getUserUsageStatsFailure({ 
            error: error.error?.error || error.message || 'Failed to get usage stats'
          })))
        );
      })
    )
  );

  getUserUsageSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserUsageSummary),
      tap(action => console.log(`Fetching usage summary for userId: ${action.userId}`)),
      mergeMap(action =>
        this.http.get<UsageSummary[]>(
          `${environment.apiUrl}/api/users/${action.userId}/usage/summary`
        ).pipe(
          map(summary => UsageActions.getUserUsageSummarySuccess({ summary })),
          catchError(error => of(UsageActions.getUserUsageSummaryFailure({ 
            error: error.error?.error || error.message || 'Failed to get usage summary'
          })))
        )
      )
    )
  );

  getUserRouteAnalytics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserRouteAnalytics),
      tap(action => console.log(`Fetching route analytics for userId: ${action.userId}, apiId: ${action.apiId}, days: ${action.days}`)),
      mergeMap(action => {
        let params = new HttpParams();
        if (action.apiId) {
          params = params.set('api_id', action.apiId.toString());
        }
        if (action.days) {
          params = params.set('days', action.days.toString());
        }

        return this.http.get<RouteAnalytics[]>(
          `${environment.apiUrl}/api/users/${action.userId}/analytics/routes`,
          { params }
        ).pipe(
          map(routeAnalytics => UsageActions.getUserRouteAnalyticsSuccess({ routeAnalytics })),
          catchError(error => of(UsageActions.getUserRouteAnalyticsFailure({ 
            error: error.error?.error || error.message || 'Failed to get route analytics'
          })))
        );
      })
    )
  );

  getUserGeocodingAnalytics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserGeocodingAnalytics),
      tap(action => console.log(`Fetching geocoding analytics for userId: ${action.userId}, apiId: ${action.apiId}, limit: ${action.limit}`)),
      mergeMap(action => {
        let params = new HttpParams();
        if (action.apiId) {
          params = params.set('api_id', action.apiId.toString());
        }
        if (action.limit) {
          params = params.set('limit', action.limit.toString());
        }

        return this.http.get<GeocodingAnalytics[]>(
          `${environment.apiUrl}/api/users/${action.userId}/analytics/geocoding`,
          { params }
        ).pipe(
          map(geocodingAnalytics => UsageActions.getUserGeocodingAnalyticsSuccess({ geocodingAnalytics })),
          catchError(error => of(UsageActions.getUserGeocodingAnalyticsFailure({ 
            error: error.error?.error || error.message || 'Failed to get geocoding analytics'
          })))
        );
      })
    )
  );

  getUserAnalyticsSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserAnalyticsSummary),
      tap(action => console.log(`Fetching analytics summary for userId: ${action.userId}, apiId: ${action.apiId}`)),
      mergeMap(action => {
        let params = new HttpParams();
        if (action.apiId) {
          params = params.set('api_id', action.apiId.toString());
        }

        return this.http.get<AnalyticsSummary>(
          `${environment.apiUrl}/api/users/${action.userId}/analytics/summary`,
          { params }
        ).pipe(
          map(summary => UsageActions.getUserAnalyticsSummarySuccess({ summary })),
          catchError(error => of(UsageActions.getUserAnalyticsSummaryFailure({ 
            error: error.error?.error || error.message || 'Failed to get analytics summary'
          })))
        );
      })
    )
  );

  getUserRouteTypeDistribution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserRouteTypeDistribution),
      tap(action => console.log(`Fetching route type distribution for userId: ${action.userId}, apiId: ${action.apiId}`)),
      mergeMap(action => {
        let params = new HttpParams();
        if (action.apiId) {
          params = params.set('api_id', action.apiId.toString());
        }

        return this.http.get<RouteTypeDistribution[]>(
          `${environment.apiUrl}/api/users/${action.userId}/analytics/route-types`,
          { params }
        ).pipe(
          map(distribution => UsageActions.getUserRouteTypeDistributionSuccess({ distribution })),
          catchError(error => of(UsageActions.getUserRouteTypeDistributionFailure({ 
            error: error.error?.error || error.message || 'Failed to get route type distribution'
          })))
        );
      })
    )
  );

  getUserApiUsageSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsageActions.getUserApiUsageSummary),
      tap(action => console.log(`Fetching API usage summary for userId: ${action.userId}`)),
      mergeMap(action =>
        this.http.get<ApiUsageSummary>(
          `${environment.apiUrl}/api/users/${action.userId}/analytics/api-usage-summary`
        ).pipe(
          map(apiUsageSummary => UsageActions.getUserApiUsageSummarySuccess({ apiUsageSummary })),
          catchError(error => of(UsageActions.getUserApiUsageSummaryFailure({ 
            error: error.error?.error || error.message || 'Failed to get API usage summary'
          })))
        )
      )
    )
  );
}