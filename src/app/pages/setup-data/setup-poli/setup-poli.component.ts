import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-setup-poli',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent
    ],
    templateUrl: './setup-poli.component.html',
    styleUrl: './setup-poli.component.scss'
})
export class SetupPoliComponent implements OnInit, OnDestroy {

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
        id: 'GridPoli',
        column: [
            { field: 'kode_poli', headerName: 'KODE POLI', flex: 100, sortable: true, resizable: true },
            { field: 'nama_poli', headerName: 'NAMA POLI', flex: 100, sortable: true, resizable: true },
            { field: 'status_active', headerName: 'STATUS AKTIF', flex: 200, sortable: true, resizable: true },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete'],
        showPaging: true,
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
            id: 'form_setup_poli',
            fields: [
                {
                    id: 'kode_poli',
                    label: 'Kode Poli',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_poli',
                    label: 'Nama Poli',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-2 grid-cols-2',
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
        //             console.log("get prov from setup provinsi =>", result);
        //             this.GridProps.dataSource = result;
        //         }
        //     })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.PageState = 'form';
            this.ButtonNavigation = [
                {
                    id: 'back',
                    icon: 'pi pi-chevron-left',
                    title: 'Kembali'
                },
                {
                    id: 'save',
                    icon: 'pi pi-save',
                    title: 'Simpan'
                },
            ];
        };

        if (data.id == 'back') {
            // ** Reset Form 
            this.FormComps.onResetForm();

            this.PageState = 'list';
            this.ButtonNavigation = [
                {
                    id: 'add',
                    title: 'Tambah',
                    icon: 'pi pi-plus'
                }
            ];
        };

        if (data.id == 'save') {
            const formValue = this.FormComps.FormGroup.value;
            this.saveProvinsi(formValue);
        };

        if (data.id == 'update') {
            const formValue = this.FormComps.FormGroup.value;
            this.updateProvinsi(formValue);
        };
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
            this.deleteProvinsi(this.GridSelectedData.kode_wilayah);
        }
    }

    private saveProvinsi(data: any) {
        // this._store
        //     .dispatch(new SetupWilayahActions.CreateProvinsi(data))
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

    private updateProvinsi(data: any) {
        // this._store
        //     .dispatch(new SetupWilayahActions.UpdateProvinsi(data))
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

    private deleteProvinsi(kode_wilayah: string) {
        // this._store
        //     .dispatch(new SetupWilayahActions.DeleteProvinsi(kode_wilayah))
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe((result) => {
        //         console.log("store =>", result);

        //         if (result.setup_wilayah.success) {

        //         }
        //     })
    }
}
