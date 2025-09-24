import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Welcome back, John</h1>
        <p class="text-muted-foreground">
          Here's what's happening with your requests and services today.
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Open Requests</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">5</div>
            <p class="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Pending Approvals</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">2</div>
            <p class="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Completed This Month</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">12</div>
            <p class="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Average Response Time</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">2.4h</div>
            <p class="text-xs text-muted-foreground">
              -0.5h from last week
            </p>
          </div>
        </app-card>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <!-- Recent Requests -->
        <app-card header="Recent Requests" description="Your latest service requests">
          <div class="space-y-4">
            <div *ngFor="let request of recentRequests" class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div [class]="getStatusBadgeClass(request.status)">
                  {{ request.status }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground truncate">{{ request.title }}</p>
                <p class="text-sm text-muted-foreground">{{ request.date }}</p>
              </div>
              <div class="flex-shrink-0 text-sm text-muted-foreground">
                {{ request.id }}
              </div>
            </div>
          </div>
          <div slot="footer">
            <app-button variant="outline" routerLink="/requests" class="w-full">
              View All Requests
            </app-button>
          </div>
        </app-card>

        <!-- Popular Services -->
        <app-card header="Popular Services" description="Frequently used services in your organization">
          <div class="space-y-4">
            <div *ngFor="let service of popularServices" class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground">{{ service.name }}</p>
                <p class="text-sm text-muted-foreground">{{ service.description }}</p>
              </div>
              <app-button variant="ghost" size="sm">
                Request
              </app-button>
            </div>
          </div>
          <div slot="footer">
            <app-button variant="outline" routerLink="/catalog" class="w-full">
              Browse Catalog
            </app-button>
          </div>
        </app-card>
      </div>

      <!-- Quick Actions -->
      <app-card header="Quick Actions" description="Common tasks and shortcuts">
        <div class="grid gap-4 md:grid-cols-3">
          <app-button class="h-auto p-6 flex flex-col space-y-2" variant="outline">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="font-medium">New Request</span>
            <span class="text-sm text-muted-foreground text-center">Submit a new service request</span>
          </app-button>
          
          <app-button class="h-auto p-6 flex flex-col space-y-2" variant="outline">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="font-medium">Get Help</span>
            <span class="text-sm text-muted-foreground text-center">Contact support or browse FAQ</span>
          </app-button>
          
          <app-button class="h-auto p-6 flex flex-col space-y-2" variant="outline">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span class="font-medium">View Reports</span>
            <span class="text-sm text-muted-foreground text-center">Access your request history and analytics</span>
          </app-button>
        </div>
      </app-card>
    </div>
  `
})
export class DashboardComponent {
  recentRequests = [
    { id: 'REQ0001234', title: 'New laptop request', status: 'In Progress', date: '2 days ago' },
    { id: 'REQ0001235', title: 'Software license renewal', status: 'Approved', date: '1 week ago' },
    { id: 'REQ0001236', title: 'Office access card replacement', status: 'Completed', date: '2 weeks ago' },
    { id: 'REQ0001237', title: 'VPN access request', status: 'Pending', date: '3 days ago' }
  ];

  popularServices = [
    {
      name: 'Hardware Request',
      description: 'Request new equipment or replacements',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    },
    {
      name: 'Software Access',
      description: 'Request access to applications and tools',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    },
    {
      name: 'IT Support',
      description: 'Get help with technical issues',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    
    switch (status.toLowerCase()) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      case 'in progress':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
    }
  }
}