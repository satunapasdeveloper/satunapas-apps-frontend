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
    }
];
