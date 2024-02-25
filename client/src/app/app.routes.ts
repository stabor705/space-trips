import { Routes } from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found/not-found.component";
import {ForbiddenComponent} from "./core/components/forbidden/forbidden.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('../app/pages/trips/trips.module').then((m) => m.TripsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('../app/pages/cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'history',
    loadChildren: () => import('../app/pages/history/history.module').then((m) => m.HistoryModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/pages/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
