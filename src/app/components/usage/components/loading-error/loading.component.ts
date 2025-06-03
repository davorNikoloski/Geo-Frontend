import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
}