import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'list',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/list/list.routes').then((m) => m.LIST_ROUTES),
  },
  { path: '**', redirectTo: 'login' },
];
