import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../store';
import {
  ApiUsage,
  UsageStats,
  UsageSummary,
  RouteAnalytics,
  GeocodingAnalytics,
  AnalyticsSummary,
  RouteTypeDistribution,
  ApiUsageSummary
} from '../../store/usage/usage.model';
import * as UsageActions from '../../store/usage/usage.actions';
import * as UsageSelectors from '../../store/usage/usage.selectors';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import { HeroComponent } from './components/hero/hero.component';
import { LoadingComponent } from './components/loading-error/loading.component';
import { ErrorComponent } from './components/loading-error/error.component';
import { TabsNavigationComponent } from './components/navigation/tabs-navigation.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SummaryTabComponent } from './components/summary-tab/summary-tab.component';
import { UsageStatsTabComponent } from './components/stats-tab/usage-stats-tab.component';
import { RecentActivityTabComponent } from './components/recent-tab/recent-activity-tab.component';
import { RouteAnalyticsTabComponent } from './components/route-tab/route-analytics-tab.component';
import { GeocodingAnalyticsTabComponent } from './components/geocoding-tab/geocoding-analytics-tab.component';

interface ApiUsageStats {
  apiId: number;
  stats: UsageStats[];
}

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HeroComponent,
    LoadingComponent,
    ErrorComponent,
    TabsNavigationComponent,
    FiltersComponent,
    SummaryTabComponent,
    UsageStatsTabComponent,
    RecentActivityTabComponent,
    RouteAnalyticsTabComponent,
    GeocodingAnalyticsTabComponent
  ],
})
export class UsageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  activeTab: string = 'summary';
  selectedApi: string = 'all';
  timePeriod: string = 'day';

  userId$: Observable<string | null>;
  usage$: Observable<ApiUsage[]>;
  usageStats$: Observable<UsageStats[]>;
  usageSummary$: Observable<UsageSummary[]>;
  routeAnalytics$: Observable<RouteAnalytics[]>;
  geocodingAnalytics$: Observable<GeocodingAnalytics[]>;
  analyticsSummary$: Observable<AnalyticsSummary | null>;
  routeTypeDistribution$: Observable<RouteTypeDistribution[]>;
  apiUsageSummary$: Observable<ApiUsageSummary | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  usage: ApiUsage[] = [];
  usageStats: UsageStats[] = [];
  usageStatsByApi: ApiUsageStats[] = [];
  usageSummary: UsageSummary[] = [];
  routeAnalytics: RouteAnalytics[] = [];
  geocodingAnalytics: GeocodingAnalytics[] = [];
  analyticsSummary: AnalyticsSummary | null = null;
  routeTypeDistribution: RouteTypeDistribution[] = [];
  apiUsageSummary: ApiUsageSummary | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  recentActivity: ApiUsage[] = [];
  totalRequests: number = 0;
  averageResponseTime: number = 0;

  constructor(private store: Store<AppState>) {
    this.userId$ = this.store.select(AuthSelectors.selectUserId);
    this.usage$ = this.store.select(UsageSelectors.selectUsage);
    this.usageStats$ = this.store.select(UsageSelectors.selectUsageStats);
    this.usageSummary$ = this.store.select(UsageSelectors.selectUsageSummary);
    this.routeAnalytics$ = this.store.select(UsageSelectors.selectRouteAnalytics);
    this.geocodingAnalytics$ = this.store.select(UsageSelectors.selectGeocodingAnalytics);
    this.analyticsSummary$ = this.store.select(UsageSelectors.selectAnalyticsSummary);
    this.routeTypeDistribution$ = this.store.select(UsageSelectors.selectRouteTypeDistribution);
    this.apiUsageSummary$ = this.store.select(UsageSelectors.selectApiUsageSummary);
    this.isLoading$ = this.store.select(UsageSelectors.selectIsLoading);
    this.error$ = this.store.select(UsageSelectors.selectError);
  }

  ngOnInit(): void {
    this.subscribeToStoreData();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToStoreData(): void {
    this.usage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(usage => {
        this.usage = usage || [];
        this.updateComputedProperties();
      });

    this.usageStats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => {
        this.usageStats = stats || [];
        this.updateUsageStatsByApi();
      });

    this.usageSummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.usageSummary = summary || [];
      });

    this.routeAnalytics$
      .pipe(takeUntil(this.destroy$))
      .subscribe(analytics => {
        this.routeAnalytics = analytics || [];
      });

    this.geocodingAnalytics$
      .pipe(takeUntil(this.destroy$))
      .subscribe(analytics => {
        this.geocodingAnalytics = analytics || [];
      });

    this.analyticsSummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.analyticsSummary = summary;
      });

    this.routeTypeDistribution$
      .pipe(takeUntil(this.destroy$))
      .subscribe(distribution => {
        this.routeTypeDistribution = distribution || [];
      });

    this.apiUsageSummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.apiUsageSummary = summary;
        this.updateUsageStatsByApi();
      });

    this.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading ?? false;
      });

    this.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error = error;
      });
  }

  private updateUsageStatsByApi(): void {
    if (!this.apiUsageSummary || !this.usageStats.length) {
      this.usageStatsByApi = [];
      return;
    }

    const statsByApi: { [key: number]: UsageStats[] } = {};
    this.apiUsageSummary.used_apis.forEach(api => {
      statsByApi[api.id] = this.usageStats.filter(stat => stat.api_id === api.id) || [];
    });

    this.usageStatsByApi = this.apiUsageSummary.used_apis.map(api => ({
      apiId: api.id,
      stats: statsByApi[api.id] || []
    }));
  }

  private loadInitialData(): void {
    this.userId$.pipe(takeUntil(this.destroy$)).subscribe(userId => {
      if (userId) {
        const parsedUserId = parseInt(userId);
        this.store.dispatch(UsageActions.getUserApiUsageSummary({ userId: parsedUserId }));
        this.store.dispatch(UsageActions.getUserUsage({ userId: parsedUserId, limit: 50 }));
        this.store.dispatch(UsageActions.getUserUsageSummary({ userId: parsedUserId }));
        this.store.dispatch(UsageActions.getUserUsageStats({ userId: parsedUserId, period: 'day' }));
        this.store.dispatch(UsageActions.getUserRouteAnalytics({ userId: parsedUserId, days: 30 }));
        this.store.dispatch(UsageActions.getUserGeocodingAnalytics({ userId: parsedUserId, limit: 20 }));
        this.store.dispatch(UsageActions.getUserAnalyticsSummary({ userId: parsedUserId }));
        this.store.dispatch(UsageActions.getUserRouteTypeDistribution({ userId: parsedUserId }));
      }
    });
  }

  private updateComputedProperties(): void {
    this.recentActivity = [...this.usage]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    this.totalRequests = this.usage.length;

    if (this.usage.length > 0) {
      const totalResponseTime = this.usage.reduce((sum, item) => sum + (item.response_time || 0), 0);
      this.averageResponseTime = totalResponseTime / this.usage.length;
    } else {
      this.averageResponseTime = 0;
    }
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  onApiFilterChange(apiId: string): void {
    this.selectedApi = apiId;
    const parsedApiId = apiId !== 'all' ? parseInt(apiId) : undefined;
    
    this.userId$.pipe(takeUntil(this.destroy$)).subscribe(userId => {
      if (userId) {
        const parsedUserId = parseInt(userId);
        this.store.dispatch(UsageActions.getUserRouteAnalytics({ 
          userId: parsedUserId, 
          days: 30,
          ...(parsedApiId && { apiId: parsedApiId })
        }));
        
        this.store.dispatch(UsageActions.getUserGeocodingAnalytics({ 
          userId: parsedUserId, 
          limit: 20,
          ...(parsedApiId && { apiId: parsedApiId })
        }));
        
        this.store.dispatch(UsageActions.getUserAnalyticsSummary({ 
          userId: parsedUserId,
          ...(parsedApiId && { apiId: parsedApiId })
        }));
        
        this.store.dispatch(UsageActions.getUserRouteTypeDistribution({ 
          userId: parsedUserId,
          ...(parsedApiId && { apiId: parsedApiId })
        }));
      }
    });
  }

  onTimePeriodChange(period: string): void {
    this.timePeriod = period;
    let apiPeriod: 'hour' | 'day' | 'month' = 'day';
    let days = 7;
    
    switch (period) {
      case 'day':
        apiPeriod = 'day';
        days = 7;
        break;
      case 'month':
        apiPeriod = 'month';
        days = 30;
        break;
      case 'year':
        apiPeriod = 'month';
        days = 365;
        break;
    }
    
    this.userId$.pipe(takeUntil(this.destroy$)).subscribe(userId => {
      if (userId) {
        const parsedUserId = parseInt(userId);
        this.store.dispatch(UsageActions.getUserUsageStats({ 
          userId: parsedUserId, 
          period: apiPeriod 
        }));
        
        this.store.dispatch(UsageActions.getUserRouteAnalytics({ 
          userId: parsedUserId, 
          days,
          ...(this.selectedApi !== 'all' && { apiId: parseInt(this.selectedApi) })
        }));
      }
    });
  }

  refreshData(): void {
    this.store.dispatch(UsageActions.clearUsageData());
    setTimeout(() => {
      this.loadInitialData();
    }, 100);
  }

  clearError(): void {
    this.store.dispatch(UsageActions.clearError());
  }
}