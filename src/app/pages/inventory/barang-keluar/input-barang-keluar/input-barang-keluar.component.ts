import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { BarangKeluarService } from 'src/app/services/inventory/barang-keluar.service';
import { BarangMasukService } from 'src/app/services/inventory/barang-masuk.service';
import { ItemStokService } from 'src/app/services/setup-data/item-stok.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { SetupItemState } from 'src/app/store/setup-data/item';

@Component({
    selector: 'app-input-barang-keluar',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
    ],
    templateUrl: './input-barang-keluar.component.html',
    styleUrl: './input-barang-keluar.component.scss'
})
export class InputBarangKeluarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        },
        {
            id: 'save',
            title: 'Simpan',
            icon: 'pi pi-save'
        }
    ];

    FormState: 'insert' | 'update' = 'insert';

    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    ShowDialogFormDetail = false;

    FormPencarianItemProps: FormModel.IForm;
    @ViewChild('FormPencarianItemComps') FormPencarianItemComps!: DynamicFormComponent;

    FormDetailProps: FormModel.IForm;
    @ViewChild('FormDetailComps') FormDetailComps!: DynamicFormComponent;

    GridProps: GridModel.IGrid = {
        id: 'gridDetailBarangMasuk',
        column: [
            { field: 'nama_item', headerName: 'Nama Item', class: 'font-semibiold text-xs' },
            { field: 'qty', headerName: 'Qty', format: 'number' },
            { field: 'harga_jual', headerName: 'Harga Jual', format: 'currency' },
            { field: 'subtotal', headerName: 'Total', format: 'currency' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Edit', 'Delete'],
        showPaging: false,
        showSearch: false,
        showSort: false,
        searchKeyword: 'nama_item',
        searchPlaceholder: 'Cari Nama Item Disini'
    };

    JumlahItem = 0;

    GrandTotal = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _barangKeluarService: BarangKeluarService,
    ) {
        this.FormProps = {
            id: 'form_header_barang_keluar',
            fields: [
                {
                    id: 'tanggal',
                    label: 'Tanggal',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'keterangan',
                    label: 'Deskripsi',
                    required: false,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-1 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormPencarianItemProps = {
            id: 'form_detail_barang_keluar',
            fields: [
                {
                    id: 'id_item',
                    label: 'Nama Item',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'nama_item',
                        optionsValue: 'id_item',
                        customField: {
                            title: 'kode_kfa',
                            subtitle: 'nama_item',
                            subtitle_key: 'Nama Item',
                            description: 'produsen',
                            description_key: 'Produsen'
                        }
                    },
                    onChange: (args: any) => {
                        this.FormDetailComps.FormGroup.patchValue(args);
                    },
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-1 grid-cols-1',
            state: 'write',
            defaultValue: null,
        }

        this.FormDetailProps = {
            id: 'form_detail_barang_keluar',
            fields: [
                {
                    id: 'urut',
                    label: 'Urut',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true,
                    hidden: true,
                },
                {
                    id: 'nama_item',
                    label: 'Nama Item',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true,
                    hidden: true,
                },
                {
                    id: 'kode_kfa',
                    label: 'Kode KFA',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'code',
                    label: 'Kode Item',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'satuan',
                    label: 'Satuan',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'qty',
                    label: 'Qty',
                    required: true,
                    type: 'number',
                    value: '',
                    onChange: (args: any) => {
                        const qty = parseInt(args);
                        const harga_jual = parseFloat(this.FormDetailComps.FormGroup.get('harga_jual')?.value);
                        this.FormDetailComps.FormGroup.get('subtotal')?.setValue(qty * harga_jual);
                    }
                },
                {
                    id: 'harga_jual',
                    label: 'Harga Jual',
                    required: true,
                    type: 'number',
                    value: '',
                    onChange: (args: any) => {
                        const harga_jual = parseInt(args);
                        const qty = parseFloat(this.FormDetailComps.FormGroup.get('qty')?.value);
                        this.FormDetailComps.FormGroup.get('subtotal')?.setValue(qty * harga_jual);
                    }
                },
                {
                    id: 'subtotal',
                    label: 'Total',
                    required: true,
                    type: 'number',
                    value: '',
                    readonly: true,
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllItem();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'back') {
            this._router.navigateByUrl('/inventory/barang-keluar/history');
        };

        if (data.id == 'save') {
            this.handleSubmitForm();
        };
    }

    onToolbarClicked(args: any): void {
        if (args.type == 'edit') {
            this.handleOpenDialogFormDetail(true, args.data)
        }

        if (args.type == 'delete') {
            const newDatasource = this.GridProps.dataSource.filter(item => item.urut != args.urut);
            this.GridProps.dataSource = newDatasource;
            this.onCountFooter();
        }
    }

    private getAllItem() {
        this._store
            .select(SetupItemState.itemEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.FormPencarianItemProps.fields[0].dropdownProps.options = result;
            })
    }

    handleOpenDialogFormDetail(isUpdate: boolean, data?: any) {
        this.FormState = isUpdate ? 'update' : 'insert';
        this.ShowDialogFormDetail = true;
        this.FormPencarianItemComps.FormGroup.reset();
        this.FormDetailComps.FormGroup.reset();

        if (isUpdate) {
            this.FormPencarianItemComps.FormGroup.patchValue(data);
            this.FormDetailComps.FormGroup.patchValue(data);
        }
    }

    handleSaveFormDetail() {
        const payload = {
            urut: this.GridProps.dataSource.length + 1,
            ...this.FormPencarianItemComps.FormGroup.value,
            ...this.FormDetailComps.FormGroup.value,
        };

        this.GridProps.dataSource = [payload, ...this.GridProps.dataSource];
        this.FormPencarianItemComps.FormGroup.reset();
        this.FormDetailComps.FormGroup.reset();
        this.ShowDialogFormDetail = false;
        this.onCountFooter();
    }

    handleUpdateFormDetail() {
        const payload = {
            ...this.FormPencarianItemComps.FormGroup.value,
            ...this.FormDetailComps.FormGroup.value,
        };

        const index = this.GridProps.dataSource.findIndex(item => item.urut == payload.urut);

        this.GridProps.dataSource[index] = payload;
        this.FormPencarianItemComps.FormGroup.reset();
        this.FormDetailComps.FormGroup.reset();
        this.ShowDialogFormDetail = false;
        this.onCountFooter();
    }

    private onCountFooter() {
        this.JumlahItem = 0;
        this.GrandTotal = 0;

        this.GridProps.dataSource.forEach((item: any) => {
            item.qty = parseInt(item.qty);
            item.subtotal = parseInt(item.subtotal);

            this.JumlahItem += item.qty;
            this.GrandTotal += item.subtotal;
        })
    }

    private handleSubmitForm() {
        let header = this.FormComps.FormGroup.value;
        header.tanggal = this._utilityService.onFormatDate(new Date(header.tanggal), 'yyyy-MM-DDTHH:mm:ss');

        const payload = {
            ...header,
            grand_total: this.GrandTotal,
            detail: this.GridProps.dataSource.map((item: any) => {
                return {
                    id_item: item.id_item.id_item,
                    qty: item.qty,
                    harga_jual: item.harga_jual,
                    subtotal: item.subtotal
                }
            })
        };

        this._barangKeluarService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Disimpan' });

                    setTimeout(() => {
                        this.handleClickButtonNavigation({ id: 'back' });
                    }, 1000);
                }
            })
    }

}
