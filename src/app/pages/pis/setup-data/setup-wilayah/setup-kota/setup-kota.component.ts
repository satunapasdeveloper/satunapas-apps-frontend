import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { WilayahModel } from 'src/app/model/pages/pis/setup-data/setup-wilayah.model';
import { SetupWilayahState, SetupWilayahActions } from 'src/app/store/pis/setup-data/setup-wilayah';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-setup-kota',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        DropdownModule,
        ButtonModule,
    ],
    templateUrl: './setup-kota.component.html',
    styleUrls: ['./setup-kota.component.scss']
})
export class SetupKotaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'list' | 'form' = 'list';

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'add',
            title: 'Tambah',
            icon: 'pi pi-plus'
        }
    ];

    ProvinsiDatasource: WilayahModel.IWilayah[] = [];

    GridProps: GridModel.IGrid = {
        id: 'GridProvinsi',
        column: [
            { field: 'kode_wilayah', headerName: 'KODE WILAYAH', flex: 100, sortable: true, resizable: true },
            { field: 'kode_wilayah_parent', headerName: 'KODE WILAYAH PARENT', flex: 100, sortable: true, resizable: true },
            { field: 'kode_tipe_wilayah', headerName: 'KODE TIPE WILAYAH', flex: 200, sortable: true, resizable: true },
            { field: 'nama_wilayah', headerName: 'NAMA WILAYAH', flex: 200, sortable: true, resizable: true },
        ],
        dataSource: [],
        height: "calc(100vh - 18rem)",
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
        // !! Jangan lupa ganti ID 
        this.FormProps = {
            id: 'form_setup_kota',
            fields: [
                {
                    id: 'kode_wilayah_parent',
                    label: 'Kode Provinsi',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'nama_wilayah',
                        optionValue: 'kode_wilayah',
                        autoDisplayFirst: false
                    },
                    value: '',
                    hidden: false,
                    onChange: (args: any) => {
                        this.FormComps.FormGroup.get('kode_wilayah')?.setValue(args.kode_wilayah + ".");
                    }
                },
                {
                    id: 'kode_tipe_wilayah',
                    label: 'kode_tipe_wilayah',
                    required: true,
                    type: 'text',
                    value: '',
                    hidden: true,
                },
                {
                    id: 'kode_wilayah',
                    label: 'Kode Kota',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_wilayah',
                    label: 'Nama Kota',
                    required: true,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'inline',
            class: 'grid-rows-4 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllProvinsi();
        this.getAllKota({ value: "11" });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllProvinsi() {
        this._store
            .select(SetupWilayahState.provinsiEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    const indexProvinsi = this.FormProps.fields.findIndex(item => item.id == 'kode_wilayah_parent');
                    this.FormProps.fields[indexProvinsi].dropdownProps.options = result;
                    this.ProvinsiDatasource = result;
                }
            })
    }

    getAllKota(args: any) {
        this._store
            .dispatch(new SetupWilayahActions.GetAllKotaByKodeProvinsi(args.value))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this.GridProps.dataSource = result.setup_wilayah.kota;
                }
            })
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
            this.saveKota(formValue);
        };

        if (data.id == 'update') {
            const formValue = this.FormComps.FormGroup.value;
            this.updateKota(formValue);
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
            this.deleteKota(this.GridSelectedData.kode_wilayah);
        }
    }

    private saveKota(data: WilayahModel.CreateWilayah) {
        this._store
            .dispatch(new SetupWilayahActions.CreateKota(data))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_wilayah.success) {
                    // ** Reset Form 
                    this.FormComps.onResetForm();

                    // ** Kembali ke list
                    this.PageState = 'list';

                    // ** Reset Button Navigation
                    this.ButtonNavigation = [
                        {
                            id: 'add',
                            title: 'Tambah',
                            icon: 'pi pi-plus'
                        }
                    ];
                }
            })
    }

    private updateKota(data: WilayahModel.CreateWilayah) {
        this._store
            .dispatch(new SetupWilayahActions.UpdateKota(data))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_wilayah.success) {
                    // ** Reset Form 
                    this.FormComps.onResetForm();

                    // ** Kembali ke list
                    this.PageState = 'list';

                    // ** Reset Button Navigation
                    this.ButtonNavigation = [
                        {
                            id: 'add',
                            title: 'Tambah',
                            icon: 'pi pi-plus'
                        }
                    ];
                }
            })
    }

    private deleteKota(kode_wilayah: string) {
        this._store
            .dispatch(new SetupWilayahActions.DeleteKota(kode_wilayah))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_wilayah.success) {

                }
            })
    }

}
