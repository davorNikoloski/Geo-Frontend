import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageStats } from '../../../../store/usage/usage.model';

@Component({
  selector: 'app-usage-stats-tab',
  templateUrl: './usage-stats-tab.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UsageStatsTabComponent implements AfterViewInit {
  @Input() activeTab: string = 'stats';
  @Input() usageStats: UsageStats[] = [];

  ngAfterViewInit(): void {
    this.updateChart();
  }

  private updateChart(): void {
    if (this.usageStats.length && typeof (window as any).usageChart !== 'undefined') {
      const labels = this.usageStats.map(stat => 
        new Date(stat.time_period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      );
      const requestData = this.usageStats.map(stat => stat.count);
      const responseTimeData = this.usageStats.map(stat => stat.avg_response_time);

      (window as any).usageChart.data.labels = labels;
      (window as any).usageChart.data.datasets[0].data = requestData;
      (window as any).usageChart.data.datasets[1].data = responseTimeData;
      (window as any).usageChart.update();
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  trackByTimePeriod(index: number, item: UsageStats): string {
    return item.time_period;
  }
}