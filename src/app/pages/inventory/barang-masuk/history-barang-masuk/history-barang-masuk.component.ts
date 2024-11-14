import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { BarangMasukService } from 'src/app/services/inventory/barang-masuk.service';

@Component({
    selector: 'app-history-barang-masuk',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
    ],
    templateUrl: './history-barang-masuk.component.html',
    styleUrl: './history-barang-masuk.component.scss'
})
export class HistoryBarangMasukComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'HistoryBarangMasuk',
        column: [
            { field: 'no_surat_jalan', headerName: 'No. Surat Jalan', class: 'font-semibold' },
            { field: 'tanggal', headerName: 'Tanggal', format: 'date' },
            { field: 'status', headerName: 'Status' },
            { field: 'created_at', headerName: 'Waktu Entry', format: 'date' },
            { field: 'created_by', headerName: 'User Entry', },
            { field: 'canceled_at', headerName: 'Waktu Cancel', format: 'date' },
            { field: 'canceled_by', headerName: 'User Cancel', },
            { field: 'reason_canceled', headerName: 'Alasan Cancel', },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Detail'],
        showPaging: true,
        showSearch: true,
        showSort: false,
        searchKeyword: 'no_surat_jalan',
        searchPlaceholder: 'Cari No. Surat Jalan Disini',
        totalRows: 0,
    };

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _barangMasukService: BarangMasukService,
        private _confirmationService: ConfirmationService,
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
            this._router.navigateByUrl('/inventory/barang-masuk/input');
        };
    }

    private getAll(query: any) {
        this._barangMasukService
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
            this._router.navigateByUrl(`/inventory/barang-masuk/detail/${args.data.id_barang_masuk}`);
        }
    }

    onPageChanged(args: any): void {
        this.getAll({ count: args.rows, page: args.page + 1 });
    }
}
