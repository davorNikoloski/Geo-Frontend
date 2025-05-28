// src/app/app.component.ts
import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `<geo-layout></geo-layout>` // Only place layout should appear
})
export class AppComponent {}