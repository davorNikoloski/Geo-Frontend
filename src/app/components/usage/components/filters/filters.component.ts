import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUsageSummary } from '../../../../store/usage/usage.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FiltersComponent {
  @Input() apiUsageSummary: ApiUsageSummary | null = null;
  @Input() selectedApi: string = 'all';
  @Input() timePeriod: string = 'day';
  @Output() onApiChange = new EventEmitter<string>();
  @Output() onTimePeriodChange = new EventEmitter<string>();
  @Output() refreshData = new EventEmitter<void>();

  trackByApiId(index: number, api: { id: number }): number {
    return api.id;
  }
}