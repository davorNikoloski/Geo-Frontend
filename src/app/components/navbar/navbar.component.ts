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
            <i class="fa-solid fa-location-dot text-white text-xl"></i>
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
                class="flex items-center text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 font-medium"
              >
                <i class="fa-solid fa-right-to-bracket text-slate-300 w-5 h-5 mr-2"></i>
                Sign In
              </a>
              <a 
                routerLink="/register" 
                class="flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <i class="fa-solid fa-user-plus text-white w-5 h-5 mr-2"></i>
                Get Started
              </a>
            </ng-container>
            
            <ng-template #authenticatedUser>
              <!-- Authenticated state - Profile dropdown -->
              <div class="relative" data-dropdown-container>
                <button 
                  type="button"
                  class="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                  (click)="toggleProfileDropdown()"
                >
                  <!-- Profile Icon -->
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <i class="fa-solid fa-user text-white text-base"></i>
                  </div>
                  <span class="font-medium">{{ (user$ | async)?.firstname || 'User' }}</span>
                  <i class="fa-solid fa-chevron-down text-slate-300 text-sm transition-transform duration-200" [ngClass]="{'rotate-180': isProfileDropdownOpen}"></i>
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
                    <i class="fa-solid fa-user text-slate-300 w-5 h-5 mr-3"></i>
                    Profile
                  </a>
                  
                  <a 
                    routerLink="/keys" 
                    class="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                    (click)="closeProfileDropdown()"
                  >
                    <i class="fa-solid fa-key text-slate-300 w-5 h-5 mr-3"></i>
                    Keys
                  </a>

                  <button 
                    type="button"
                    class="w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 text-left"
                    (click)="logout()"
                  >
                    <i class="fa-solid fa-right-from-bracket text-slate-300 w-5 h-5 mr-3"></i>
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
            <i *ngIf="!isMenuOpen" class="fa-solid fa-bars text-slate-400 w-6 h-6"></i>
            <i *ngIf="isMenuOpen" class="fa-solid fa-xmark text-slate-400 w-6 h-6"></i>
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
                class="flex items-center py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                <i class="fa-solid fa-house text-slate-300 w-5 h-5 mr-3 md:mr-2"></i>
                Home
              </a>
            </li>
            <li>
              <a 
                routerLink="/services" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="flex items-center py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                <i class="fa-solid fa-gear text-slate-300 w-5 h-5 mr-3 md:mr-2"></i>
                Services
              </a>
            </li>
            <li>
              <a 
                routerLink="/usage" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="flex items-center py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                <i class="fa-solid fa-chart-line text-slate-300 w-5 h-5 mr-3 md:mr-2"></i>
                API Usage
              </a>
            </li>
            <li>
              <a 
                routerLink="/documentation" 
                routerLinkActive="text-emerald-400 bg-slate-700/50 md:bg-transparent"
                class="flex items-center py-3 px-4 md:p-0 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 md:hover:bg-transparent md:hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                <i class="fa-solid fa-book text-slate-300 w-5 h-5 mr-3 md:mr-2"></i>
                Docs
              </a>
            </li>
            
            <!-- Mobile auth buttons/profile -->
            <ng-container *ngIf="!(isAuthenticated$ | async); else mobileAuthenticatedUser">
              <li class="md:hidden border-t border-slate-700 pt-4 mt-4">
                <a 
                  routerLink="/login" 
                  class="flex items-center py-3 px-4 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium"
                >
                  <i class="fa-solid fa-right-to-bracket text-slate-300 w-5 h-5 mr-3"></i>
                  Sign In
                </a>
              </li>
              <li class="md:hidden">
                <a 
                  routerLink="/register" 
                  class="flex items-center py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium text-center hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                >
                  <i class="fa-solid fa-user-plus text-white w-5 h-5 mr-3"></i>
                  Get Started
                </a>
              </li>
            </ng-container>
            
            <ng-template #mobileAuthenticatedUser>
              <li class="md:hidden border-t border-slate-700 pt-4 mt-4">
                <div class="flex items-center px-4 py-2 text-slate-300">
                  <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <i class="fa-solid fa-user text-white w-5 h-5"></i>
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
                  <i class="fa-solid fa-user text-slate-300 w-5 h-5 mr-3"></i>
                  Profile
                </a>
              </li>
              <li class="md:hidden">
                <a 
                  routerLink="/keys" 
                  class="flex items-center py-3 px-4 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium"
                  (click)="closeMenu()"
                >
                  <i class="fa-solid fa-key text-slate-300 w-5 h-5 mr-3"></i>
                  Keys
                </a>
              </li>
              <li class="md:hidden">
                <button 
                  type="button"
                  class="w-full flex items-center py-3 px-4 text-slate-300 rounded-lg hover:text-white hover:bg-slate-700/50 transition-all duration-200 font-medium text-left"
                  (click)="logout()"
                >
                  <i class="fa-solid fa-right-from-bracket text-slate-300 w-5 h-5 mr-3"></i>
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
  styles: [
    `
      @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    `
  ]
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
    // Ensure Font Awesome is loaded
    this.loadFontAwesome();
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

  // Dynamically load Font Awesome to ensure icons persist
  private loadFontAwesome() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    document.head.appendChild(link);
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