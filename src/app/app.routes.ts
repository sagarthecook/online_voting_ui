import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
    { path: '', component: App },
    {path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
    {path : 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
    {path : "**" , redirectTo: 'login' }
];