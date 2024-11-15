import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { StokOpnameService } from 'src/app/services/inventory/stok-opname.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-detail-stok-opname',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        DynamicFormComponent,
        InputTextModule,
        TableModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        InputTextareaModule
    ],
    templateUrl: './detail-stok-opname.component.html',
    styleUrl: './detail-stok-opname.component.scss'
})
export class DetailStokOpnameComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        },
        {
            id: 'update',
            title: 'Update',
            icon: 'pi pi-save'
        },
        {
            id: 'validasi',
            title: 'Validasi',
            icon: 'pi pi-check'
        },
        {
            id: 'cetak',
            title: 'Cetak',
            icon: 'pi pi-print'
        }
    ];

    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    GridProps: GridModel.IGrid = {
        id: 'gridDetailBarangMasuk',
        column: [
            { field: 'nama_item', headerName: 'Nama Item', class: 'font-semibiold text-xs' },
            { field: 'qty_sistem', headerName: 'Qty Sistem', format: 'number', class: 'text-end text-xs' },
            { field: 'qty_fisik', headerName: 'Qty Fisik', format: 'number', class: 'text-end text-xs' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        showPaging: false,
        showSearch: true,
        showSort: false,
        searchKeyword: 'nama_item',
        searchPlaceholder: 'Cari Nama Item Disini'
    };

    total_selisih_qty = 0;

    total_selisih_hpp = 0;

    total_selisih_harga_jual = 0;

    ShowDialogValidasi = false;

    constructor(
        private _router: Router,
        private _activateRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _stokOpnameService: StokOpnameService,
    ) {
        this.FormProps = {
            id: 'form_header_barang_masuk',
            fields: [
                {
                    id: 'id_stock_opname',
                    label: 'Id',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true
                },
                {
                    id: 'tanggal',
                    label: 'Tanggal',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'no_trans',
                    label: 'No. Faktur',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'status',
                    label: 'Status',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true,
                },
            ],
            style: 'inline',
            class: 'grid-rows-2 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getDetail();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getDetail() {
        const id = this._activateRoute.snapshot.params['id'];

        this._stokOpnameService
            .getById(id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    (<any>result.data.tanggal) = new Date(result.data.tanggal);

                    this.FormComps.FormGroup.patchValue(result.data);

                    this.GridProps.dataSource = result.data.detail.map((item: any) => {
                        (<any>item.qty_sistem) = parseInt(item.qty_sistem);
                        (<any>item.qty_fisik) = parseInt(item.qty_fisik ? item.qty_fisik : 0);

                        return {
                            ...item,
                            nama_item: item.item.nama_item
                        }
                    });

                    this.total_selisih_qty = result.data.total_selisih_qty ? result.data.total_selisih_qty : 0;
                    this.total_selisih_hpp = result.data.total_selisih_hpp ? result.data.total_selisih_hpp : 0;
                    this.total_selisih_harga_jual = result.data.total_selisih_harga_jual ? result.data.total_selisih_harga_jual : 0;
                }
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl('/inventory/stok-opname/history');
        };

        if (data.id == 'validasi') {
            this.ShowDialogValidasi = true;
        };

        if (data.id == 'cetak') {
            this._router.navigateByUrl(`/inventory/stok-opname/print/${this._activateRoute.snapshot.params['id']}`);
        };

        if (data.id == 'update') {
            const payload = {
                ...this.FormComps.FormGroup.value,
                detail: this.GridProps.dataSource.map((item: any) => {
                    return {
                        id_stock_opname_detail: item.id_stock_opname_detail,
                        id_item: item.id_item,
                        qty_sistem: item.qty_sistem,
                        qty_fisik: item.qty_fisik
                    }
                })
            };

            console.log("payload =>", payload);

            this._stokOpnameService
                .update(payload)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.responseResult) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil diperbarui' });
                        this.getDetail();
                    }
                })
        };
    }

    handleValidasi(keterangan_validasi: string) {
        const payload = {
            id_barang_masuk: this._activateRoute.snapshot.params['id'],
            reason_canceled: keterangan_validasi
        };

        this._stokOpnameService
            .validasi(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil divalidasi' });
                    this.getDetail();
                }
            })
    }
}
