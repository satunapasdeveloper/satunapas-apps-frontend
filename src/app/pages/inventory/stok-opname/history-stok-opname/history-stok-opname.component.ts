import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { StokOpnameService } from 'src/app/services/inventory/stok-opname.service';

@Component({
    selector: 'app-history-stok-opname',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
    ],
    templateUrl: './history-stok-opname.component.html',
    styleUrl: './history-stok-opname.component.scss'
})
export class HistoryStokOpnameComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'HistoryStokOpname',
        column: [
            { field: 'no_trans', headerName: 'No. Faktur', class: 'font-semibold' },
            { field: 'tanggal', headerName: 'Tanggal', format: 'date' },
            { field: 'keterangan', headerName: 'Keterangan' },
            { field: 'status', headerName: 'Status' },
            { field: 'total_selisih_qty', headerName: 'Selisih Qty', format: 'number' },
            { field: 'total_selisih_hpp', headerName: 'Selisih HPP', format: 'number' },
            { field: 'total_selisih_harga_jual', headerName: 'Selisih Harga Jual', format: 'number' },
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
        private _stokOpnameService: StokOpnameService,
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
            this._router.navigateByUrl('/inventory/stok-opname/input');
        };
    }

    private getAll(query: any) {
        this._stokOpnameService
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
            this._router.navigateByUrl(`/inventory/stok-opname/detail/${args.data.id_stock_opname}`);
        }
    }

    onPageChanged(args: any): void {
        this.getAll({ count: args.rows, page: args.page + 1 });
    }

}
