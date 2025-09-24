import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p class="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <!-- Profile Information -->
        <div class="md:col-span-2 space-y-6">
          <app-card header="Personal Information" description="Update your personal details">
            <form class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    First Name
                  </label>
                  <input class="sn-input mt-2" [(ngModel)]="profile.firstName" name="firstName" />
                </div>
                <div>
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Last Name
                  </label>
                  <input class="sn-input mt-2" [(ngModel)]="profile.lastName" name="lastName" />
                </div>
              </div>
              
              <div>
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <input class="sn-input mt-2" type="email" [(ngModel)]="profile.email" name="email" />
              </div>

              <div>
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Phone Number
                </label>
                <input class="sn-input mt-2" type="tel" [(ngModel)]="profile.phone" name="phone" />
              </div>

              <div>
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Job Title
                </label>
                <input class="sn-input mt-2" [(ngModel)]="profile.jobTitle" name="jobTitle" />
              </div>

              <div>
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Department
                </label>
                <select class="sn-input mt-2" [(ngModel)]="profile.department" name="department">
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                </select>
              </div>

              <div>
                <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Manager
                </label>
                <input class="sn-input mt-2" [(ngModel)]="profile.manager" name="manager" readonly />
              </div>

              <div class="flex justify-end">
                <app-button>Save Changes</app-button>
              </div>
            </form>
          </app-card>

          <!-- Notification Preferences -->
          <app-card header="Notification Preferences" description="Choose how you want to be notified">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <label class="text-sm font-medium">Email Notifications</label>
                  <p class="text-sm text-muted-foreground">
                    Receive email updates about your requests
                  </p>
                </div>
                <input type="checkbox" [(ngModel)]="preferences.emailNotifications" class="rounded border-gray-300" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <label class="text-sm font-medium">SMS Notifications</label>
                  <p class="text-sm text-muted-foreground">
                    Get text messages for urgent updates
                  </p>
                </div>
                <input type="checkbox" [(ngModel)]="preferences.smsNotifications" class="rounded border-gray-300" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <label class="text-sm font-medium">Push Notifications</label>
                  <p class="text-sm text-muted-foreground">
                    Browser notifications for real-time updates
                  </p>
                </div>
                <input type="checkbox" [(ngModel)]="preferences.pushNotifications" class="rounded border-gray-300" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <label class="text-sm font-medium">Weekly Digest</label>
                  <p class="text-sm text-muted-foreground">
                    Summary of your activity and pending items
                  </p>
                </div>
                <input type="checkbox" [(ngModel)]="preferences.weeklyDigest" class="rounded border-gray-300" />
              </div>

              <div class="flex justify-end">
                <app-button variant="outline">Update Preferences</app-button>
              </div>
            </div>
          </app-card>

          <!-- Security Settings -->
          <app-card header="Security Settings" description="Manage your account security">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium mb-2">Change Password</h4>
                <div class="space-y-2">
                  <input class="sn-input" type="password" placeholder="Current password" />
                  <input class="sn-input" type="password" placeholder="New password" />
                  <input class="sn-input" type="password" placeholder="Confirm new password" />
                </div>
                <app-button variant="outline" size="sm" class="mt-2">Update Password</app-button>
              </div>

              <div class="border-t pt-4">
                <h4 class="text-sm font-medium mb-2">Two-Factor Authentication</h4>
                <p class="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <app-button variant="outline" size="sm">
                  {{ preferences.twoFactorEnabled ? 'Disable' : 'Enable' }} 2FA
                </app-button>
              </div>

              <div class="border-t pt-4">
                <h4 class="text-sm font-medium mb-2">Active Sessions</h4>
                <div class="space-y-2">
                  <div *ngFor="let session of activeSessions" class="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p class="text-sm font-medium">{{ session.device }}</p>
                      <p class="text-sm text-muted-foreground">{{ session.location }} • {{ session.lastActive }}</p>
                    </div>
                    <app-button variant="ghost" size="sm" *ngIf="!session.current">
                      Revoke
                    </app-button>
                    <span *ngIf="session.current" class="text-sm text-green-600 font-medium">Current</span>
                  </div>
                </div>
              </div>
            </div>
          </app-card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Profile Picture -->
          <app-card header="Profile Picture">
            <div class="flex flex-col items-center space-y-4">
              <div class="h-24 w-24 bg-primary rounded-full flex items-center justify-center">
                <span class="text-primary-foreground text-2xl font-bold">
                  {{ getInitials() }}
                </span>
              </div>
              <div class="text-center">
                <h3 class="font-semibold">{{ profile.firstName }} {{ profile.lastName }}</h3>
                <p class="text-sm text-muted-foreground">{{ profile.jobTitle }}</p>
                <p class="text-sm text-muted-foreground">{{ profile.department | titlecase }}</p>
              </div>
              <app-button variant="outline" size="sm">Change Photo</app-button>
            </div>
          </app-card>

          <!-- Quick Stats -->
          <app-card header="Account Summary">
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Member since</span>
                <span class="text-sm font-medium">Jan 2022</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Total requests</span>
                <span class="text-sm font-medium">23</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Approved requests</span>
                <span class="text-sm font-medium">18</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Avg. response time</span>
                <span class="text-sm font-medium">2.4 hours</span>
              </div>
            </div>
          </app-card>

          <!-- Quick Actions -->
          <app-card header="Quick Actions">
            <div class="space-y-2">
              <app-button variant="outline" class="w-full justify-start">
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                Download Data
              </app-button>
              <app-button variant="outline" class="w-full justify-start">
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Contact Support
              </app-button>
              <app-button variant="outline" class="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Sign Out
              </app-button>
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Senior Software Engineer',
    department: 'engineering',
    manager: 'Jane Smith'
  };

  preferences = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyDigest: true,
    twoFactorEnabled: false
  };

  activeSessions = [
    {
      device: 'Chrome on MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      lastActive: '2 hours ago',
      current: false
    },
    {
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '1 day ago',
      current: false
    }
  ];

  getInitials(): string {
    return `${this.profile.firstName.charAt(0)}${this.profile.lastName.charAt(0)}`;
  }
}