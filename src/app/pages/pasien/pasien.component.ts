import { CommonModule, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasienService } from 'src/app/services/pasien/pasien.service';
import { LokasiService } from 'src/app/services/setup-data/lokasi.service';

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
            { field: 'nik', headerName: 'NIK', },
            { field: 'tanggal_lahir', headerName: 'Tgl. Lahir', format: 'date' },
            { field: 'alamat_lengkap', headerName: 'Alamat', },
            { field: 'is_pasien_bayi', headerName: 'Pasien Bayi', renderAsCheckbox: true, class: 'text-center' },
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
        private _pasienService: PasienService,
        private _lokasiService: LokasiService,
        private _messageService: MessageService,
    ) {
        this.FormIdentitasProps = {
            id: 'form_identitas_pasien',
            fields: [
                {
                    id: 'nik',
                    label: 'NIK',
                    required: true,
                    type: 'text',
                    mask: '0000-0000-0000-0000',
                    value: '',
                },
                {
                    id: 'wna',
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
                    required: true,
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
                    id: 'nik',
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
                    label: 'Jam Lahir',
                    required: false,
                    type: 'time',
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
                    id: 'ktp_alamat_lengkap',
                    label: 'Alamat Lengkap',
                    required: true,
                    type: 'textarea',
                    textareaRow: 3,
                    value: '',
                    hidden: true,
                },
                {
                    id: 'ktp_id_provinsi',
                    label: 'Provinsi',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                    onChange: (args: any) => {
                        if (args) {
                            this.getKota(args.id);
                        } else {
                            this.FormAlamatComps.FormGroup.get('ktp_id_kabupaten')?.setValue(null);
                            this.FormAlamatComps.FormGroup.get('ktp_id_kecamatan')?.setValue(null);
                            this.FormAlamatComps.FormGroup.get('ktp_id_kelurahan')?.setValue(null);

                            this.FormAlamatProps.fields[2].dropdownProps.options = [];
                            this.FormAlamatProps.fields[3].dropdownProps.options = [];
                            this.FormAlamatProps.fields[4].dropdownProps.options = [];
                        }
                    },
                },
                {
                    id: 'ktp_id_kabupaten',
                    label: 'Kota / Kabupaten',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                    onChange: (args: any) => {
                        if (args) {
                            this.getKecamatan(args.id);
                        } else {
                            this.FormAlamatComps.FormGroup.get('ktp_id_kecamatan')?.setValue(null);
                            this.FormAlamatComps.FormGroup.get('ktp_id_kelurahan')?.setValue(null);
                            this.FormAlamatProps.fields[3].dropdownProps.options = [];
                            this.FormAlamatProps.fields[4].dropdownProps.options = [];
                        }
                    },
                },
                {
                    id: 'ktp_id_kecamatan',
                    label: 'Kecamatan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                    onChange: (args: any) => {
                        if (args) {
                            this.getKelurahan(args.id);
                        } else {
                            this.FormAlamatComps.FormGroup.get('ktp_id_kelurahan')?.setValue(null);
                            this.FormAlamatProps.fields[4].dropdownProps.options = [];
                        }
                    },
                },
                {
                    id: 'ktp_id_kelurahan',
                    label: 'Kelurahan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                },
                {
                    id: 'ktp_kode_pos',
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
                            id: 'ktp_rt',
                            required: true,
                            value: '',
                        },
                        {
                            id: 'ktp_rw',
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
                    id: 'alamat_lengkap',
                    label: 'Alamat Domisili',
                    required: true,
                    type: 'textarea',
                    textareaRow: 3,
                    value: '',
                    hidden: true,
                },
                {
                    id: 'id_provinsi',
                    label: 'Provinsi',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                    onChange: (args: any) => {
                        if (args) {
                            this.getKota(args.id);
                        } else {
                            this.FormAlamatComps.FormGroup.get('ktp_id_kabupaten')?.setValue(null);
                            this.FormAlamatComps.FormGroup.get('ktp_id_kecamatan')?.setValue(null);
                            this.FormAlamatComps.FormGroup.get('ktp_id_kelurahan')?.setValue(null);

                            this.FormAlamatProps.fields[2].dropdownProps.options = [];
                            this.FormAlamatProps.fields[3].dropdownProps.options = [];
                            this.FormAlamatProps.fields[4].dropdownProps.options = [];
                        }
                    },
                },
                {
                    id: 'id_kabupaten',
                    label: 'Kota / Kabupaten',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                    onChange: (args: any) => {
                        if (args) {
                            this.getKecamatan(args.id);
                        } else {
                            this.FormAlamatComps.FormGroup.get('ktp_id_kecamatan')?.setValue(null);
                            this.FormAlamatComps.FormGroup.get('ktp_id_kelurahan')?.setValue(null);
                            this.FormAlamatProps.fields[3].dropdownProps.options = [];
                            this.FormAlamatProps.fields[4].dropdownProps.options = [];
                        }
                    },
                },
                {
                    id: 'id_kecamatan',
                    label: 'Kecamatan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
                    },
                    value: '',
                    onChange: (args: any) => {
                        if (args) {
                            this.getKelurahan(args.id);
                        } else {
                            this.FormAlamatComps.FormGroup.get('ktp_id_kelurahan')?.setValue(null);
                            this.FormAlamatProps.fields[4].dropdownProps.options = [];
                        }
                    },
                },
                {
                    id: 'id_kelurahan',
                    label: 'Kelurahan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'id'
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
                    id: 'no_hp',
                    label: 'No. HP',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'no_telpon',
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
                    id: 'methode_pembayaran',
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
                            this.FormLainLainProps.class = 'grid-rows-3 grid-cols-2';
                            this.FormLainLainProps.fields[1].required = true;
                            this.FormLainLainProps.fields[1].hidden = false;
                        } else {
                            this.FormLainLainProps.class = 'grid-rows-2 grid-cols-2';
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
                {
                    id: 'pendidikan_terakhir',
                    label: 'Pendidikan Terakhir',
                    required: false,
                    type: 'select',
                    value: '',
                    dropdownProps: {
                        options: [
                            { value: 'SD', label: 'Sekolah Dasar (SD)' },
                            { value: 'SMP', label: 'Sekolah Menengah Pertama (SMP)' },
                            { value: 'SMA', label: 'Sekolah Menengah Atas (SMA)' },
                            { value: 'SMK', label: 'Sekolah Menengah Kejuruan (SMK)' },
                            { value: 'D3', label: 'Diploma (D3)' },
                            { value: 'D4', label: 'Diploma (D4)' },
                            { value: 'S1', label: 'Sarjana (S1)' },
                            { value: 'S2', label: 'Magister (S2)' },
                            { value: 'S3', label: 'Doktor (S3)' }
                        ],
                        optionName: 'label',
                        optionValue: 'value'
                    },
                },
                {
                    id: 'pekerjaan',
                    label: 'Pekerjaan',
                    required: false,
                    type: 'text',
                    value: '',
                    hidden: false
                },
                {
                    id: 'status_pernikahan',
                    label: 'Status Pernikahan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { value: 'Belum Kawin', label: 'Belum Kawin' },
                            { value: 'Kawin', label: 'Kawin' },
                            { value: 'Cerai Mati', label: 'Cerai Mati' },
                            { value: 'Cerai Hidup', label: 'Cerai Hidup' },
                        ],
                        optionName: 'label',
                        optionValue: 'value'
                    },
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-2 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAll();
        this.getProvinsi();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAll() {
        this._pasienService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    console.log("get data =>", result.data);
                    this.GridProps.dataSource = result.data;
                }
            });
    }

    private getProvinsi() {
        this._lokasiService
            .getProvinsi()
            .subscribe((result) => {
                if (result.responseResult) {
                    this.FormAlamatProps.fields[1].dropdownProps.options = result.data;
                    this.FormAlamatDomisiliProps.fields[1].dropdownProps.options = result.data;
                }
            })
    }

    private getKota(id_provinsi: string) {
        this._lokasiService
            .getKota(id_provinsi)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.FormAlamatProps.fields[2].dropdownProps.options = result.data;
                    this.FormAlamatDomisiliProps.fields[2].dropdownProps.options = result.data;
                }
            })
    }

    private getKecamatan(id_kota: string) {
        this._lokasiService
            .getKecamatan(id_kota)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.FormAlamatProps.fields[3].dropdownProps.options = result.data;
                    this.FormAlamatDomisiliProps.fields[3].dropdownProps.options = result.data;
                }
            })
    }

    private getKelurahan(id_kecamatan: string) {
        this._lokasiService
            .getKelurahan(id_kecamatan)
            .subscribe((result) => {
                if (result.responseResult) {
                    this.FormAlamatProps.fields[4].dropdownProps.options = result.data;
                    this.FormAlamatDomisiliProps.fields[4].dropdownProps.options = result.data;
                }
            })
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.PageState = 'form';
            this.ButtonNavigation = [];
        };
    }

    handleBackToList() {
        if (this.IsBayiLahir) {
            this.FormIdentitasBayiComps.onResetForm();
        } else {
            this.FormIdentitasComps.onResetForm();
        };

        this.FormAlamatComps.onResetForm();

        if (!this.IsAlamatDomisiliSame) {
            this.FormAlamatDomisiliComps.onResetForm();
        }

        this.FormKontakComps.onResetForm();
        this.FormLainLainComps.onResetForm();

        this.PageState = 'list';
        this.ButtonNavigation = [
            {
                id: 'add',
                title: 'Tambah',
                icon: 'pi pi-plus'
            }
        ];

        this.getAll();
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.PageState = 'form';
        this.FormState = 'update';

        setTimeout(() => {
            this.FormIdentitasComps.onResetForm();
            this.FormIdentitasBayiComps ? this.FormIdentitasBayiComps.onResetForm() : null;
            this.FormAlamatComps.onResetForm();
            this.FormAlamatDomisiliComps ? this.FormAlamatDomisiliComps.onResetForm() : null;
            this.FormKontakComps.onResetForm();
            this.FormLainLainComps.onResetForm();

            this.ButtonNavigation = [];

            this.getDetailPasien(args);
        }, 100);
    }

    private getDetailPasien(args: any) {
        console.log("detail pasien =>", args);

        this.IsBayiLahir = args.is_pasien_bayi;

        setTimeout(() => {
            if (this.IsBayiLahir) {
                this.FormIdentitasBayiComps.FormGroup.patchValue(args);
            } else {
                this.FormIdentitasComps.FormGroup.patchValue(args);
            }
        }, 100);
    }

    onToolbarClicked(args: any): void {
        if (args.id == 'delete') {
            console.log(this.GridSelectedData);
            // this.deletePoli(this.GridSelectedData.kode_wilayah);
        }
    }

    savePasien() {
        let alamat_form = this.FormAlamatComps.FormGroup.value,
            alamat_domisili_form = this.FormAlamatDomisiliComps ? this.FormAlamatDomisiliComps.FormGroup.value : null,
            identitas_form = this.FormIdentitasComps ? this.FormIdentitasComps.FormGroup.value : null,
            identitas_bayi_form = this.FormIdentitasBayiComps ? this.FormIdentitasBayiComps.FormGroup.value : null;

        alamat_form.ktp_alamat_lengkap = this.Alamat;

        if (identitas_bayi_form) {
            const tanggal_lahir = formatDate(identitas_bayi_form.tanggal_lahir, 'yyyy-MM-dd', 'EN');
            const jam_lahir = formatDate(identitas_bayi_form.jam_lahir, 'HH:mm:ss', 'EN');
            const waktu_lahir = `${tanggal_lahir}T${jam_lahir}.000Z`;

            identitas_bayi_form.tanggal_lahir = waktu_lahir;
        }

        const
            alamat_domisili = {
                alamat_lengkap: this.IsAlamatDomisiliSame ? alamat_form.ktp_alamat_lengkap : this.AlamatDomisili,
                id_provinsi: this.IsAlamatDomisiliSame ? alamat_form.ktp_id_provinsi : alamat_domisili_form.id_provinsi,
                id_kabupaten: this.IsAlamatDomisiliSame ? alamat_form.ktp_id_kabupaten : alamat_domisili_form.id_kabupaten,
                id_kecamatan: this.IsAlamatDomisiliSame ? alamat_form.ktp_id_kecamatan : alamat_domisili_form.id_kecamatan,
                id_kelurahan: this.IsAlamatDomisiliSame ? alamat_form.ktp_id_kelurahan : alamat_domisili_form.id_kelurahan,
                kode_pos: this.IsAlamatDomisiliSame ? alamat_form.ktp_kode_pos : alamat_domisili_form.kode_pos,
                rt: this.IsAlamatDomisiliSame ? alamat_form.ktp_rt : alamat_domisili_form.rt,
                rw: this.IsAlamatDomisiliSame ? alamat_form.ktp_rw : alamat_domisili_form.rw,
            },
            identitas = {
                nik: !this.IsBayiLahir ? identitas_form.nik : identitas_bayi_form.nik,
                wna: !this.IsBayiLahir ? identitas_form.wna : null,
                nama_lengkap: !this.IsBayiLahir ? identitas_form.nama_lengkap : identitas_bayi_form.nama_lengkap,
                nama_ibu_kandung: !this.IsBayiLahir ? identitas_form.nama_ibu_kandung : identitas_bayi_form.nama_lengkap,
                tempat_lahir: !this.IsBayiLahir ? identitas_form.tempat_lahir : "",
                tanggal_lahir: !this.IsBayiLahir ? identitas_form.tanggal_lahir : identitas_bayi_form.tanggal_lahir,
                jenis_kelamin: !this.IsBayiLahir ? identitas_form.jenis_kelamin : identitas_bayi_form.jenis_kelamin,
            };

        delete alamat_form['rt/rw'];

        const payload = {
            is_pasien_bayi: this.IsBayiLahir,
            ...identitas,
            ...alamat_form,
            ...alamat_domisili,
            ...this.FormKontakComps.FormGroup.value,
            ...this.FormLainLainComps.FormGroup.value,
        };

        console.log("payload =>", payload);

        this._pasienService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Disimpan' });
                    this.handleBackToList();
                }
            })
    }

    private updatePasien(data: any) {
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

    private deletePasien(kode_wilayah: string) {
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
