import { Route } from "@angular/router";

export const pisRoutes: Route[] = [
    {
        path: 'setup-data',
        loadChildren: async () => (await import('./setup-data/setup-data.routes')).pisSetupDataRoutes
    },
    {
        path: 'pendaftaran-pasien-baru',
        loadComponent: async () => (await import('./pendaftaran-pasien-baru/pendaftaran-pasien-baru.component')).PendaftaranPasienBaruComponent,
        data: {
            title: 'Pendaftaran Pasien Baru',
            breadcrumbs: [
                "Beranda", "PIS", "Pendaftaran Pasien Baru"
            ]
        }
    }
]