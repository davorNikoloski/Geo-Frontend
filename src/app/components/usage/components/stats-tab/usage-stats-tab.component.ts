import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import { UsageStats, GeocodingAnalytics, RouteAnalytics, ApiUsageSummary, UsageSummary } from '../../../../store/usage/usage.model';

interface ApiUsageStats {
  apiId: number;
  stats: UsageStats[];
}

@Component({
  selector: 'app-usage-stats-tab',
  templateUrl: './usage-stats-tab.component.html',
  styleUrls: ['./usage-stats-tab.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule],
})
export class UsageStatsTabComponent implements OnChanges, AfterViewInit {
  @Input() activeTab: string = 'stats';
  @Input() usageStats: UsageStats[] = [];
  @Input() geocodingAnalytics: GeocodingAnalytics[] = [];
  @Input() routeAnalytics: RouteAnalytics[] = [];
  @Input() apiUsageSummary: ApiUsageSummary | null = null;
  @Input() usageSummary: UsageSummary[] = [];
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  // Chart configuration
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  selectedApi: string = 'all';
  selectedMetric: string = 'requests';
  
  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time Period';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  autoScale = true;
  timeline = false; // Changed to false since we're using time_period numbers
  animations = true;
  roundDomains = true;
  tooltipDisabled = false;
  showGridLines = true;

  // Color scheme
  colorScheme = {
    name: 'custom-scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6EE7B7']
  };

  // Processed data
  usageStatsByApi: ApiUsageStats[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('UsageStats changes detected:', {
      usageStats: this.usageStats,
      apiUsageSummary: this.apiUsageSummary
    });

    if (changes['usageStats'] || changes['apiUsageSummary']) {
      this.processUsageStatsByApi();
    }
    
    if (changes['usageStats'] || changes['geocodingAnalytics'] || changes['routeAnalytics'] || changes['apiUsageSummary'] || changes['usageSummary']) {
      this.prepareChartData();
      this.updateYAxisLabel();
    }
  }

  ngAfterViewInit(): void {
    this.updateChartSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateChartSize();
  }

  onApiChange(apiId: string): void {
    this.selectedApi = apiId;
    this.prepareChartData();
  }

  onMetricChange(metric: string): void {
    this.selectedMetric = metric;
    this.prepareChartData();
    this.updateYAxisLabel();
  }

  private updateChartSize(): void {
    if (this.chartContainer?.nativeElement?.offsetWidth) {
      const width = this.chartContainer.nativeElement.offsetWidth;
      const height = Math.min(400, window.innerHeight * 0.5);
      this.view = [width, height];
    }
  }

  private updateYAxisLabel(): void {
    switch (this.selectedMetric) {
      case 'requests':
        this.yAxisLabel = 'Number of Requests';
        break;
      case 'response_time':
        this.yAxisLabel = 'Response Time (ms)';
        break;
      case 'data_sent':
        this.yAxisLabel = 'Data Sent (bytes)';
        break;
      case 'data_received':
        this.yAxisLabel = 'Data Received (bytes)';
        break;
      default:
        this.yAxisLabel = 'Count';
    }
  }

  private processUsageStatsByApi(): void {
    console.log('Processing usage stats by API:', {
      usageStats: this.usageStats,
      apiUsageSummary: this.apiUsageSummary
    });

    if (!this.apiUsageSummary || !this.usageStats.length) {
      this.usageStatsByApi = [];
      return;
    }

    // Create mock data for each API based on the usage stats
    // Since the current usageStats doesn't have api_id, we'll distribute the stats across APIs
    this.usageStatsByApi = this.apiUsageSummary.used_apis.map(api => {
      // For demonstration, we'll assign some stats to each API
      // In reality, you'd need the backend to provide api_id in the usage stats
      const apiStats = this.usageStats.map((stat, index) => ({
        ...stat,
        api_id: api.id,
        // Distribute the count across APIs (this is mock logic)
        count: Math.floor(stat.count / this.apiUsageSummary!.used_apis.length) + 
               (index % this.apiUsageSummary!.used_apis.length === (api.id % this.apiUsageSummary!.used_apis.length) ? stat.count % this.apiUsageSummary!.used_apis.length : 0)
      }));

      return {
        apiId: api.id,
        stats: apiStats
      };
    });

    console.log('Processed usage stats by API:', this.usageStatsByApi);
  }

  private prepareChartData(): void {
    console.log('Preparing chart data:', {
      usageStats: this.usageStats,
      apiUsageSummary: this.apiUsageSummary,
      usageStatsByApi: this.usageStatsByApi
    });

    if (!this.usageStats?.length || !this.apiUsageSummary) {
      console.log('No data available for chart');
      this.chartData = [];
      return;
    }

    if (this.selectedApi === 'all') {
      // Show data for all APIs
      this.chartData = this.usageStatsByApi
        .filter(apiData => apiData.stats.length > 0)
        .map(apiData => this.createApiChartData(apiData.apiId, apiData.stats));
    } else {
      // Show data for selected API only
      const selectedApiId = parseInt(this.selectedApi);
      const apiData = this.usageStatsByApi.find(data => data.apiId === selectedApiId);
      
      if (apiData && apiData.stats.length > 0) {
        this.chartData = [this.createApiChartData(apiData.apiId, apiData.stats)];
      } else {
        this.chartData = [];
      }
    }

    console.log('Final chart data:', this.chartData);
  }

  private createApiChartData(apiId: number, stats: UsageStats[]): any {
    if (!stats.length) {
      return {
        name: this.getApiName(apiId),
        series: []
      };
    }

    const series = stats.map(stat => {
      let value: number;
      
      switch (this.selectedMetric) {
        case 'requests':
          value = stat.count;
          break;
        case 'response_time':
          value = stat.avg_response_time;
          break;
        case 'data_sent':
          value = parseInt(stat.total_request_size.toString()) || 0;
          break;
        case 'data_received':
          value = parseInt(stat.total_response_size.toString()) || 0;
          break;
        default:
          value = stat.count;
      }

      return {
        name: `Period ${stat.time_period}`,
        value: value || 0
      };
    }).sort((a, b) => {
      // Extract period number for sorting
      const aPeriod = parseInt(a.name.replace('Period ', ''));
      const bPeriod = parseInt(b.name.replace('Period ', ''));
      return aPeriod - bPeriod;
    });

    return {
      name: this.getApiName(apiId),
      series: series
    };
  }

  // Enhanced analytics methods
  getGeocodingRequestsForApi(apiId: number): number {
    return this.geocodingAnalytics.filter(geo => geo.api_id === apiId).length;
  }

  getRouteRequestsForApi(apiId: number): number {
    return this.routeAnalytics.filter(route => route.api_id === apiId).length;
  }

  getGeocodingRequestsForPeriod(apiId: number, timePeriod: string | number): number {
    // Since we don't have proper time correlation, return a mock value
    return Math.floor(Math.random() * 5);
  }

  getRouteRequestsForPeriod(apiId: number, timePeriod: string | number): number {
    // Since we don't have proper time correlation, return a mock value
    return Math.floor(Math.random() * 3);
  }

  // Custom formatting methods
  dateFormat = (val: any): string => {
    if (typeof val === 'string') {
      return val;
    }
    return `Period ${val}`;
  }

  valueFormatting = (value: number): string => {
    switch (this.selectedMetric) {
      case 'requests':
        return `${value} requests`;
      case 'response_time':
        return `${value.toFixed(2)} ms`;
      case 'data_sent':
      case 'data_received':
        return this.formatBytes(value);
      default:
        return value.toString();
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  getApiName(apiId: number): string {
    return this.apiUsageSummary?.used_apis.find(api => api.id === apiId)?.name || `API ${apiId}`;
  }

  // Enhanced table data methods
  getEnhancedUsageStats(): any[] {
    return this.usageStats.map(stat => ({
      ...stat,
      geocoding_requests: this.getGeocodingRequestsForPeriod(2, stat.time_period), // Mock API ID
      route_requests: this.getRouteRequestsForPeriod(3, stat.time_period), // Mock API ID
      api_name: 'Combined Stats' // Since we don't have individual API stats
    }));
  }

  // Summary statistics
  getTotalRequestsForApi(apiId: number): number {
    const summary = this.usageSummary.find(s => s.api_id === apiId);
    if (summary) {
      return summary.total_requests;
    }
    
    // Fallback: calculate from usage stats
    const totalRequests = this.usageStats.reduce((sum, stat) => sum + stat.count, 0);
    return Math.floor(totalRequests / (this.apiUsageSummary?.used_apis.length || 1));
  }

  getAverageResponseTimeForApi(apiId: number): number {
    const summary = this.usageSummary.find(s => s.api_id === apiId);
    if (summary) {
      return summary.avg_response_time;
    }
    
    // Fallback: calculate from usage stats
    const totalResponseTime = this.usageStats.reduce((sum, stat) => sum + stat.avg_response_time * stat.count, 0);
    const totalCount = this.usageStats.reduce((sum, stat) => sum + stat.count, 0);
    return totalCount > 0 ? totalResponseTime / totalCount : 0;
  }

  getLastUsedForApi(apiId: number): Date | null {
    const summary = this.usageSummary.find(s => s.api_id === apiId);
    return summary?.last_used ? new Date(summary.last_used) : null;
  }

  // Utility methods
  getResponseTimeColor(responseTime: number): string {
    if (responseTime < 100) return 'text-green-400';
    if (responseTime < 500) return 'text-yellow-400';
    return 'text-red-400';
  }

  trackByTimePeriod(index: number, item: any): string {
    return `${item.api_name}-${item.time_period}`;
  }

  // Chart interaction methods
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}