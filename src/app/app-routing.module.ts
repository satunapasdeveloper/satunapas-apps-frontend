import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';

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
        canActivate: [AuthGuard],
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent,
        data: {
            title: 'Beranda',
            breadcrumbs: ['Beranda']
        }
    },
    {
        path: 'setup-data',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./pages/setup-data/setup-data.routes')).setupDataRoutes
    },
    {
        path: 'pasien',
        canActivate: [AuthGuard],
        loadComponent: async () => (await import('./pages/pasien/pasien.component')).PasienComponent,
        data: {
            title: 'Pasien',
            breadcrumbs: [
                "Beranda", "Pasien"
            ]
        }
    },
    {
        path: 'dokter',
        canActivate: [AuthGuard],
        loadComponent: async () => (await import('./pages/dokter/dokter.component')).DokterComponent,
        data: {
            title: 'Dokter',
            breadcrumbs: [
                "Beranda", "Dokter"
            ]
        }
    },
    {
        path: 'antrian',
        canActivate: [AuthGuard],
        loadComponent: async () => (await import('./pages/antrian/antrian.component')).AntrianComponent,
        data: {
            title: 'Antrian',
            breadcrumbs: [
                "Beranda", "Antrian"
            ]
        },
    },
    {
        path: 'antrian/tambah',
        loadComponent: async () => (await import('./pages/antrian/tambah-antrian/tambah-antrian.component')).TambahAntrianComponent,
        data: {
            title: 'Buat Antrian Baru',
            breadcrumbs: [
                "Beranda", "Antrian", "Buat Antrian Baru"
            ]
        },
    },
    {
        path: 'antrian/assesment-awal',
        loadComponent: async () => (await import('./pages/assesment-awal/assesment-awal.component')).AssesmentAwalComponent,
        data: {
            title: 'Buat Assesment Awal',
            breadcrumbs: [
                "Beranda", "Antrian", "Buat Assesment Awal"
            ]
        },
    },
    {
        path: 'rekam-medis',
        children: [
            {
                path: 'data',
                loadComponent: async () => (await import('./pages/rekam-medis/history-rekam-medis/history-rekam-medis.component')).HistoryRekamMedisComponent,
                data: {
                    title: 'Data Rekam Medis',
                    breadcrumbs: [
                        "Beranda", "Rekam Medis", "Data Rekam Medis"
                    ]
                },
            },
            {
                path: 'baru',
                loadComponent: async () => (await import('./pages/rekam-medis/input-rekam-medis/input-rekam-medis.component')).InputRekamMedisComponent,
                data: {
                    title: 'Buat Rekam Medis',
                    breadcrumbs: [
                        "Beranda", "Rekam Medis", "Buat Rekam Medis"
                    ]
                },
            }
        ]
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
