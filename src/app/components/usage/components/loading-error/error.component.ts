import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ErrorComponent {
  @Input() error: string | null = null;
  @Output() clearError = new EventEmitter<void>();
}