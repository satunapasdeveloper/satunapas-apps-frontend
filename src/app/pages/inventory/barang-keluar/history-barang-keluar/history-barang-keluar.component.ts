import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { BarangKeluarService } from 'src/app/services/inventory/barang-keluar.service';

@Component({
    selector: 'app-history-barang-keluar',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
    ],
    templateUrl: './history-barang-keluar.component.html',
    styleUrl: './history-barang-keluar.component.scss'
})
export class HistoryBarangKeluarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'HistoryBarangKeluar',
        column: [
            { field: 'no_trans', headerName: 'No. Faktur', class: 'font-semibold' },
            { field: 'tanggal', headerName: 'Tanggal', format: 'date' },
            { field: 'keterangan', headerName: 'Keterangan' },
            { field: 'status', headerName: 'Status' },
            { field: 'grand_total', headerName: 'Grand Total', format: 'currency' },
            { field: 'created_at', headerName: 'Waktu Entry', format: 'date' },
            { field: 'created_by', headerName: 'User Entry', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Detail'],
        showPaging: true,
        showSearch: true,
        showSort: false,
        searchKeyword: 'no_trans',
        searchPlaceholder: 'Cari No. Faktur Disini',
        totalRows: 0,
    };

    constructor(
        private _router: Router,
        private _barangKeluarService: BarangKeluarService,
    ) { }

    ngOnInit(): void {
        this.getAll({ page: 1, count: 5 });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this._router.navigateByUrl('/inventory/barang-keluar/input');
        };
    }

    private getAll(query: any) {
        this._barangKeluarService
            .getAll(query)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this.GridProps.dataSource = result.data.rows;
                    this.GridProps.totalRows = result.data.totalRows;
                }
            });
    }

    onToolbarClicked(args: any): void {
        if (args.type == 'cancel') {

        }

        if (args.type == 'detail') {
            this._router.navigateByUrl(`/inventory/barang-keluar/detail/${args.data.id_barang_keluar}`);
        }
    }

    onPageChanged(args: any): void {
        this.getAll({ count: args.rows, page: args.page + 1 });
    }

}
