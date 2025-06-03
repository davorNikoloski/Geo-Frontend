import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUsageSummary, UsageSummary } from '../../../../store/usage/usage.model';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SummaryTabComponent {
  @Input() activeTab: string = 'summary';
  @Input() apiUsageSummary: ApiUsageSummary | null = null;
  @Input() usageSummary: UsageSummary[] = [];
  @Input() totalRequests: number = 0;
  @Input() averageResponseTime: number = 0;

  getApiName(apiId: number): string {
    if (!this.apiUsageSummary) return `API ${apiId}`;
    const api = this.apiUsageSummary.used_apis.find(a => a.id === apiId);
    return api ? api.name : `API ${apiId}`;
  }

  trackByApiId(index: number, item: UsageSummary): number {
    return item.api_id;
  }
}