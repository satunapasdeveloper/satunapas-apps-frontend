import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { Subject, takeUntil } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { FormModel } from 'src/app/model/components/form.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetupWilayahActions, SetupWilayahState } from 'src/app/store/pis/setup-data/setup-wilayah';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { WilayahModel } from 'src/app/model/pages/pis/setup-data/setup-wilayah.model';

@Component({
    selector: 'app-setup-kecamatan',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        DropdownModule,
        ButtonModule,
    ],
    templateUrl: './setup-kecamatan.component.html',
    styleUrls: ['./setup-kecamatan.component.scss']
})
export class SetupKecamatanComponent implements OnInit, OnDestroy {

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
        id: 'GridKecamatan',
        column: [
            { field: 'kode_wilayah', headerName: 'KODE WILAYAH', flex: 200, sortable: true, resizable: true },
            { field: 'kode_wilayah_parent', headerName: 'KODE WILAYAH PARENT', flex: 200, sortable: true, resizable: true },
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

    ProvinsiDatasource: WilayahModel.IWilayah[] = [];

    KotaDatasource: WilayahModel.IWilayah[] = [];

    constructor(
        private _store: Store,
    ) {
        this.FormProps = {
            id: 'form_setup_kecamatan',
            fields: [
                {
                    id: 'kode_wilayah_provinsi',
                    label: 'Provinsi',
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
                        this.FormComps.FormGroup.get('kode_wilayah_parent')?.setValue("");
                        this.FormComps.FormGroup.get('kode_wilayah')?.setValue("");
                        this.getAllKota(args.kode_wilayah);
                    }
                },
                {
                    id: 'kode_wilayah_parent',
                    label: 'Kota',
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
                        const kode_wilayah_parent = this.FormComps.FormGroup.get('kode_wilayah_parent')?.value;
                        this.FormComps.FormGroup.get('kode_wilayah')?.setValue(kode_wilayah_parent + "." + args.kode_wilayah + ".");
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
                    label: 'Kode Wilayah',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_wilayah',
                    label: 'Nama Wilayah',
                    required: true,
                    type: 'text',
                    value: '',
                },
                // {
                //     id: 'lookup',
                //     label: 'Test Lookup',
                //     required: true,
                //     type: 'lookup',
                //     value: '',
                //     lookupProps: {
                //         id: 'lookupBedRom',
                //         title: 'Data Bed Room',
                //         columns: [
                //             { field: 'no_identitas', flex: 200, headerName: 'NO. IDENTITAS', sortable: true, resizable: true },
                //             { field: 'full_name', flex: 275, headerName: 'NAMA LENGKAP', sortable: true, resizable: true },
                //             { field: 'no_identitas', flex: 290, headerName: 'NO. RM', sortable: true, resizable: true },
                //         ],
                //         filter: [
                //             { id: 'no_identitas', title: 'No. Identitas', type: 'like', value: 'per.no_identitas' },
                //             { id: 'no_rekam_medis', title: 'No. Rekam Medis', type: 'like', value: 'p.no_rekam_medis' },
                //         ],
                //         label: 'Supplier',
                //         selectedField: 'nama_supplier',
                //         selectedValue: 'id_supplier',
                //         url: `${environment.webApiUrl}/pis/Person/PersonPasienGetAllByDynamicFilter`
                //     },
                // },
            ],
            style: 'inline',
            class: 'grid-rows-4 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAllProvinsi();
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
                    const indexProvinsi = this.FormProps.fields.findIndex(item => item.id == 'kode_wilayah_provinsi');
                    this.FormProps.fields[indexProvinsi].dropdownProps.options = result;
                    this.ProvinsiDatasource = result;
                }
            })
    }

    getAllKota(kode_wilayah_provinsi: string) {
        this._store
            .dispatch(new SetupWilayahActions.GetAllKotaByKodeProvinsi(kode_wilayah_provinsi))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    const indexKota = this.FormProps.fields.findIndex(item => item.id == 'kode_wilayah_parent');
                    this.FormProps.fields[indexKota].dropdownProps.options = result.setup_wilayah.kota;
                    this.KotaDatasource = result.setup_wilayah.kota;
                }
            })
    }

    getAllKecamatan(kode_wilayah_kota: string) {
        this._store
            .dispatch(new SetupWilayahActions.GetAllKecamatanByKodeKota(kode_wilayah_kota))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this.GridProps.dataSource = result.setup_wilayah.kecamatan;
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
            this.saveKecamatan(formValue);
        };

        if (data.id == 'update') {
            const formValue = this.FormComps.FormGroup.value;
            this.updateKecamatan(formValue);
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
            this.deleteKecamatan(this.GridSelectedData.kode_wilayah);
        }
    }

    private saveKecamatan(data: WilayahModel.CreateWilayah) {
        this._store
            .dispatch(new SetupWilayahActions.CreateKecamatan(data))
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

    private updateKecamatan(data: WilayahModel.CreateWilayah) {
        this._store
            .dispatch(new SetupWilayahActions.UpdateKecamatan(data))
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

    private deleteKecamatan(kode_wilayah: string) {
        this._store
            .dispatch(new SetupWilayahActions.DeleteKecamatan(kode_wilayah))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_wilayah.success) {

                }
            })
    }
}   
