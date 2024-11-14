import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { BarangKeluarModel } from 'src/app/model/pages/inventory/barang-keluar.model';
import { BarangMasukModel } from 'src/app/model/pages/inventory/barang-masuk.model';
import { BarangKeluarService } from 'src/app/services/inventory/barang-keluar.service';
import { BarangMasukService } from 'src/app/services/inventory/barang-masuk.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-detail-barang-keluar',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
        DialogModule,
        InputTextareaModule
    ],
    templateUrl: './detail-barang-keluar.component.html',
    styleUrl: './detail-barang-keluar.component.scss'
})
export class DetailBarangKeluarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        },
        {
            id: 'cancel',
            title: 'Batalkan',
            icon: 'pi pi-ban'
        }
    ];

    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    GridProps: GridModel.IGrid = {
        id: 'gridDetailBarangMasuk',
        column: [
            { field: 'nama_item', headerName: 'Nama Item', class: 'font-semibiold text-xs' },
            { field: 'qty', headerName: 'Qty', format: 'number', class: 'text-end text-xs' },
            { field: 'harga_jual', headerName: 'Harga Jual', format: 'currency', class: 'text-end text-xs' },
            { field: 'subtotal', headerName: 'Total', format: 'currency', class: 'text-end text-xs' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        showPaging: false,
        showSearch: true,
        showSort: false,
        searchKeyword: 'nama_item',
        searchPlaceholder: 'Cari Nama Item Disini'
    };

    JumlahItem = 0;
    GrandTotal = 0;

    ShowDialogBatal = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activateRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _barangKeluarService: BarangKeluarService,
    ) {
        this.FormProps = {
            id: 'form_header_barang_masuk',
            fields: [
                {
                    id: 'tanggal',
                    label: 'Tanggal',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true,
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
                    id: 'created_at',
                    label: 'Waktu Entry',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true,
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
        const id = this._activateRoute.snapshot.params['id'];
        console.log("id =>", id);
        this.getDetail(id);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getDetail(id: string) {
        this._barangKeluarService
            .getById(id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    (<any>result.data.tanggal) = this._utilityService.onFormatDate(new Date(result.data.tanggal), 'DD-MMM-yyyy');
                    (<any>result.data.created_at) = this._utilityService.onFormatDate(new Date(result.data.created_at), 'DD-MM-yyyy HH:mm');

                    this.FormComps.FormGroup.patchValue(result.data);
                    this.GridProps.dataSource = result.data.detail.map((item: any) => {
                        (<any>item.qty) = parseInt(item.qty);
                        (<any>item.harga_jual) = parseFloat(item.harga_jual);
                        (<any>item.subtotal) = parseInt(item.subtotal);

                        this.JumlahItem += parseInt(item.qty);
                        this.GrandTotal += parseFloat(item.subtotal);

                        return {
                            ...item,
                            nama_item: item.item.nama_item
                        }
                    });
                }
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl('/inventory/barang-keluar/history');
        };

        if (data.id == 'cancel') {
            // this.handleSubmitForm();
            this.ShowDialogBatal = true;
        };
    }

    handleSavePembatalan(reason_canceled: string) {
        const payload: BarangKeluarModel.Cancel = {
            id_barang_keluar: this._activateRoute.snapshot.params['id'],
            reason_canceled: reason_canceled
        };

        this._barangKeluarService
            .cancel(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil dibatalkan' });

                    setTimeout(() => {
                        this.handleClickButtonNavigation({ id: 'back' });
                    }, 1000);
                }
            })
    }

}
