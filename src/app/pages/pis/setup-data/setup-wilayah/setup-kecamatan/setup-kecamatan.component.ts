import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { Subject } from 'rxjs';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { FormModel } from 'src/app/model/components/form.model';

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

    constructor() {
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
            ],
            style: 'inline',
            class: 'grid-rows-4 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
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
