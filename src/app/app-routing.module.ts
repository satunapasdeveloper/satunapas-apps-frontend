import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/authentication/authentication.component')).AuthenticationComponent,
        data: {
            title: 'Sign In'
        }
    },
    {
        path: 'beranda',
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent,
        data: {
            title: 'Beranda',
            breadcrumbs: ['Beranda']
        }
    },
    {
        path: 'PIS',
        loadChildren: async () => (await import('./pages/pis/pis.routes')).pisRoutes
    },
    {
        path: '**',
        loadComponent: async () => (await import('./pages/wildcard-not-found/wildcard-not-found.component')).WildcardNotFoundComponent,
        data: {
            title: 'Oops'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
