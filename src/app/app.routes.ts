import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog.component').then(c => c.CatalogComponent)
  },
  {
    path: 'requests',
    loadComponent: () => import('./pages/requests/requests.component').then(c => c.RequestsComponent)
  },
  {
    path: 'approvals',
    loadComponent: () => import('./pages/approvals/approvals.component').then(c => c.ApprovalsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent)
  }
];