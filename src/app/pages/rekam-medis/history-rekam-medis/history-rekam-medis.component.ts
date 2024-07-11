import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchPasienDialogComponent } from 'src/app/components/dialog/search-pasien-dialog/search-pasien-dialog.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-history-rekam-medis',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        SearchPasienDialogComponent,
    ],
    templateUrl: './history-rekam-medis.component.html',
    styleUrl: './history-rekam-medis.component.scss'
})
export class HistoryRekamMedisComponent {

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'RekamMedis',
        column: [
            { field: 'no_rekam_medis', headerName: 'No. Rekam Medis', class: 'font-semibold' },
            { field: 'nama_lengkap', headerName: 'Nama Lengkap', },
            { field: 'tanggal_visit', headerName: 'Tgl. Visit', },
            { field: 'keluhan', headerName: 'Keluhan', },
            { field: 'diagnosa', headerName: 'Diagnosa', },
            { field: 'status_active', headerName: 'Status Aktif', renderAsCheckbox: true, class: 'text-center' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete', 'Detail'],
        showPaging: true,
        showSearch: true,
        searchKeyword: 'nama_lengkap',
        searchPlaceholder: 'Cari Nama Pasien Disini'
    };
    GridSelectedData: any;

    @ViewChild('SearchPasienDialogComps') SearchPasienDialogComps!: SearchPasienDialogComponent;

    constructor(
        private _router: Router,
    ) { }

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
