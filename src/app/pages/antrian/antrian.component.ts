import { CommonModule, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { LookupDialogComponent } from 'src/app/components/dialog/lookup-dialog/lookup-dialog.component';
import { SearchPasienDialogComponent } from 'src/app/components/dialog/search-pasien-dialog/search-pasien-dialog.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { LookupModel } from 'src/app/model/components/lookup.model';
import { PendaftaranService } from 'src/app/services/pendaftaran/pendaftaran.service';
import { RekamMedisActions } from 'src/app/store/rekam-medis';
import { SetupPoliState } from 'src/app/store/setup-data/setup-poli';

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
        SearchPasienDialogComponent,
        ConfirmDialogModule,
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
        // {
        //     id: 1,
        //     no_antrian: 'A001',
        //     nama_pasien: 'John Doe',
        //     nama_poli: 'POLI UMUM',
        //     nama_dokter: 'dr. Kim Jennie'
        // },
        // {
        //     id: 2,
        //     no_antrian: 'A002',
        //     nama_pasien: 'Jane Doe',
        //     nama_poli: 'POLI ANAK',
        //     nama_dokter: 'dr. Park Rose, Sp.A'
        // },
        // {
        //     id: 3,
        //     no_antrian: 'A001',
        //     nama_pasien: 'Jane Doe',
        //     nama_poli: 'POLI PENYAKIT DALAM',
        //     nama_dokter: 'dr. Lalisa Manobal, Sp.Pd'
        // },
        // {
        //     id: 4,
        //     no_antrian: 'A004',
        //     nama_pasien: 'Jane Doe',
        //     nama_poli: 'POLI KANDUNGAN',
        //     nama_dokter: 'dr. Kim Jisoo, Sp.Og'
        // },
    ];

    AntrianDatasource: any[] = [];

    PoliDatasource: any[] = [];

    SelectedPoli: any;

    SelectedTanggal = new Date();

    SelectedPasien: any;

    ShowModalPanggilPasien: boolean = false;

    @ViewChild('SearchPasienDialogComps') SearchPasienDialogComps!: SearchPasienDialogComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _pendaftaranService: PendaftaranService,
        private _confirmationService: ConfirmationService,
    ) { }

    ngOnInit(): void {
        this.getAllPoli();
        this.getAntrianDalamPemeriksaan();

        const prevFilter = JSON.parse(localStorage.getItem('_ANTRIAN_FILTER_SEARCH_') as any);
        if (prevFilter) {
            this._store
                .dispatch(new RekamMedisActions.GetAllRekamMedis(prevFilter))
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    this.AntrianDatasource = result.rekam_medis.entities;
                })
        }
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.SearchPasienDialogComps.ShowDialog = true;
        };
    }

    private getAllPoli() {
        this._store
            .select(SetupPoliState.poliEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.PoliDatasource = result;
            })
    }

    getAntrianDalamPemeriksaan() {
        this._pendaftaranService
            .getAntrianHariIni()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.AntrianDalamPemeriksaan = result.data;
            })
    }

    handleSearchAntrian(kode_poli: string, tanggal_visit: Date) {
        let payload: any[] = [
            {
                "columnName": 'pendaftaran.tanggal_visit',
                "filter": "between",
                "searchText": formatDate(new Date(tanggal_visit), 'yyyy-MM-dd', 'EN'),
                "searchText2": formatDate(new Date(tanggal_visit), 'yyyy-MM-dd', 'EN'),
                "withOr": false
            },
            {
                "columnName": 'poli.kode_poli',
                "filter": "like",
                "searchText": kode_poli,
                "searchText2": "",
                "withOr": false
            }
        ];

        this._store
            .dispatch(new RekamMedisActions.GetAllRekamMedis(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                localStorage.setItem('_ANTRIAN_FILTER_SEARCH_', JSON.stringify(payload));
                this.AntrianDatasource = result.rekam_medis.entities;
            })
    }

    handleFormatStatusAntrian(status: 'Skip' | 'MENUNGGU/BELUM DI PANGGIL' | 'Sedang Diperiksa') {
        let classColor = 'bg-red-200 text-red-700';

        switch (status) {
            case 'Skip':
                classColor = 'bg-red-200 text-red-700';
                break;
            case 'MENUNGGU/BELUM DI PANGGIL':
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

    handleOpenDialogPanggil(data: any) {
        this.SelectedPasien = data;
        this.ShowModalPanggilPasien = true;

        setTimeout(() => {
            this.onCallAntrian(data);
        }, 200);
    }

    onCallAntrian(data: any) {
        const voice: any = speechSynthesis.getVoices();
        const msg = new window.SpeechSynthesisUtterance();

        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;
        msg.lang = "id-ID";
        msg.voice = voice.find((item: any) => { return item.name == 'Google Bahasa Indonesia' });

        msg.text = `Panggilan....Kepada....Nomor....antrian....${data.no_antrian},....pasien....${data.nama_lengkap},....menuju....${data.nama_poli}`;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
    }

    handleSelectLookupPasien(args: any) {
        localStorage.setItem('_SPSH_', JSON.stringify(args));
        this._router.navigateByUrl(`/antrian/tambah?no_rm=${args.no_rekam_medis}`)
    }

    handleGoToAssesmentAwal(args: any) {
        localStorage.setItem('_SPSH_', JSON.stringify(args));
        this._router.navigateByUrl(`/antrian/assesment-awal?id=${args.id_pendaftaran}`)
    }

    handleGoToInputRekamMedis(args: any): void {
        localStorage.setItem('_SPSH_', JSON.stringify(args));
        this._router.navigateByUrl(`/rekam-medis/baru?id=${args.id_pendaftaran}`)
    }

    handleCancelAntrian(args: any): void {
        this._confirmationService.confirm({
            target: (<any>event).target as EventTarget,
            message: 'Data yang dihapus tidak bisa dikembalikan',
            header: 'Apakah Anda Yakin?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-sm",
            rejectButtonStyleClass: "p-button-secondary p-button-sm",
            acceptIcon: "none",
            acceptLabel: 'Iya Saya Yakin',
            rejectIcon: "none",
            rejectLabel: 'Tidak, Kembali',
            accept: () => {
                this._pendaftaranService
                    .cancel(args.id_pendaftaran)
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.responseResult) {
                            this.getAntrianDalamPemeriksaan();

                            const prevFilter = JSON.parse(localStorage.getItem('_ANTRIAN_FILTER_SEARCH_') as any);
                            if (prevFilter) {
                                this._store
                                    .dispatch(new RekamMedisActions.GetAllRekamMedis(prevFilter))
                                    .pipe(takeUntil(this.Destroy$))
                                    .subscribe((result) => {
                                        this.AntrianDatasource = result.rekam_medis.entities;
                                    })
                            }
                        }
                    })
            }
        });
    }
}
