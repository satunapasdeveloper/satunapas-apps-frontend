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
import { SetupWilayahState } from 'src/app/store/pis/setup-data/setup-wilayah';

@Component({
    selector: 'app-setup-kecamatan',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent
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
    ) {
        this.FormProps = {
            id: 'authentication',
            fields: [
                {
                    id: 'kode_wilayah_provinsi',
                    label: 'Provinsi',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'nama_wilayah',
                        optionValue: 'kode_wilayah'
                    },
                    value: '',
                },
                {
                    id: 'kode_wilayah_kota',
                    label: 'Kota',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'nama_wilayah',
                        optionValue: 'kode_wilayah'
                    },
                    value: '',
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
                {
                    id: 'lookup',
                    label: 'Test Lookup',
                    required: true,
                    type: 'lookup',
                    value: '',
                    lookupProps: {
                        id: 'lookupBedRom',
                        title: 'Data Bed Room',
                        columns: [
                            { field: 'no_identitas', flex: 200, headerName: 'NO. IDENTITAS', sortable: true, resizable: true },
                            { field: 'full_name', flex: 275, headerName: 'NAMA LENGKAP', sortable: true, resizable: true },
                            { field: 'no_identitas', flex: 290, headerName: 'NO. RM', sortable: true, resizable: true },
                        ],
                        filter: [
                            { id: 'no_identitas', title: 'No. Identitas', type: 'like', value: 'per.no_identitas' },
                            { id: 'no_rekam_medis', title: 'No. Rekam Medis', type: 'like', value: 'p.no_rekam_medis' },
                        ],
                        label: 'Supplier',
                        selectedField: 'nama_supplier',
                        selectedValue: 'id_supplier',
                        url: `${environment.webApiUrl}/pis/Person/PersonPasienGetAllByDynamicFilter`
                    },
                },
            ],
            style: 'inline',
            class: 'grid-rows-5 grid-cols-2',
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
        this._store
            .select(SetupWilayahState.provinsiEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    console.log("get prov from setup kecamatan =>", result);
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

        };

        if (data.id == 'update') {

        };
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.PageState = 'form';
    }

    onToolbarClicked(args: any): void {
        if (args.id == 'delete') {
            // this.onDelete(this.GridSelectedData.id_area_customer)
        }
    }
}   
