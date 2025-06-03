import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteAnalytics, AnalyticsSummary, RouteTypeDistribution, ApiUsageSummary } from '../../../../store/usage/usage.model';

@Component({
  selector: 'app-route-analytics-tab',
  templateUrl: './route-analytics-tab.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class RouteAnalyticsTabComponent {
  @Input() activeTab: string = 'routes';
  @Input() routeAnalytics: RouteAnalytics[] = [];
  @Input() analyticsSummary: AnalyticsSummary | null = null;
  @Input() routeTypeDistribution: RouteTypeDistribution[] = [];
  @Input() apiUsageSummary: ApiUsageSummary | null = null;

  getApiName(apiId: number): string {
    if (!this.apiUsageSummary) return `API ${apiId}`;
    const api = this.apiUsageSummary.used_apis.find(a => a.id === apiId);
    return api ? api.name : `API ${apiId}`;
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }

  formatTime(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${Math.round(remainingSeconds)}s`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  // Enhanced time formatting for larger durations
  formatTotalTime(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${Math.round(remainingSeconds)}s`;
    }
    if (seconds < 86400) { // Less than 24 hours
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
    // For very large durations, show days
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  }

  // Format distance with appropriate units
  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    } else if (meters < 100000) { // Less than 100km
      return `${(meters / 1000).toFixed(1)}km`;
    } else {
      return `${Math.round(meters / 1000)}km`;
    }
  }

  getRouteTypeClass(routeType: string): string {
    switch (routeType?.toLowerCase()) {
      case 'driving': return 'from-blue-400 to-blue-600';
      case 'walking': return 'from-green-400 to-green-600';
      case 'cycling': return 'from-yellow-400 to-yellow-600';
      case 'transit': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  }

  trackByRouteId(index: number, item: RouteAnalytics): number {
    return item.id;
  }

  trackByRouteType(index: number, item: RouteTypeDistribution): string {
    return item.route_type;
  }
}