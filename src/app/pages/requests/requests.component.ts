import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">My Requests</h1>
          <p class="text-muted-foreground">
            Track and manage your service requests.
          </p>
        </div>
        <app-button>
          <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          New Request
        </app-button>
      </div>

      <!-- Filters and Search -->
      <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <input 
              class="sn-input pl-10 pr-4" 
              placeholder="Search requests..."
              type="search"
              [(ngModel)]="searchTerm"
            />
          </div>
        </div>
        <select class="sn-input md:w-48" [(ngModel)]="statusFilter">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select class="sn-input md:w-48" [(ngModel)]="timeFilter">
          <option value="">All Time</option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-quarter">Last Quarter</option>
        </select>
      </div>

      <!-- Request Stats -->
      <div class="grid gap-4 md:grid-cols-4">
        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Total Requests</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">23</div>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">In Progress</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-blue-600">5</div>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Completed</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600">15</div>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Avg. Resolution</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">2.4 days</div>
          </div>
        </app-card>
      </div>

      <!-- Requests List -->
      <app-card header="Request History" description="All your service requests">
        <div class="space-y-4">
          <div *ngFor="let request of filteredRequests" class="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="request.icon"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <h3 class="text-sm font-semibold">{{ request.title }}</h3>
                  <span [class]="getStatusBadgeClass(request.status)">
                    {{ request.status }}
                  </span>
                </div>
                <p class="text-sm text-muted-foreground mt-1">{{ request.description }}</p>
                <div class="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>{{ request.id }}</span>
                  <span>{{ request.category }}</span>
                  <span>{{ request.requestedDate }}</span>
                  <span *ngIf="request.assignedTo">Assigned to: {{ request.assignedTo }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div *ngIf="request.priority" [class]="getPriorityClass(request.priority)" class="text-xs px-2 py-1 rounded">
                {{ request.priority }}
              </div>
              <app-button variant="ghost" size="sm">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </app-button>
              <app-button variant="ghost" size="sm">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </app-button>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="flex items-center justify-between pt-6">
          <div class="text-sm text-muted-foreground">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalRequests) }} of {{ totalRequests }} requests
          </div>
          <div class="flex items-center space-x-2">
            <app-button variant="outline" size="sm" [disabled]="currentPage === 1" (onClick)="previousPage()">
              Previous
            </app-button>
            <app-button variant="outline" size="sm" [disabled]="currentPage === totalPages" (onClick)="nextPage()">
              Next
            </app-button>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class RequestsComponent {
  searchTerm = '';
  statusFilter = '';
  timeFilter = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalRequests = 23;
  
  Math = Math;

  allRequests = [
    {
      id: 'REQ0001234',
      title: 'New MacBook Pro Request',
      description: 'Request for MacBook Pro 16" for development work',
      status: 'In Progress',
      category: 'Hardware',
      priority: 'High',
      requestedDate: 'Dec 15, 2024',
      assignedTo: 'IT Hardware Team',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    },
    {
      id: 'REQ0001235',
      title: 'Adobe Creative Suite License',
      description: 'Access to Adobe Creative Cloud for design projects',
      status: 'Approved',
      category: 'Software',
      priority: 'Medium',
      requestedDate: 'Dec 12, 2024',
      assignedTo: 'Software Licensing',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      id: 'REQ0001236',
      title: 'Office Access Card Replacement',
      description: 'Lost access card, need replacement for building entry',
      status: 'Completed',
      category: 'Security',
      priority: 'High',
      requestedDate: 'Dec 10, 2024',
      assignedTo: 'Security Team',
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
    },
    {
      id: 'REQ0001237',
      title: 'VPN Access Request',
      description: 'Remote access to company network for work from home',
      status: 'Pending',
      category: 'Access',
      priority: 'Medium',
      requestedDate: 'Dec 8, 2024',
      assignedTo: 'Network Team',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    },
    {
      id: 'REQ0001238',
      title: 'Conference Room Booking',
      description: 'Book large conference room for client presentation',
      status: 'Completed',
      category: 'Facilities',
      priority: 'Low',
      requestedDate: 'Dec 5, 2024',
      assignedTo: 'Facilities Team',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    }
  ];

  get filteredRequests() {
    return this.allRequests.filter(request => {
      const matchesSearch = !this.searchTerm || 
        request.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        request.status.toLowerCase().replace(' ', '-') === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  get totalPages() {
    return Math.ceil(this.totalRequests / this.itemsPerPage);
  }

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
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
    }
  }

  getPriorityClass(priority: string): string {
    const baseClasses = 'font-medium';
    
    switch (priority.toLowerCase()) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}