import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUsage, ApiUsageSummary } from '../../../../store/usage/usage.model';

@Component({
  selector: 'app-recent-activity-tab',
  templateUrl: './recent-activity-tab.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class RecentActivityTabComponent {
  @Input() activeTab: string = 'activity';
  @Input() recentActivity: ApiUsage[] = [];
  @Input() apiUsageSummary: ApiUsageSummary | null = null;

  getApiName(apiId: number): string {
    if (!this.apiUsageSummary) return `API ${apiId}`;
    const api = this.apiUsageSummary.used_apis.find(a => a.id === apiId);
    return api ? api.name : `API ${apiId}`;
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
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

  getStatusColorClass(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) return 'text-emerald-400';
    if (statusCode >= 400 && statusCode < 500) return 'text-amber-400';
    if (statusCode >= 500) return 'text-red-400';
    return 'text-slate-400';
  }

  trackByUsageId(index: number, item: ApiUsage): number {
    return item.id;
  }
}