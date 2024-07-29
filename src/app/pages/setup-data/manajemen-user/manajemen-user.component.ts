import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subject, BehaviorSubject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { GridModel } from 'src/app/model/components/grid.model';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { ManajemenUserService } from 'src/app/services/setup-data/manajemen-user.service';
import { ManajemenUserActions, ManajemenUserState } from 'src/app/store/setup-data/manajemen-user';
import { SetupPoliState } from 'src/app/store/setup-data/setup-poli';

@Component({
    selector: 'app-manajemen-user',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        GridComponent,
        DynamicFormComponent,
        ButtonModule,
        ConfirmDialogModule
    ],
    templateUrl: './manajemen-user.component.html',
    styleUrl: './manajemen-user.component.scss'
})
export class ManajemenUserComponent implements OnInit, OnDestroy {

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
        id: 'Setup_User',
        column: [
            { field: 'nik', headerName: 'NIK', class: 'font-semibold' },
            { field: 'nama', headerName: 'Nama Lengkap', },
            { field: 'jenis_kelamin', headerName: 'Gender', },
            { field: 'role', headerName: 'Role', },
            { field: 'poli', headerName: 'Nama Poli', },
            { field: 'is_active', headerName: 'Status Aktif', renderAsCheckbox: true, class: 'text-center' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        toolbar: ['Delete', "Ubah Status", 'Detail'],
        showPaging: true,
        showSearch: true,
        searchKeyword: 'nama_User',
        searchPlaceholder: 'Cari Nama User Disini'
    };
    GridSelectedData: any;

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    KfaKeywordSearch$ = new BehaviorSubject(null);

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _manajemenUserService: ManajemenUserService,
    ) {
        this.FormProps = {
            id: 'form_manajemen_user',
            fields: [
                {
                    id: 'nama',
                    label: 'Nama Lengkap',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'nik',
                    label: 'No. Identitas',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'no_hp',
                    label: 'No. Handphone',
                    required: false,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'tanggal_lahir',
                    label: 'Tgl. Lahir',
                    required: false,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'jenis_kelamin',
                    label: 'Gender',
                    required: false,
                    type: 'radio',
                    radioButtonProps: [
                        {
                            name: 'jenis_kelamin',
                            label: 'Laki - Laki',
                            value: 'LAKI - LAKI'
                        },
                        {
                            name: 'jenis_kelamin',
                            label: 'Perempuan',
                            value: 'PEREMPUAN'
                        },
                    ],
                    value: '',
                },
                {
                    id: 'id_role',
                    label: 'Role',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'role',
                        optionValue: 'id_role',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
                {
                    id: 'id_poli',
                    label: 'Nama Poli',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'poli',
                        optionValue: 'id_poli',
                        autoDisplayFirst: false,
                        customField: {
                            title: 'poli',
                            subtitle: 'kode_poli',
                            footer: {
                                label: 'Tambah Poli',
                                method: () => { this._router.navigateByUrl('setup-data/setup-poli') }
                            }
                        }
                    },
                    value: '',
                },
                {
                    id: 'username',
                    label: 'Username',
                    required: true,
                    type: 'text',
                    value: '',
                },
                {
                    id: 'password',
                    label: 'Password',
                    required: true,
                    type: 'password',
                    value: '',
                    hidden: false
                },
                {
                    id: 'uuid',
                    label: 'UUID',
                    hidden: true,
                    required: false,
                    type: 'text',
                    value: "",
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-5 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        this.getAll();
        this.getAllRole();
        this.getAllPoli();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAll() {
        this._store
            .select(ManajemenUserState.allUserEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    console.log("get data from manajemen user =>", result);
                    this.GridProps.dataSource = result;
                }
            });
    }

    private getAllPoli() {
        this._store
            .select(SetupPoliState.poliEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    const index = this.FormProps.fields.findIndex(item => item.id == 'id_poli');
                    this.FormProps.fields[index].dropdownProps.options = result;
                }
            });
    }

    private getAllRole() {
        this._manajemenUserService
            .getAllRole()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    const index = this.FormProps.fields.findIndex(item => item.id == 'id_role');
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
            const index = this.FormProps.fields.findIndex(item => item.id == 'password');
            this.FormProps.fields[index].hidden = false;

            this.FormProps.class = 'grid-rows-5 grid-cols-2';

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
        const index = this.FormProps.fields.findIndex(item => item.id == 'password');
        this.FormProps.fields[index].hidden = true;

        this.FormProps.class = 'grid-rows-4 grid-cols-2';

        this.PageState = 'form';
        this.FormState = 'update';
        this.ButtonNavigation = [];
        // ** Set value ke Dynamic form components
        setTimeout(() => {
            setTimeout(() => {
                this.FormComps.FormGroup.patchValue({
                    ...args,
                    tanggal_lahir: new Date(args.tanggal_lahir)
                });
            }, 500);
        }, 100);
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
                    this.deleteUser(args.data.uuid);
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
                    this.updateStatusUser(args.data.uuid);
                }
            });
        }

        if (args.type == 'detail') {
            this.onRowDoubleClicked(args.data);
        }
    }

    saveUser(data: any) {
        this._store
            .dispatch(new ManajemenUserActions.CreateUser(data))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_User.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Disimpan' });
                    this.handleBackToList();
                }
            })
    }

    updateUser(data: any) {
        this._store
            .dispatch(new ManajemenUserActions.UpdateUser(data))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_User.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Diperbarui' });
                    this.handleBackToList();
                }
            })
    }

    private updateStatusUser(uuid: string) {
        this._store
            .dispatch(new ManajemenUserActions.UpdateStatusUser(uuid))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_User.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Status Berhasil Diperbarui' });
                    this.handleBackToList();
                }
            })
    }

    private deleteUser(uuid: string) {
        this._store
            .dispatch(new ManajemenUserActions.DeleteUser(uuid))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.setup_User.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Data Berhasil Dihapus' });
                    this.handleBackToList();
                }
            })
    }

}
