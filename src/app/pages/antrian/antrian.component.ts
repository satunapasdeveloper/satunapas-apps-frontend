import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { Subject } from 'rxjs';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-antrian',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        TableModule,
        DropdownModule,
        CalendarModule,
        ButtonModule,
        FormsModule,
        OverlayPanelModule,
        DialogModule,
    ],
    templateUrl: './antrian.component.html',
    styleUrl: './antrian.component.scss'
})
export class AntrianComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah Antrian',
            icon: 'pi pi-plus'
        }
    ];

    AntrianDalamPemeriksaan: any[] = [
        {
            id: 1,
            no_antrian: 'A001',
            nama_pasien: 'John Doe',
            nama_poli: 'POLI UMUM',
            nama_dokter: 'dr. Kim Jennie'
        },
        {
            id: 2,
            no_antrian: 'A002',
            nama_pasien: 'Jane Doe',
            nama_poli: 'POLI ANAK',
            nama_dokter: 'dr. Park Rose, Sp.A'
        },
        {
            id: 3,
            no_antrian: 'A001',
            nama_pasien: 'Jane Doe',
            nama_poli: 'POLI PENYAKIT DALAM',
            nama_dokter: 'dr. Lalisa Manobal, Sp.Pd'
        },
        {
            id: 4,
            no_antrian: 'A004',
            nama_pasien: 'Jane Doe',
            nama_poli: 'POLI KANDUNGAN',
            nama_dokter: 'dr. Kim Jisoo, Sp.Og'
        },
    ];

    AntrianDatasource: any[] = [
        {
            id: 1,
            no_antrian: 'A003',
            nama_pasien: 'Lorem Ipsum',
            nama_poli: 'POLI PENYAKIT DALAM',
            nama_dokter: 'dr. Lalisa Manobal, Sp.PD',
            status: 'Menunggu Assesment'
        },
        {
            id: 2,
            no_antrian: 'A005',
            nama_pasien: 'Dolor Sit Amet',
            nama_poli: 'POLI UMUM',
            nama_dokter: 'dr. Jennie Kim, Sp.PK',
            status: 'Skip'
        },
        {
            id: 3,
            no_antrian: 'A008',
            nama_pasien: 'Consectetur Adipiscing',
            nama_poli: 'POLI ANAK',
            nama_dokter: 'dr. Kim Jisoo, Sp.A',
            status: 'Sedang Diperiksa'
        },
        {
            id: 4,
            no_antrian: 'A012',
            nama_pasien: 'Elit Sed Do',
            nama_poli: 'POLI KANDUNGAN',
            nama_dokter: 'dr. Park Chaeyoung, Sp.KK',
            status: 'Menunggu Assesment'
        },
        {
            id: 5,
            no_antrian: 'A015',
            nama_pasien: 'Lorem Ipsum II',
            nama_poli: 'POLI PENYAKIT DALAM',
            nama_dokter: 'dr. Lalisa Manobal, Sp.PD',
            status: 'Skip'
        },
        {
            id: 6,
            no_antrian: 'A018',
            nama_pasien: 'Dolor Sit Amet II',
            nama_poli: 'POLI UMUM',
            nama_dokter: 'dr. Jennie Kim, Sp.PK',
            status: 'Sedang Diperiksa'
        },
        {
            id: 7,
            no_antrian: 'A021',
            nama_pasien: 'Consectetur Adipiscing II',
            nama_poli: 'POLI ANAK',
            nama_dokter: 'dr. Kim Jisoo, Sp.A',
            status: 'Menunggu Assesment'
        },
        {
            id: 8,
            no_antrian: 'A024',
            nama_pasien: 'Elit Sed Do II',
            nama_poli: 'POLI KANDUNGAN',
            nama_dokter: 'dr. Jisoo, Sp.KK',
            status: 'Skip'
        },
        {
            id: 9,
            no_antrian: 'A027',
            nama_pasien: 'Lorem Ipsum III',
            nama_poli: 'POLI PENYAKIT DALAM',
            nama_dokter: 'dr. Park Chaeyoung, Sp.KK',
            status: 'Sedang Diperiksa'
        }
    ];

    PoliDatasource: any[] = [
        {
            value: 'POLI UMUM',
            label: 'POLI UMUM'
        },
        {
            value: 'POLI ANAK',
            label: 'POLI ANAK'
        },
        {
            value: 'POLI PENYAKIT DALAM',
            label: 'POLI PENYAKIT DALAM'
        },
        {
            value: 'POLI KANDUNGAN',
            label: 'POLI KANDUNGAN'
        },
    ];

    SelectedPoli = 'POLI UMUM';

    SelectedTanggal = new Date();

    constructor() { }

    ngOnInit(): void {
        this.handleSearchPoli(this.SelectedPoli);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {

        };
    }

    handleSearchPoli(nama_poli: string) {
        const data = [
            {
                id: 1,
                no_antrian: 'A003',
                nama_pasien: 'Lorem Ipsum',
                nama_poli: 'POLI PENYAKIT DALAM',
                nama_dokter: 'dr. Lalisa Manobal, Sp.PD',
                status: 'Menunggu Assesment'
            },
            {
                id: 2,
                no_antrian: 'A005',
                nama_pasien: 'Dolor Sit Amet',
                nama_poli: 'POLI UMUM',
                nama_dokter: 'dr. Jennie Kim, Sp.PK',
                status: 'Skip'
            },
            {
                id: 3,
                no_antrian: 'A008',
                nama_pasien: 'Consectetur Adipiscing',
                nama_poli: 'POLI ANAK',
                nama_dokter: 'dr. Kim Jisoo, Sp.A',
                status: 'Sedang Diperiksa'
            },
            {
                id: 4,
                no_antrian: 'A012',
                nama_pasien: 'Elit Sed Do',
                nama_poli: 'POLI KANDUNGAN',
                nama_dokter: 'dr. Park Chaeyoung, Sp.KK',
                status: 'Menunggu Assesment'
            },
            {
                id: 5,
                no_antrian: 'A015',
                nama_pasien: 'Lorem Ipsum II',
                nama_poli: 'POLI PENYAKIT DALAM',
                nama_dokter: 'dr. Lalisa Manobal, Sp.PD',
                status: 'Skip'
            },
            {
                id: 6,
                no_antrian: 'A018',
                nama_pasien: 'Dolor Sit Amet II',
                nama_poli: 'POLI UMUM',
                nama_dokter: 'dr. Jennie Kim, Sp.PK',
                status: 'Sedang Diperiksa'
            },
            {
                id: 7,
                no_antrian: 'A021',
                nama_pasien: 'Consectetur Adipiscing II',
                nama_poli: 'POLI ANAK',
                nama_dokter: 'dr. Kim Jisoo, Sp.A',
                status: 'Menunggu Assesment'
            },
            {
                id: 8,
                no_antrian: 'A024',
                nama_pasien: 'Elit Sed Do II',
                nama_poli: 'POLI KANDUNGAN',
                nama_dokter: 'dr. Jisoo, Sp.KK',
                status: 'Skip'
            },
            {
                id: 9,
                no_antrian: 'A027',
                nama_pasien: 'Lorem Ipsum III',
                nama_poli: 'POLI PENYAKIT DALAM',
                nama_dokter: 'dr. Park Chaeyoung, Sp.KK',
                status: 'Sedang Diperiksa'
            }
        ];

        this.AntrianDatasource = data.filter(item => item.nama_poli == nama_poli);
    }

    handleFormatStatusAntrian(status: 'Skip' | 'Menunggu Assesment' | 'Sedang Diperiksa') {
        let classColor = 'bg-red-200 text-red-700';

        switch (status) {
            case 'Skip':
                classColor = 'bg-red-200 text-red-700';
                break;
            case 'Menunggu Assesment':
                classColor = 'bg-orange-200 text-orange-700';
                break;
            case 'Sedang Diperiksa':
                classColor = 'bg-blue-200 text-blue-700';
                break;
            default:
                break;
        }

        return classColor;
    }
}
