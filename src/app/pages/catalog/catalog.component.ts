import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Service Catalog</h1>
        <p class="text-muted-foreground">
          Browse and request services available to you.
        </p>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <input 
              class="sn-input pl-10 pr-4" 
              placeholder="Search services..."
              type="search"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
            />
          </div>
        </div>
        <select 
          class="sn-input md:w-48"
          [(ngModel)]="selectedCategory"
          (change)="onCategoryChange()"
        >
          <option value="">All Categories</option>
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
          <option value="access">Access & Security</option>
          <option value="support">IT Support</option>
          <option value="facilities">Facilities</option>
        </select>
      </div>

      <!-- Featured Services -->
      <app-card header="Featured Services" description="Most requested services this month">
        <div class="grid gap-4 md:grid-cols-3">
          <div *ngFor="let service of featuredServices" class="group cursor-pointer rounded-lg border p-4 hover:bg-accent transition-colors">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold">{{ service.name }}</h3>
                <p class="text-sm text-muted-foreground mt-1">{{ service.description }}</p>
                <div class="flex items-center mt-2 space-x-2">
                  <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">{{ service.category }}</span>
                  <span class="text-xs text-muted-foreground">{{ service.requestTime }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <app-button size="sm" class="w-full">
                Request Now
              </app-button>
            </div>
          </div>
        </div>
      </app-card>

      <!-- Service Categories -->
      <div class="grid gap-6 md:grid-cols-2">
        <div *ngFor="let category of serviceCategories" class="space-y-4">
          <app-card [header]="category.name" [description]="category.description">
            <div class="space-y-3">
              <div *ngFor="let service of category.services" class="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div class="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ service.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ service.description }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-muted-foreground">{{ service.avgTime }}</span>
                  <app-button variant="ghost" size="sm">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </app-button>
                </div>
              </div>
            </div>
          </app-card>
        </div>
      </div>

      <!-- Recently Viewed -->
      <app-card header="Recently Viewed" description="Services you've looked at recently">
        <div class="grid gap-4 md:grid-cols-4">
          <div *ngFor="let service of recentlyViewed" class="group cursor-pointer rounded-lg border p-4 hover:bg-accent transition-colors">
            <div class="flex flex-col items-center text-center space-y-3">
              <div class="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-medium">{{ service.name }}</h3>
                <p class="text-xs text-muted-foreground mt-1">{{ service.lastViewed }}</p>
              </div>
              <app-button variant="outline" size="sm" class="w-full">
                View Details
              </app-button>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class CatalogComponent {
  searchTerm = '';
  selectedCategory = '';

  featuredServices = [
    {
      name: 'New Laptop Request',
      description: 'Request a new laptop or upgrade your existing one',
      category: 'Hardware',
      requestTime: '2-3 days',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    },
    {
      name: 'Software License',
      description: 'Request access to software applications',
      category: 'Software',
      requestTime: '1 day',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    },
    {
      name: 'Password Reset',
      description: 'Reset your password or unlock your account',
      category: 'Support',
      requestTime: '30 mins',
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
    }
  ];

  serviceCategories = [
    {
      name: 'Hardware & Equipment',
      description: 'Request new devices, repairs, and replacements',
      services: [
        {
          name: 'New Laptop',
          description: 'Request a new laptop for work',
          avgTime: '2-3 days',
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
        },
        {
          name: 'Monitor Request',
          description: 'Additional monitor for your workspace',
          avgTime: '1-2 days',
          icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
          name: 'Phone Replacement',
          description: 'Replace or upgrade your work phone',
          avgTime: '1 day',
          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        }
      ]
    },
    {
      name: 'Software & Access',
      description: 'Software licenses and system access requests',
      services: [
        {
          name: 'Office 365 License',
          description: 'Access to Microsoft Office suite',
          avgTime: '1 day',
          icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
        },
        {
          name: 'VPN Access',
          description: 'Remote access to company network',
          avgTime: '2 hours',
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
        },
        {
          name: 'Database Access',
          description: 'Access to specific databases',
          avgTime: '1-2 days',
          icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
        }
      ]
    }
  ];

  recentlyViewed = [
    {
      name: 'Adobe Creative Suite',
      lastViewed: '2 hours ago',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      name: 'Parking Pass',
      lastViewed: '1 day ago',
      icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    },
    {
      name: 'Training Request',
      lastViewed: '3 days ago',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      name: 'Conference Room',
      lastViewed: '1 week ago',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    }
  ];

  onSearch() {
    // Implement search functionality
    console.log('Searching for:', this.searchTerm);
  }

  onCategoryChange() {
    // Implement category filtering
    console.log('Category changed to:', this.selectedCategory);
  }
}