import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-tambah-antrian',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        DynamicFormComponent,
        ButtonModule,
    ],
    templateUrl: './tambah-antrian.component.html',
    styleUrl: './tambah-antrian.component.scss'
})
export class TambahAntrianComponent implements OnInit {

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        }
    ];

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    SelectedPasien: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
    ) {
        this.FormProps = {
            id: 'form_tambah_antrean',
            fields: [
                {
                    id: 'id_debitur',
                    label: 'Debitur',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
                {
                    id: 'tgl_kunjungan',
                    label: 'Tanggal Kunjungan',
                    required: true,
                    type: 'date',
                    value: '',
                },
                {
                    id: 'id_poli',
                    label: 'Poli',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
                    },
                    value: '',
                },
                {
                    id: 'id_dokter',
                    label: 'Dokter',
                    required: true,
                    type: 'select',
                    dropdownProps: {
                        options: [],
                        optionName: 'name',
                        optionValue: 'value',
                        autoDisplayFirst: false
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
        const no_rm = this._activatedRoute.snapshot.queryParams['no_rm'];
        console.log("no rekam medis =>", no_rm);

        this.SelectedPasien = JSON.parse(localStorage.getItem('_SPSH_') as any);
        console.log("selected pasien =>", this.SelectedPasien);
    }

    handleBackToList() {
        this._router.navigateByUrl('antrian');
    }
}
