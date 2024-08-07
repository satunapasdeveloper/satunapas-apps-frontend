import { CommonModule, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SearchPasienDialogComponent } from 'src/app/components/dialog/search-pasien-dialog/search-pasien-dialog.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { ManajemenUserModel } from 'src/app/model/pages/setup-data/manajemen-user.model';
import { PoliModel } from 'src/app/model/pages/setup-data/poli.model';
import { PendaftaranService } from 'src/app/services/pendaftaran/pendaftaran.service';
import { RekamMedisActions } from 'src/app/store/rekam-medis';
import { ManajemenUserState } from 'src/app/store/setup-data/manajemen-user';
import { SetupPoliState } from 'src/app/store/setup-data/setup-poli';

@Component({
    selector: 'app-history-rekam-medis',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        SearchPasienDialogComponent,
        DropdownModule,
        CalendarModule,
        InputTextModule,
    ],
    templateUrl: './history-rekam-medis.component.html',
    styleUrl: './history-rekam-medis.component.scss'
})
export class HistoryRekamMedisComponent implements OnInit, OnDestroy {

    Destrroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [];

    GridProps: GridModel.IGrid = {
        id: 'RekamMedis',
        column: [
            { field: 'no_rekam_medis', headerName: 'No. Rekam Medis', class: 'font-semibold' },
            { field: 'tanggal_visit', headerName: 'Tgl. Visit', },
            { field: 'nama_lengkap', headerName: 'Nama Lengkap', },
            { field: 'dokter', headerName: 'Dokter', },
            { field: 'debitur', headerName: 'Metode Bayar', },
            { field: 'pre_assessment', headerName: 'Pre Assessment', renderAsCheckbox: true, class: 'text-center' },
            { field: 'status_pasien', headerName: 'Status Pasien', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Mulai Periksa'],
        showPaging: true,
        showSearch: false,
        searchKeyword: 'nama_lengkap',
        searchPlaceholder: 'Cari Nama Pasien Disini'
    };
    GridSelectedData: any;

    @ViewChild('SearchPasienDialogComps') SearchPasienDialogComps!: SearchPasienDialogComponent;

    Poli: PoliModel.IPoli[] = [];

    UserDokter: ManajemenUserModel.IUser[] = [];

    SearchParameter$ = new BehaviorSubject<any>(null);

    constructor(
        private _store: Store,
        private _router: Router,
        private _pendaftaranService: PendaftaranService,
    ) { }

    ngOnInit(): void {
        this.getAll();
        this.getAllPoli();
        this.getAllUserDokter();
    }

    ngOnDestroy(): void {
        this.Destrroy$.next(1);
        this.Destrroy$.complete();
    }

    handleChangeFilter(type: string, args: any) {
        if (type == 'pendaftaran.tanggal_visit') {
            if (args) {
                this.SearchParameter$.next(
                    {
                        ...this.SearchParameter$.value,
                        "pendaftaran.tanggal_visit": new Date(args)
                    }
                );
            } else {
                let value = this.SearchParameter$.value;
                delete value['pendaftaran.tanggal_visit'];
                this.SearchParameter$.next(value);
            }
        };

        if (type == 'jadwal_dokter.id_poli') {
            if (args.value) {
                this.SearchParameter$.next(
                    {
                        ...this.SearchParameter$.value,
                        "jadwal_dokter.id_poli": args.value
                    }
                );
            } else {
                let value = this.SearchParameter$.value;
                delete value['jadwal_dokter.id_poli'];
                this.SearchParameter$.next(value);
            }
        };

        if (type == 'jadwal_dokter.id_dokter') {
            if (args.value) {
                this.SearchParameter$.next(
                    {
                        ...this.SearchParameter$.value,
                        "jadwal_dokter.id_dokter": args.value
                    }
                );
            } else {
                let value = this.SearchParameter$.value;
                delete value['jadwal_dokter.id_dokter'];
                this.SearchParameter$.next(value);
            }
        };

        if (type == 'pasien.nama_lengkap') {
            if (args) {
                this.SearchParameter$.next(
                    {
                        ...this.SearchParameter$.value,
                        "pasien.nama_lengkap": args
                    }
                );
            } else {
                let value = this.SearchParameter$.value;
                delete value['pasien.nama_lengkap'];
                this.SearchParameter$.next(value);
            }
        };
    }

    getAll(parameter?: any) {
        let payload: any[] = [];

        console.log("parameter =>", parameter);

        if (parameter) {
            for (const item of Object.keys(parameter)) {
                if (item == 'pendaftaran.tanggal_visit') {
                    payload.push({
                        "columnName": item,
                        "filter": "between",
                        "searchText": formatDate(new Date(parameter[item]), 'yyyy-MM-dd', 'EN'),
                        "searchText2": formatDate(new Date(parameter[item]), 'yyyy-MM-dd', 'EN'),
                        "withOr": true
                    });
                } else {
                    payload.push({
                        "columnName": item,
                        "filter": item == 'pasien.nama_lengkap' ? 'like' : "equel",
                        "searchText": parameter[item],
                        "searchText2": "",
                        "withOr": true
                    });
                }
            }
        };

        this._store
            .dispatch(new RekamMedisActions.GetAllRekamMedis(payload))
            .pipe(takeUntil(this.Destrroy$))
            .subscribe((result) => {
                this.GridProps.dataSource = result.rekam_medis.entities;
            })
    }

    private getAllPoli() {
        this._store
            .select(SetupPoliState.poliEntities)
            .pipe(takeUntil(this.Destrroy$))
            .subscribe((result) => {
                this.Poli = result;
            })
    }

    private getAllUserDokter() {
        this._store
            .select(ManajemenUserState.userDokterEntities)
            .pipe(takeUntil(this.Destrroy$))
            .subscribe((result) => {
                this.UserDokter = result as ManajemenUserModel.IUser[];
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.SearchPasienDialogComps.ShowDialog = true;
        };
    }

    onToolbarClicked(args: any): void {
        if (args.id == 'delete') {
            // console.log(this.GridSelectedData);
            // this.deletePoli(this.GridSelectedData.kode_wilayah);
        }
    }

    handleSelectLookupPasien(args: any) {
        localStorage.setItem('_SPSH_', JSON.stringify(args));
        this._router.navigateByUrl(`/rekam-medis/baru?no_rm=${args.no_rekam_medis}`)
    }
}
