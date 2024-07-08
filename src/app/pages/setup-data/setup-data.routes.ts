import { Route } from "@angular/router";

export const setupDataRoutes: Route[] = [
    {
        path: 'setup-poli',
        loadComponent: async () => (await import('./setup-poli/setup-poli.component')).SetupPoliComponent,
        data: {
            title: 'Setup Poli',
            breadcrumbs: [
                "Beranda", "Setup Data", "Setup Poli"
            ]
        }
    },
    {
        path: 'setup-item',
        loadComponent: async () => (await import('./setup-item/setup-item.component')).SetupItemComponent,
        data: {
            title: 'Setup Item',
            breadcrumbs: [
                "Beranda", "Setup Data", "Setup Item"
            ]
        }
    }
];
