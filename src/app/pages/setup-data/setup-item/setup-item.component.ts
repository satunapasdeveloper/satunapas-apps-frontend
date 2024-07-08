import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-setup-item',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
    ],
    templateUrl: './setup-item.component.html',
    styleUrl: './setup-item.component.scss'
})
export class SetupItemComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'list' | 'form' = 'list';

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah',
            icon: 'pi pi-plus'
        }
    ];

    GridProps: GridModel.IGrid = {
        id: 'Setup_Item',
        column: [
            { field: 'kode_item', headerName: 'Kode Item', class: 'font-semibold' },
            { field: 'nama_item', headerName: 'Nama Item', },
            { field: 'kategori', headerName: 'Kategori', },
            { field: 'satuan', headerName: 'Satuan', },
            { field: 'harga_jual', headerName: 'Harga Jual', format: 'currency' },
            { field: 'status_active', headerName: 'Status Aktif', renderAsCheckbox: true, class: 'text-center' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete', 'Detail'],
        showPaging: true,
        showSearch: true,
        searchKeyword: 'nama_item',
        searchPlaceholder: 'Cari Nama Item Disini'
    };
    GridSelectedData: any;

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor(
        private _store: Store,
        private _messageService: MessageService,
    ) {
        this.FormProps = {
            id: 'form_setup_item',
            fields: [
                {
                    id: 'kategori',
                    label: 'Kategori',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Obat', value: 'Obat' },
                            { name: 'BMHP', value: 'BMHP' },
                        ],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
                {
                    id: 'nama_item',
                    label: 'Nama Item',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                    onFilter: (args) => {
                        console.log(args);
                    }
                },
                {
                    id: 'kode_item',
                    label: 'Kode Item KFA',
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
                    id: 'harga_jual',
                    label: 'Harga Jual',
                    required: false,
                    type: 'number',
                    value: 0,
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-5 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAll() {
        // this._store
        //     .select(SetupWilayahState.provinsiEntities)
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe((result) => {
        //         if (result) {
        //             console.log("get prov from setup poli =>", result);
        //             this.GridProps.dataSource = result;
        //         }
        //     })

        this.GridProps.dataSource = [
            {
                kode_item: '92001142',
                nama_item: 'Paracetamol 250 mg Sirup (OBAPA)',
                kategori: 'Obat',
                satuan: 'Botol Plastik',
                harga_jual: 6000,
                status_active: true
            },
            {
                kode_item: '2048618',
                nama_item: 'Latex Examination Glove (Free Powder) (LPF001, SHAMROCK SUPREME, XS, S, M, L, XL)',
                kategori: 'BMHP',
                satuan: 'Pieces',
                harga_jual: 6000,
                status_active: true
            },
            {
                kode_item: '93000108',
                nama_item: 'Gemcitabine Hydrochloride 1000 mg Serbuk Injeksi Liofilisasi (ABINGEM)',
                kategori: 'Obat',
                satuan: 'Vial',
                harga_jual: 12000,
                status_active: true
            },
            {
                kode_item: '93000126',
                nama_item: 'Diazepam 2 mg Tablet (VALISANBE)',
                kategori: 'Obat',
                satuan: 'Tablet',
                harga_jual: 19000,
                status_active: true
            },
        ]
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.PageState = 'form';
            this.ButtonNavigation = [];
        };

        if (data.id == 'save') {
            const formValue = this.FormComps.FormGroup.value;
            this.savePoli(formValue);
        };

        if (data.id == 'update') {
            const formValue = this.FormComps.FormGroup.value;
            this.updatePoli(formValue);
        };
    }

    handleBackToList() {
        this.FormComps.onResetForm();

        this.PageState = 'list';
        this.ButtonNavigation = [
            {
                id: 'add',
                title: 'Tambah',
                icon: 'pi pi-plus'
            }
        ];
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.PageState = 'form';

        // ** Ganti button navigation bar data
        this.ButtonNavigation = [
            {
                id: 'back',
                icon: 'pi pi-chevron-left',
                title: 'Kembali'
            },
            {
                id: 'update',
                icon: 'pi pi-save',
                title: 'Update'
            },
        ];

        // ** Set value ke Dynamic form components
        setTimeout(() => {
            this.FormComps.FormGroup.patchValue(args);
        }, 100);
    }

    onToolbarClicked(args: any): void {
        if (args.id == 'delete') {
            console.log(this.GridSelectedData);
            this.deletePoli(this.GridSelectedData.kode_wilayah);
        }
    }

    private savePoli(data: any) {
        // this._store
        //     .dispatch(new SetupWilayahActions.CreatePoli(data))
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe((result) => {
        //         console.log(result);

        //         if (result.setup_wilayah.success) {
        //             // ** Reset Form 
        //             this.FormComps.onResetForm();

        //             // ** Kembali ke list
        //             this.PageState = 'list';

        //             // ** Reset Button Navigation
        //             this.ButtonNavigation = [
        //                 {
        //                     id: 'add',
        //                     title: 'Tambah',
        //                     icon: 'pi pi-plus'
        //                 }
        //             ];
        //         }
        //     })
    }

    private updatePoli(data: any) {
        // this._store
        //     .dispatch(new SetupWilayahActions.UpdatePoli(data))
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe((result) => {
        //         if (result.setup_wilayah.success) {
        //             // ** Reset Form 
        //             this.FormComps.onResetForm();

        //             // ** Kembali ke list
        //             this.PageState = 'list';

        //             // ** Reset Button Navigation
        //             this.ButtonNavigation = [
        //                 {
        //                     id: 'add',
        //                     title: 'Tambah',
        //                     icon: 'pi pi-plus'
        //                 }
        //             ];
        //         }
        //     })
    }

    private deletePoli(kode_wilayah: string) {
        // this._store
        //     .dispatch(new SetupWilayahActions.DeletePoli(kode_wilayah))
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe((result) => {
        //         console.log("store =>", result);

        //         if (result.setup_wilayah.success) {

        //         }
        //     })
    }

}
