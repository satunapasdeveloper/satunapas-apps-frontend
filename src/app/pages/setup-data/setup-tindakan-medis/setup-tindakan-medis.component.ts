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
    selector: 'app-setup-tindakan-medis',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
    ],
    templateUrl: './setup-tindakan-medis.component.html',
    styleUrl: './setup-tindakan-medis.component.scss'
})
export class SetupTindakanMedisComponent implements OnInit, OnDestroy {

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
        id: 'Setup_Tindakan_Medis',
        column: [
            { field: 'nama_tindakan_medis', headerName: 'Nama Tindakan Medis', class: 'font-semibold' },
            { field: 'nama_tindakan_icd_9', headerName: 'Nama Tindakan ICD-9', },
            { field: 'harga_satuan', headerName: 'Harga Satuan', format: 'currency' },
            { field: 'status_active', headerName: 'Status Aktif', renderAsCheckbox: true, },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete', 'Detail'],
        showPaging: true,
        showSearch: true,
        searchKeyword: 'nama_tindakan_medis',
        searchPlaceholder: 'Cari Nama Tindakan Medis Disini'
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
            id: 'form_setup_tindakan_medis',
            fields: [
                {
                    id: 'nama_tindakan_medis',
                    label: 'Nama Tindakan Medis',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_tindakan_icd_9',
                    label: 'Nama Tindakan ICD-9',
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
                    id: 'harga_satuan',
                    label: 'Harga Satuan',
                    required: false,
                    type: 'number',
                    value: 0,
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-1',
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
                nama_tindakan_medis: 'Jahitan',
                nama_tindakan_icd_9: 'Part Gastrec W Jej Anast',
                harga_satuan: 30000,
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
