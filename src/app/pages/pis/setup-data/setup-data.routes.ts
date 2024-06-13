import { Route } from "@angular/router";

export const pisSetupDataRoutes: Route[] = [
    {
        path: 'setup-kecamatan',
        loadComponent: async () => (await import('./setup-wilayah/setup-kecamatan/setup-kecamatan.component')).SetupKecamatanComponent,
        data: {
            title: 'Setup Kecamatan',
            breadcrumbs: ["Beranda", "PIS", "Setup Data", "Setup Wilayah", "Setup Kecamatan"]
        }
    },
    {
        path: 'setup-kota',
        loadComponent: async () => (await import('./setup-wilayah/setup-kota/setup-kota.component')).SetupKotaComponent,
        data: {
            title: 'Setup Kota',
            breadcrumbs: ["Beranda", "PIS", "Setup Data", "Setup Wilayah", "Setup Kota"]
        }
    },
    {
        path: 'setup-provinsi',
        loadComponent: async () => (await import('./setup-wilayah/setup-provinsi/setup-provinsi.component')).SetupProvinsiComponent,
        data: {
            title: 'Setup Kota',
            breadcrumbs: ["Beranda", "PIS", "Setup Data", "Setup Wilayah", "Setup Provinsi"]
        }
    }
]