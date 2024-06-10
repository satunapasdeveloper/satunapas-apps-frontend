import { Route } from "@angular/router";

export const pisRoutes: Route[] = [
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