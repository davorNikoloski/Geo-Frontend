// src/app/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../store/auth/auth.state';

@Component({
  selector: 'geo-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 fixed w-full z-30 top-0 left-0 border-b border-slate-700/50 backdrop-blur-sm shadow-xl">
      <div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        <!-- Logo/Brand -->
        <a routerLink="/home" class="flex items-center group">
          <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <span class="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-200">
            Geo<span class="text-emerald-400">Services</span>
          </span>
        </a>

        <!-- Mobile menu button -->
        <div class="flex md:order-2 space-x-3">
          <!-- Auth buttons/profile for desktop -->
          <div class="hidden md:flex items-center space-x-3">
            <ng-container *ngIf="!(isAuthenticated$ | async); else authenticatedUser">
              <!-- Unauthenticated state -->
              <a 
                routerLink="/login" 
                class="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 font-medium"
              >
                Sign In
              </a>
              <a 
                routerLink="/register" 
                class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </a>
            </ng-container>
            
            <ng-template #authenticatedUser>
              <!-- Authenticated state - Profile dropdown -->
              <div class="relative" #dropdownContainer>
                <button 
                  type="button"
                  class="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                  (click)="toggleProfileDropdown()"
                >
                  <!-- Profile Icon -->
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <span class="font-medium">{{ (user$ | async)?.firstname || 'User' }}</span>
                  <!-- Dropdown arrow -->
                  <svg 
                    class="w-4 h-4 transition-transform duration-200" 
                    [class.rotate-180]="isProfileDropdownOpen"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                <!-- Dropdown menu -->
                <div 
                  *ngIf="isProfileDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1 z-50"
                >
                  <div class="px-4 py-2 border-b border-slate-700">
                    <p class="text-sm text-slate-300">Signed in as</p>
                    <p class="text-sm font-medium text-white truncate">{{ (user$ | async)?.email }}</p>
                  </div>
                  
                  <a 
                    routerLink="/profile" 
                    class="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                    (click)="closeProfileDropdown()"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Profile
                  </a>
                  
                  <button 
                    type="button"
                    class="w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 text-left"
                    (click)="logout()"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </ng-template>
          </div>
          
          <button 
            type="button" 
            class="md:hidden text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg p-2.5 transition-all duration-200"
            (click)="toggleMenu()"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    [attr.d]="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'">
              </path>
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <div 
          [class.hidden]="!isMenuOpen"
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        >
          <ul class="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-8 bg-slate-800/95 md:bg-transparent rounded-lg md:rounded-none p-4 md:p-0 border border-slate-700 md:border-0">
            <li>
              <a 
                routerLink="/home" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="block py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                routerLink="/services" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="block py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                Services
              </a>
            </li>
            <li>
              <a 
                routerLink="/usage" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="block py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                API Usage
              </a>
            </li>
            <li>
              <a 
                routerLink="/documentation" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="block py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                Docs
              </a>
            </li>
            
            <!-- Mobile auth buttons/profile -->
            <ng-container *ngIf="!(isAuthenticated$ | async); else mobileAuthenticatedUser">
              <li class="md:hidden border-t border-slate-700 pt-4 mt-4">
                <a 
                  routerLink="/login" 
                  class="block py-3 px-4 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium"
                >
                  Sign In
                </a>
              </li>
              <li class="md:hidden">
                <a 
                  routerLink="/register" 
                  class="block py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium text-center hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                >
                  Get Started
                </a>
              </li>
            </ng-container>
            
            <ng-template #mobileAuthenticatedUser>
              <li class="md:hidden border-t border-slate-700 pt-4 mt-4">
                <div class="flex items-center px-4 py-2 text-slate-300">
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-white">{{ (user$ | async)?.firstname || 'User' }}</p>
                    <p class="text-sm text-slate-400">{{ (user$ | async)?.email }}</p>
                  </div>
                </div>
              </li>
              <li class="md:hidden">
                <a 
                  routerLink="/profile" 
                  class="flex items-center py-3 px-4 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium"
                  (click)="closeMenu()"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Profile
                </a>
              </li>
              <li class="md:hidden">
                <button 
                  type="button"
                  class="w-full flex items-center py-3 px-4 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium text-left"
                  (click)="logout()"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Logout
                </button>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
    <div class="md:h-[4rem] h-[1rem]"></div> <!-- Spacer for fixed navbar -->
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isProfileDropdownOpen = false;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null>;
  
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    // Close dropdowns when authentication state changes
    this.isAuthenticated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isProfileDropdownOpen = false;
      this.isMenuOpen = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isProfileDropdownOpen = false;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    if (this.isProfileDropdownOpen) {
      this.isMenuOpen = false;
    }
  }

  closeProfileDropdown() {
    this.isProfileDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isProfileDropdownOpen = false;
    this.isMenuOpen = false;
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownContainer = document.querySelector('[data-dropdown-container]');
    
    if (dropdownContainer && !dropdownContainer.contains(target)) {
      this.isProfileDropdownOpen = false;
    }
  }
}