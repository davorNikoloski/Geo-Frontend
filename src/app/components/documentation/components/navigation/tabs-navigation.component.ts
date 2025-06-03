import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs-navigation',
  templateUrl: './tabs-navigation.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TabsNavigationComponent {
  @Input() activeTab: string = '';
  @Input() tabs: Tab[] = [];
  @Output() changeTab = new EventEmitter<string>();
}