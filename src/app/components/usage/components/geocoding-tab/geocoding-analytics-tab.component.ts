import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeocodingAnalytics, ApiUsageSummary } from '../../../../store/usage/usage.model';

@Component({
  selector: 'app-geocoding-analytics-tab',
  templateUrl: './geocoding-analytics-tab.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class GeocodingAnalyticsTabComponent {
  @Input() activeTab: string = 'geocoding';
  @Input() geocodingAnalytics: GeocodingAnalytics[] = [];
  @Input() apiUsageSummary: ApiUsageSummary | null = null;

  get filteredGeocodingAnalytics(): GeocodingAnalytics[] {
    if (!this.apiUsageSummary) {
      return this.geocodingAnalytics;
    }
    
    return this.geocodingAnalytics.filter(geo => {
      const api = this.apiUsageSummary!.used_apis.find(a => a.id === geo.api_id);
      return api && api.name.toLowerCase().includes('geocoding');
    });
  }

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

  trackByGeocodingId(index: number, item: GeocodingAnalytics): number {
    return item.id;
  }
}