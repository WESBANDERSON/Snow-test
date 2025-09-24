import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center">
        <div class="mr-4 flex">
          <a routerLink="/" class="mr-6 flex items-center space-x-2">
            <div class="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
              <span class="text-primary-foreground text-xs font-bold">SN</span>
            </div>
            <span class="hidden font-bold sm:inline-block">Employee Service Center</span>
          </a>
        </div>
        
        <!-- Mobile menu button -->
        <button 
          class="md:hidden ml-auto p-2 rounded-md hover:bg-accent"
          (click)="toggleMobileMenu()"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a 
            routerLink="/dashboard" 
            routerLinkActive="text-foreground" 
            [routerLinkActiveOptions]="{exact: false}"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Dashboard
          </a>
          <a 
            routerLink="/catalog" 
            routerLinkActive="text-foreground" 
            [routerLinkActiveOptions]="{exact: false}"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Service Catalog
          </a>
          <a 
            routerLink="/requests" 
            routerLinkActive="text-foreground" 
            [routerLinkActiveOptions]="{exact: false}"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            My Requests
          </a>
          <a 
            routerLink="/approvals" 
            routerLinkActive="text-foreground" 
            [routerLinkActiveOptions]="{exact: false}"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Approvals
          </a>
        </nav>

        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <div class="relative hidden md:block">
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
              <input 
                class="sn-input pl-10 pr-4 w-64" 
                placeholder="Search services, requests..."
                type="search"
              />
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- Notifications -->
            <button class="relative p-2 rounded-md hover:bg-accent">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 7h6m-6 4h6m-6 4h4"/>
              </svg>
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">3</span>
            </button>

            <!-- Profile dropdown -->
            <button class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
              <div class="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span class="text-primary-foreground text-sm font-medium">JD</span>
              </div>
              <span class="hidden md:block text-sm font-medium">John Doe</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="mobileMenuOpen" class="md:hidden border-t bg-background">
        <nav class="flex flex-col space-y-1 p-4">
          <a 
            routerLink="/dashboard" 
            routerLinkActive="bg-accent text-accent-foreground" 
            class="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            (click)="closeMobileMenu()"
          >
            Dashboard
          </a>
          <a 
            routerLink="/catalog" 
            routerLinkActive="bg-accent text-accent-foreground" 
            class="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            (click)="closeMobileMenu()"
          >
            Service Catalog
          </a>
          <a 
            routerLink="/requests" 
            routerLinkActive="bg-accent text-accent-foreground" 
            class="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            (click)="closeMobileMenu()"
          >
            My Requests
          </a>
          <a 
            routerLink="/approvals" 
            routerLinkActive="bg-accent text-accent-foreground" 
            class="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            (click)="closeMobileMenu()"
          >
            Approvals
          </a>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}