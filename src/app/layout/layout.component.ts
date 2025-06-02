// src/app/layout/layout.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'geo-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  template: `
    <geo-navbar></geo-navbar>
    <main class="min-h-[calc(100vh-4rem)] md:pt-[1rem] pt-[5rem] px-4 md:px-8 lg:px-[1rem] bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto py-6">
        <router-outlet></router-outlet>
      </div>
    </main>
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center text-gray-600 dark:text-gray-300">
        <p>© {{ currentYear }} GeoServices. All rights reserved.</p>
      </div>
    </footer>
  `,
})
export class LayoutComponent {
  currentYear = new Date().getFullYear();
}