import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { ItemService } from 'src/app/services/setup-data/item.service';
import { SetupItemActions, SetupItemState } from 'src/app/store/setup-data/item';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ItemStokService } from 'src/app/services/setup-data/item-stok.service';

@Component({
    selector: 'app-setup-item',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
        InputTextareaModule,
        ConfirmDialogModule,
        FormsModule,
        InputSwitchModule,
        InputNumberModule,
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
            { field: 'kode_kfa', headerName: 'Kode Item', class: 'font-semibold' },
            { field: 'nama_item', headerName: 'Nama Item', },
            { field: 'kategori', headerName: 'Kategori', },
            { field: 'satuan', headerName: 'Satuan', },
            { field: 'stock', headerName: 'Stock', format: 'number', class: 'text-end' },
            { field: 'is_active', headerName: 'Status Aktif', renderAsCheckbox: true, class: 'text-center' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete', "Ubah Status", 'Detail'],
        showPaging: true,
        showSearch: true,
        showSort: false,
        searchKeyword: 'nama_item',
        searchPlaceholder: 'Cari Nama Item Disini',
        totalRows: 0,
    };
    GridSelectedData: any;

    First: number = 0;

    Rows: number = 10;

    FormState: 'insert' | 'update' = 'insert';

    @ViewChild('FormComps') FormComps!: DynamicFormComponent;
    FormProps: FormModel.IForm;

    SelectedObat: any;

    @ViewChild('FormResultKfaComps') FormResultKfaComps!: DynamicFormComponent;
    FormResultKfaProps: FormModel.IForm;

    Catatan: string = "";

    IsNotifExp = false;
    NotifExpDay = 0;

    @ViewChild('FormHargaJualComps') FormHargaJualComps!: DynamicFormComponent;
    FormHargaJualProps: FormModel.IForm;

    KfaKeywordSearch$ = new BehaviorSubject(null);

    constructor(
        private _store: Store,
        private _itemService: ItemService,
        private _messageService: MessageService,
        private _itemStokService: ItemStokService,
        private _confirmationService: ConfirmationService,
    ) {

        this.FormProps = {
            id: 'form_setup_item',
            fields: [
                {
                    id: 'uuid',
                    label: 'UUID',
                    hidden: true,
                    required: false,
                    type: 'text',
                    value: "",
                },
                {
                    id: 'kategori',
                    label: 'Kategori',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Obat', value: 'obat' },
                            { name: 'Alkes', value: 'alkes' },
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
                        optionName: 'nama_item',
                        optionValue: 'nama_item',
                        autoDisplayFirst: false,
                        customField: {
                            title: 'nama_dagang',
                            subtitle: 'nama_item',
                            subtitle_key: 'Nama Produk',
                            description: 'produsen',
                            description_key: 'Produsen',
                        }

                    },
                    value: '',
                    onFilter: (args) => {
                        const kategori = this.FormComps.FormGroup.get('kategori')?.value;

                        if (kategori) {
                            this.KfaKeywordSearch$.next({ kategori: kategori, cari: args.filter } as any);
                        } else {
                            this.KfaKeywordSearch$.next({ cari: args.filter } as any);
                        }
                    },
                    onChange: (args) => {
                        args.code = args.kode_kfa;

                        this.FormComps.FormGroup.get('kategori')?.setValue(args ? args.kategori : null);
                        this.FormResultKfaComps.FormGroup.patchValue(args);

                        if (args.kategori == 'obat') {
                            this.SelectedObat = args;
                        }
                    }
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-2 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };

        this.FormResultKfaProps = {
            id: 'form_result_kfa',
            fields: [
                {
                    id: 'kode_kfa',
                    label: 'Kode Item KFA',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'produsen',
                    label: 'Produsen',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'nama_dagang',
                    label: 'Nama Dagang',
                    required: false,
                    type: 'text',
                    value: '',
                    readonly: true
                },
                {
                    id: 'code',
                    label: 'Kode Item',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'golongan_obat',
                    label: 'Golongan Obat',
                    required: false,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Obat Bebas', value: 'Obat Bebas' },
                            { name: 'Obat Bebas Terbatas', value: 'Obat Bebas Terbatas' },
                            { name: 'Obat Keras', value: 'Obat Keras' },
                            { name: 'Obat Golongan Narkotika', value: 'Obat Golongan Narkotika' },
                            { name: 'Obat Fitofarmaka', value: 'Obat Fitofarmaka' },
                            { name: 'Obat Herbal Terstandar', value: 'Obat Herbal Terstandar' },
                            { name: 'Obat Herbal', value: 'Obat Herbal' },
                        ],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false,

                    },
                    value: '',
                },
                {
                    id: 'kategori_obat',
                    label: 'Kategori Obat',
                    required: false,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Obat Darurat / Urgensi', value: 'Obat Darurat / Urgensi' },
                            { name: 'Obat High Alert', value: 'Obat High Alert' },
                            { name: 'LASA', value: 'LASA' },
                        ],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false,

                    },
                    value: '',
                },
                {
                    id: 'catatan',
                    label: 'Catatan',
                    required: false,
                    type: 'text',
                    value: '',
                    hidden: true
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormHargaJualProps = {
            id: 'form_harga_jual',
            fields: [
                {
                    id: 'satuan',
                    label: 'Satuan',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [
                            { name: 'Aerosol Metered Dose', value: 'Aerosol Metered Dose' },
                            { name: 'Aerosol Spray', value: 'Aerosol Spray' },
                            { name: 'Blister', value: 'Blister' },
                            { name: 'Botol', value: 'Botol' },
                            { name: 'Cairan Mata', value: 'Cairan Mata' },
                            { name: 'Cairan Steril', value: 'Cairan Steril' },
                            { name: 'Eliksir', value: 'Eliksir' },
                            { name: 'Emulsi', value: 'Emulsi' },
                            { name: 'Enema', value: 'Enema' },
                            { name: 'Gas', value: 'Gas' },
                            { name: 'Gel', value: 'Gel' },
                            { name: 'Gel Mata', value: 'Gel Mata' },
                            { name: 'Granula', value: 'Granula' },
                            { name: 'Implant', value: 'Implant' },
                            { name: 'Infus', value: 'Infus' },
                            { name: 'Intra Uterine Device (IUD)', value: 'Intra Uterine Device (IUD)' },
                            { name: 'Jerigen', value: 'Jerigen' },
                            { name: 'Kaplet', value: 'Kaplet' },
                            { name: 'Kaplet Kunyah', value: 'Kaplet Kunyah' },
                            { name: 'Kaplet Pelepasan Lambat', value: 'Kaplet Pelepasan Lambat' },
                            { name: 'Kaplet Salut Enterik', value: 'Kaplet Salut Enterik' },
                            { name: 'Kaplet Salut Gula', value: 'Kaplet Salut Gula' },
                            { name: 'Kaplet Salut Selaput', value: 'Kaplet Salut Selaput' },
                            { name: 'Kapsul', value: 'Kapsul' },
                            { name: 'Kapsul Lunak', value: 'Kapsul Lunak' },
                            { name: 'Kapsul Pelepasan Lambat', value: 'Kapsul Pelepasan Lambat' },
                            { name: 'Kit', value: 'Kit' },
                            { name: 'Krim', value: 'Krim' },
                            { name: 'Larutan', value: 'Larutan' },
                            { name: 'Larutan Inhalasi', value: 'Larutan Inhalasi' },
                            { name: 'Larutan Injeksi', value: 'Larutan Injeksi' },
                            { name: 'Obat Kumur', value: 'Obat Kumur' },
                            { name: 'Oral Spray', value: 'Oral Spray' },
                            { name: 'Orodispersible Film', value: 'Orodispersible Film' },
                            { name: 'Ovula', value: 'Ovula' },
                            { name: 'Pasang', value: 'Pasang' },
                            { name: 'Pasta', value: 'Pasta' },
                            { name: 'Patch', value: 'Patch' },
                            { name: 'Pessary', value: 'Pessary' },
                            { name: 'Pieces', value: 'Pieces' },
                            { name: 'Salep', value: 'Salep' },
                            { name: 'Salep Mata', value: 'Salep Mata' },
                            { name: 'Sampo', value: 'Sampo' },
                            { name: 'Semprot Hidung', value: 'Semprot Hidung' },
                            { name: 'Serbuk Effervescent', value: 'Serbuk Effervescent' },
                            { name: 'Serbuk Infus', value: 'Serbuk Infus' },
                            { name: 'Serbuk Inhaler', value: 'Serbuk Inhaler' },
                            { name: 'Serbuk Injeksi', value: 'Serbuk Injeksi' },
                            { name: 'Serbuk Injeksi Liofilisasi', value: 'Serbuk Injeksi Liofilisasi' },
                            { name: 'Serbuk Obat Luar / Serbuk Tabur', value: 'Serbuk Obat Luar / Serbuk Tabur' },
                            { name: 'Serbuk Oral', value: 'Serbuk Oral' },
                            { name: 'Set', value: 'Set' },
                            { name: 'Sirup', value: 'Sirup' },
                            { name: 'Sirup Kering', value: 'Sirup Kering' },
                            { name: 'Subdermal Implants', value: 'Subdermal Implants' },
                            { name: 'Supositoria', value: 'Supositoria' },
                            { name: 'Suspensi', value: 'Suspensi' },
                            { name: 'Suspensi / Cairan Obat Luar', value: 'Suspensi / Cairan Obat Luar' },
                            { name: 'Suspensi Inhalasi', value: 'Suspensi Inhalasi' },
                            { name: 'Suspensi Injeksi', value: 'Suspensi Injeksi' },
                            { name: 'Tablet', value: 'Tablet' },
                            { name: 'Tablet Cepat Larut', value: 'Tablet Cepat Larut' },
                            { name: 'Tablet Disintegrasi Oral', value: 'Tablet Disintegrasi Oral' },
                            { name: 'Tablet Dispersibel', value: 'Tablet Dispersibel' },
                            { name: 'Tablet Effervescent', value: 'Tablet Effervescent' },
                            { name: 'Tablet Hisap', value: 'Tablet Hisap' },
                            { name: 'Tablet Kunyah', value: 'Tablet Kunyah' },
                            { name: 'Tablet Pelepasan Lambat', value: 'Tablet Pelepasan Lambat' },
                            { name: 'Tablet Salut Enterik', value: 'Tablet Salut Enterik' },
                            { name: 'Tablet Salut Gula', value: 'Tablet Salut Gula' },
                            { name: 'Tablet Salut Selaput', value: 'Tablet Salut Selaput' },
                            { name: 'Tablet Sublingual', value: 'Tablet Sublingual' },
                            { name: 'Tablet Vaginal', value: 'Tablet Vaginal' },
                            { name: 'Tetes Hidung', value: 'Tetes Hidung' },
                            { name: 'Tetes Mata', value: 'Tetes Mata' },
                            { name: 'Tetes Mata Dan Telinga', value: 'Tetes Mata Dan Telinga' },
                            { name: 'Tetes Oral (Oral Drops)', value: 'Tetes Oral (Oral Drops)' },
                            { name: 'Tetes Telinga', value: 'Tetes Telinga' },
                            { name: 'Topical Spray', value: 'Topical Spray' },
                            { name: 'Tulle/Plester Obat', value: 'Tulle/Plester Obat' },
                            { name: 'Units', value: 'Units' },
                            { name: 'Vaginal Cream', value: 'Vaginal Cream' },
                            { name: 'Vaginal Gel', value: 'Vaginal Gel' }
                        ],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
                {
                    id: 'harga_jual',
                    label: 'Harga Jual',
                    required: true,
                    type: 'number',
                    value: '',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-1 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.KfaKeywordSearch$
            .pipe(
                takeUntil(this.Destroy$),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe((result) => {
                if (result) {
                    this.getAllKfa(result);
                }
            })
    }

    ngOnInit(): void {
        this.getAll({ page: 1, count: 5 });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAll(query: any) {
        this._itemStokService
            .getAll(query)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this.GridProps.dataSource = result.data.rows;
                    this.GridProps.totalRows = result.data.totalRows;
                }
            });
    }

    private getAllKfa(payload: any) {
        this._itemService
            .getAllIcd9(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    const index = this.FormProps.fields.findIndex(item => item.id == 'nama_item');
                    this.FormProps.fields[index].dropdownProps.options = result.data;
                }
            });
    }

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        if (data.id == 'add') {
            this.PageState = 'form';
            this.ButtonNavigation = [];
        };
    }

    handleBackToList() {
        this.FormComps.onResetForm();

        setTimeout(() => {
            this.PageState = 'list';
            this.FormState = 'insert';
            this.ButtonNavigation = [
                {
                    id: 'add',
                    title: 'Tambah',
                    icon: 'pi pi-plus'
                }
            ];
        }, 100);
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onRowDoubleClicked(args: any): void {
        this.PageState = 'form';
        this.FormState = 'update';
        // ** Set value ke Dynamic form components
        setTimeout(() => {
            this.getAllKfa({ kategori: args.kategori == 'OBAT' || args.kategori == 'obat' ? 'obat' : 'alkes', cari: args.nama_item } as any);
            setTimeout(() => {
                this.getDetailItem(args.uuid);
            }, 500);
        }, 100);
    }

    onPageChanged(args: any): void {
        this.getAll({ count: args.rows, page: args.page + 1 });
    }

    private getDetailItem(uuid: string) {
        this._itemService
            .getById(uuid)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    console.log(result.data);

                    result.data.kategori = result.data.kategori == 'OBAT' || result.data.kategori == 'obat' ? 'obat' : 'alkes';

                    this.FormProps.fields[2].dropdownProps.options = [
                        {
                            nama_item: result.data.nama_item
                        }
                    ];

                    this.FormComps.FormGroup.patchValue(result.data);
                    this.FormResultKfaComps.FormGroup.patchValue(result.data);
                    this.FormHargaJualComps.FormGroup.patchValue(result.data);

                    this.Catatan = result.data.catatan;
                    this.IsNotifExp = result.data.is_notf_exp;
                    this.NotifExpDay = result.data.notif_exp_day;
                }
            })
    }

    onToolbarClicked(args: any): void {
        if (args.type == 'delete') {
            this._confirmationService.confirm({
                target: (<any>event).target as EventTarget,
                message: 'Data yang dihapus tidak bisa dikembalikan',
                header: 'Apakah Anda Yakin?',
                icon: 'pi pi-info-circle',
                acceptButtonStyleClass: "p-button-danger p-button-sm",
                rejectButtonStyleClass: "p-button-secondary p-button-sm",
                acceptIcon: "none",
                acceptLabel: 'Iya Saya Yakin',
                rejectIcon: "none",
                rejectLabel: 'Tidak, Kembali',
                accept: () => {
                    this.deleteItem(args.data.uuid);
                }
            });
        }

        if (args.type == 'ubah status') {
            this._confirmationService.confirm({
                target: (<any>event).target as EventTarget,
                message: 'Data akan diubah statusnya',
                header: 'Apakah Anda Yakin?',
                icon: 'pi pi-info-circle',
                acceptButtonStyleClass: "p-button-danger p-button-sm",
                rejectButtonStyleClass: "p-button-secondary p-button-sm",
                acceptIcon: "none",
                acceptLabel: 'Iya Saya Yakin',
                rejectIcon: "none",
                rejectLabel: 'Tidak, Kembali',
                accept: () => {
                    this.updateStatusItem(args.data.uuid);
                }
            });
        }

        if (args.type == 'detail') {
            this.onRowDoubleClicked(args.data);
        }
    }

    saveItem() {
        const payload = {
            ...this.FormComps.FormGroup.value,
            ...this.FormResultKfaComps.FormGroup.value,
            catatan: this.Catatan,
            notif_exp_day: this.NotifExpDay,
            is_notf_exp: this.IsNotifExp,
            ...this.FormHargaJualComps.FormGroup.value
        };

        delete payload.uuid;

        this._store
            .dispatch(new SetupItemActions.CreateItem(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_item.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Disimpan' });
                    this.handleBackToList();
                }
            })
    }

    updateItem() {
        const payload = {
            ...this.FormComps.FormGroup.value,
            ...this.FormResultKfaComps.FormGroup.value,
            catatan: this.Catatan,
            notif_exp_day: this.NotifExpDay,
            is_notf_exp: this.IsNotifExp,
            ...this.FormHargaJualComps.FormGroup.value
        };

        this._store
            .dispatch(new SetupItemActions.UpdateItem(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_item.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Diperbarui' });
                    this.handleBackToList();
                }
            })
    }

    private updateStatusItem(uuid: string) {
        this._store
            .dispatch(new SetupItemActions.UpdateStatusItem(uuid))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_item.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Status Berhasil Diperbarui' });
                    this.handleBackToList();
                }
            })
    }

    private deleteItem(uuid: string) {
        this._store
            .dispatch(new SetupItemActions.DeleteItem(uuid))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_item.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Dihapus' });
                    this.handleBackToList();
                }
            })
    }

}
