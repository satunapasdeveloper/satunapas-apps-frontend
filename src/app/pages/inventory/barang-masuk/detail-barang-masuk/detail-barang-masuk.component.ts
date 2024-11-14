import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { BarangMasukModel } from 'src/app/model/pages/inventory/barang-masuk.model';
import { BarangMasukService } from 'src/app/services/inventory/barang-masuk.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-detail-barang-masuk',
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
    templateUrl: './detail-barang-masuk.component.html',
    styleUrl: './detail-barang-masuk.component.scss'
})
export class DetailBarangMasukComponent implements OnInit, OnDestroy {

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
            { field: 'batch', headerName: 'Batch', class: 'text-xs' },
            { field: 'expired_date', headerName: 'Expired Date', format: 'date', class: 'text-xs' },
            { field: 'qty', headerName: 'Qty', format: 'number', class: 'text-end text-xs' },
            { field: 'harga_beli', headerName: 'Harga Beli', format: 'currency', class: 'text-end text-xs' },
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
        private _barangMasukService: BarangMasukService,
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
                    id: 'no_surat_jalan',
                    label: 'No. Surat Jalan',
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
        this._barangMasukService
            .getById(id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    (<any>result.data.tanggal) = this._utilityService.onFormatDate(new Date(result.data.tanggal), 'DD-MMM-yyyy');
                    (<any>result.data.created_at) = this._utilityService.onFormatDate(new Date(result.data.created_at), 'DD-MM-yyyy HH:mm');

                    this.FormComps.FormGroup.patchValue(result.data);
                    this.GridProps.dataSource = result.data.detail.map((item: any) => {
                        (<any>item.qty) = parseInt(item.qty);
                        (<any>item.harga_beli) = parseFloat(item.harga_beli);
                        (<any>item.sub_total) = (parseInt(item.harga_beli) * parseInt(item.qty));

                        this.JumlahItem += parseInt(item.qty);
                        this.GrandTotal += parseFloat(item.sub_total);

                        return {
                            ...item,
                            nama_item: item.item.nama_item
                        }
                    });

                    console.log(this.GridProps.dataSource);
                }
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl('/inventory/barang-masuk/history');
        };

        if (data.id == 'cancel') {
            // this.handleSubmitForm();
            this.ShowDialogBatal = true;
        };
    }

    handleSavePembatalan(reason_canceled: string) {
        const payload: BarangMasukModel.Cancel = {
            id_barang_masuk: this._activateRoute.snapshot.params['id'],
            reason_canceled: reason_canceled
        };

        this._barangMasukService
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
