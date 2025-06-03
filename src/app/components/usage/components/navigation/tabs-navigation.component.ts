import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-navigation',
  templateUrl: './tabs-navigation.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TabsNavigationComponent {
  @Input() activeTab: string = 'summary';
  @Output() changeTab = new EventEmitter<string>();

  tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'stats', label: 'Usage Stats' },
    { id: 'activity', label: 'Recent Activity' },
    { id: 'routes', label: 'Route Analytics' },
    { id: 'geocoding', label: 'Geocoding Analytics' },
  ];
}