import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Approvals</h1>
        <p class="text-muted-foreground">
          Review and approve requests that require your attention.
        </p>
      </div>

      <!-- Approval Stats -->
      <div class="grid gap-4 md:grid-cols-4">
        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Pending Approvals</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-yellow-600">{{ pendingApprovals.length }}</div>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Approved Today</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600">3</div>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">This Week</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">8</div>
          </div>
        </app-card>

        <app-card>
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">Avg. Response Time</h3>
            <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold">1.2h</div>
          </div>
        </app-card>
      </div>

      <!-- Pending Approvals -->
      <app-card header="Pending Approvals" description="Requests waiting for your approval">
        <div class="space-y-6">
          <div *ngFor="let approval of pendingApprovals" class="border rounded-lg p-6 space-y-4">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="approval.icon"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-lg font-semibold">{{ approval.title }}</h3>
                    <span [class]="getPriorityBadgeClass(approval.priority)">
                      {{ approval.priority }} Priority
                    </span>
                  </div>
                  <p class="text-muted-foreground mt-1">{{ approval.description }}</p>
                  <div class="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                    <span class="flex items-center space-x-1">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>{{ approval.requester }}</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0v1a1 1 0 01-1 1H5a1 1 0 01-1-1V7a5 5 0 1110 0v1a1 1 0 01-1 1h-4a1 1 0 01-1-1V7z"/>
                      </svg>
                      <span>{{ approval.department }}</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{{ approval.requestDate }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-muted-foreground">{{ approval.id }}</span>
              </div>
            </div>

            <!-- Request Details -->
            <div class="bg-muted/50 rounded-lg p-4">
              <h4 class="font-medium mb-2">Request Details</h4>
              <div class="grid gap-2 text-sm">
                <div *ngFor="let detail of approval.details" class="flex justify-between">
                  <span class="text-muted-foreground">{{ detail.label }}:</span>
                  <span>{{ detail.value }}</span>
                </div>
              </div>
            </div>

            <!-- Justification -->
            <div *ngIf="approval.justification">
              <h4 class="font-medium mb-2">Business Justification</h4>
              <p class="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                {{ approval.justification }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-between pt-4 border-t">
              <div class="flex items-center space-x-2">
                <app-button variant="outline" size="sm">
                  <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Details
                </app-button>
                <app-button variant="outline" size="sm">
                  <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  History
                </app-button>
              </div>
              <div class="flex items-center space-x-2">
                <app-button variant="outline" (onClick)="rejectApproval(approval.id)">
                  <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Reject
                </app-button>
                <app-button (onClick)="approveRequest(approval.id)">
                  <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Approve
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </app-card>

      <!-- Recent Decisions -->
      <app-card header="Recent Decisions" description="Your recent approval decisions">
        <div class="space-y-4">
          <div *ngFor="let decision of recentDecisions" class="flex items-center justify-between p-4 rounded-lg border">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div [class]="getDecisionIconClass(decision.decision)">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="decision.decision === 'approved' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium">{{ decision.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ decision.requester }} • {{ decision.date }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span [class]="getDecisionBadgeClass(decision.decision)">
                {{ decision.decision | titlecase }}
              </span>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class ApprovalsComponent {
  pendingApprovals = [
    {
      id: 'APPR001',
      title: 'MacBook Pro 16" Request',
      description: 'Request for new development laptop with upgraded specifications',
      requester: 'Sarah Johnson',
      department: 'Engineering',
      requestDate: '2 hours ago',
      priority: 'High',
      justification: 'Current laptop is 4 years old and struggling with modern development tools. The new MacBook Pro will significantly improve productivity for React and Node.js development work.',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      details: [
        { label: 'Model', value: 'MacBook Pro 16" M3 Max' },
        { label: 'RAM', value: '32GB' },
        { label: 'Storage', value: '1TB SSD' },
        { label: 'Estimated Cost', value: '$3,499' },
        { label: 'Delivery Time', value: '5-7 business days' }
      ]
    },
    {
      id: 'APPR002',
      title: 'Adobe Creative Suite License',
      description: 'Annual license for Adobe Creative Cloud All Apps',
      requester: 'Mike Chen',
      department: 'Marketing',
      requestDate: '1 day ago',
      priority: 'Medium',
      justification: 'Need access to Photoshop, Illustrator, and After Effects for upcoming product launch campaigns. Current trial expires in 3 days.',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      details: [
        { label: 'License Type', value: 'Creative Cloud All Apps' },
        { label: 'Duration', value: '12 months' },
        { label: 'Users', value: '1' },
        { label: 'Annual Cost', value: '$659.88' },
        { label: 'Renewal Date', value: 'December 2025' }
      ]
    }
  ];

  recentDecisions = [
    {
      id: 'APPR003',
      title: 'Office 365 License Renewal',
      requester: 'Emma Wilson',
      decision: 'approved',
      date: '2 hours ago'
    },
    {
      id: 'APPR004',
      title: 'Standing Desk Request',
      requester: 'James Rodriguez',
      decision: 'approved',
      date: '1 day ago'
    },
    {
      id: 'APPR005',
      title: 'Conference Travel Request',
      requester: 'Lisa Park',
      decision: 'rejected',
      date: '2 days ago'
    },
    {
      id: 'APPR006',
      title: 'External Training Course',
      requester: 'David Kim',
      decision: 'approved',
      date: '3 days ago'
    }
  ];

  getPriorityBadgeClass(priority: string): string {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    
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

  getDecisionBadgeClass(decision: string): string {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    
    switch (decision.toLowerCase()) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
    }
  }

  getDecisionIconClass(decision: string): string {
    const baseClasses = 'h-10 w-10 rounded-lg flex items-center justify-center';
    
    switch (decision.toLowerCase()) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-600`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  }

  approveRequest(id: string) {
    console.log('Approving request:', id);
    // Implement approval logic
  }

  rejectApproval(id: string) {
    console.log('Rejecting request:', id);
    // Implement rejection logic
  }
}