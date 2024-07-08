import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'app-pasien',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
        FormsModule,
        InputSwitchModule,
        InputTextareaModule,
    ],
    templateUrl: './pasien.component.html',
    styleUrl: './pasien.component.scss'
})
export class PasienComponent implements OnInit, OnDestroy {

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
        id: 'Pasien',
        column: [
            { field: 'no_rekam_medis', headerName: 'No. Rekam Medis', class: 'font-semibold' },
            { field: 'nama_lengkap', headerName: 'Nama Lengkap', },
            { field: 'no_identitas', headerName: 'NIK', },
            { field: 'umur', headerName: 'Umur', },
            { field: 'alamat', headerName: 'Alamat', },
            { field: 'status_active', headerName: 'Status Aktif', renderAsCheckbox: true, class: 'text-center' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete', 'Detail'],
        showPaging: true,
        showSearch: true,
        searchKeyword: 'nama_lengkap',
        searchPlaceholder: 'Cari Nama Pasien Disini'
    };
    GridSelectedData: any;

    FormState: 'insert' | 'update' = 'insert';
    FormIdentitasProps: FormModel.IForm;
    @ViewChild('FormIdentitasComps') FormIdentitasComps!: DynamicFormComponent;

    FormIdentitasBayiProps!: FormModel.IForm;
    @ViewChild('FormIdentitasBayiComps') FormIdentitasBayiComps!: DynamicFormComponent;

    FormAlamatProps!: FormModel.IForm;
    @ViewChild('FormAlamatComps') FormAlamatComps!: DynamicFormComponent;

    FormAlamatDomisiliProps!: FormModel.IForm;
    @ViewChild('FormAlamatDomisiliComps') FormAlamatDomisiliComps!: DynamicFormComponent;

    FormKontakProps!: FormModel.IForm;
    @ViewChild('FormKontakComps') FormKontakComps!: DynamicFormComponent;

    FormLainLainProps!: FormModel.IForm;
    @ViewChild('FormLainLainComps') FormLainLainComps!: DynamicFormComponent;

    IsBayiLahir: boolean = false;

    Alamat: string = "";

    AlamatDomisili: string = "";

    IsAlamatDomisiliSame: boolean = false;

    constructor(
        private _store: Store,
        private _messageService: MessageService,
    ) {
        this.FormIdentitasProps = {
            id: 'form_identitas_pasien',
            fields: [
                {
                    id: 'no_identitas',
                    label: 'NIK',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'no_identitas_lain',
                    label: 'No. Identitas Lain (Khusus WNA)',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_lengkap',
                    label: 'Nama Lengkap',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_ibu_kandung',
                    label: 'Nama Ibu Kandung',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'tempat_lahir',
                    label: 'Tempat Lahir',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'tanggal_lahir',
                    label: 'Tanggal Lahir',
                    required: false,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'jenis_kelamin',
                    label: 'Jenis Kelamin',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Laki - Laki', value: 'L' },
                            { name: 'Perempuan', value: 'P' },
                        ],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-4 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormIdentitasBayiProps = {
            id: 'form_identitas_bayi',
            fields: [
                {
                    id: 'no_identitas_ibu',
                    label: 'NIK Ibu Kandung',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nama_lengkap',
                    label: 'Nama Lengkap',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'tanggal_lahir',
                    label: 'Tanggal Lahir',
                    required: false,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'jam_lahir',
                    label: 'Tanggal Lahir',
                    required: false,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'jenis_kelamin',
                    label: 'Jenis Kelamin',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Laki - Laki', value: 'L' },
                            { name: 'Perempuan', value: 'P' },
                        ],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormAlamatProps = {
            id: 'form_alamat',
            fields: [
                {
                    id: 'alamat_lengkap',
                    label: 'Alamat Lengkap',
                    required: true,
                    type: 'textarea',
                    textareaRow: 3,
                    value: '',
                    hidden: true,
                },
                {
                    id: 'provinsi',
                    label: 'Provinsi',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kota',
                    label: 'Kota / Kabupaten',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kecamatan',
                    label: 'Kecamatan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kelurahan',
                    label: 'Kelurahan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kode_pos',
                    label: 'Kode Pos',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'rt/rw',
                    label: 'RT/RW',
                    required: true,
                    type: 'text_split',
                    splitProps: [
                        {
                            id: 'rt',
                            required: true,
                            value: '',
                        },
                        {
                            id: 'rw',
                            required: true,
                            value: '',
                        },
                    ],
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormAlamatDomisiliProps = {
            id: 'form_alamat_domisili',
            fields: [
                {
                    id: 'alamat_domisili',
                    label: 'Alamat Domisili',
                    required: true,
                    type: 'textarea',
                    textareaRow: 3,
                    value: '',
                    hidden: true,
                },
                {
                    id: 'provinsi',
                    label: 'Provinsi',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kota',
                    label: 'Kota / Kabupaten',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kecamatan',
                    label: 'Kecamatan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kelurahan',
                    label: 'Kelurahan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: '',
                        optionValue: ''
                    },
                    value: '',
                },
                {
                    id: 'kode_pos',
                    label: 'Kode Pos',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'rt/rw',
                    label: 'RT/RW',
                    required: true,
                    type: 'text_split',
                    splitProps: [
                        {
                            id: 'rt',
                            required: true,
                            value: '',
                        },
                        {
                            id: 'rw',
                            required: true,
                            value: '',
                        },
                    ],
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormKontakProps = {
            id: 'form_kontak',
            fields: [
                {
                    id: 'no_handphone',
                    label: 'No. HP',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'no_telepon_rumah',
                    label: 'No. Telepon Rumah',
                    required: false,
                    type: 'text',
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-1 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormLainLainProps = {
            id: 'form_lain_lain',
            fields: [
                {
                    id: 'metode_pembayaran',
                    label: 'Metode Pembayaran',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { value: 'Mandiri', label: 'Mandiri' },
                            { value: 'BPJS', label: 'BPJS' },
                            { value: 'Asuransi Lain', label: 'Asuransi Laibn' },
                        ],
                        optionName: 'label',
                        optionValue: 'value'
                    },
                    onChange: (args) => {
                        if (args.value == 'BPJS') {
                            this.FormLainLainProps.fields[1].required = true;
                            this.FormLainLainProps.fields[1].hidden = false;
                        } else {
                            this.FormLainLainProps.fields[1].required = false;
                            this.FormLainLainProps.fields[1].hidden = true;
                        }
                    },
                    value: '',
                },
                {
                    id: 'no_kartu_bpjs',
                    label: 'No. Kartu BPJS',
                    required: false,
                    type: 'text',
                    value: '',
                    hidden: true
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-1 grid-cols-2',
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
                no_rekam_medis: '2400003',
                nama_lengkap: 'John Doe',
                no_identitas: '9999999999999999',
                umur: '24th 2bln 7hr',
                alamat: 'RT05/RW05, Meteseh, Tembalang',
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
            const formValue = this.FormIdentitasComps.FormGroup.value;
            this.savePoli(formValue);
        };

        if (data.id == 'update') {
            const formValue = this.FormIdentitasComps.FormGroup.value;
            this.updatePoli(formValue);
        };
    }

    handleBackToList() {
        this.FormIdentitasComps.onResetForm();

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
            this.FormIdentitasComps.FormGroup.patchValue(args);
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
        //             this.FormIdentitasComps.onResetForm();

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
        //             this.FormIdentitasComps.onResetForm();

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
