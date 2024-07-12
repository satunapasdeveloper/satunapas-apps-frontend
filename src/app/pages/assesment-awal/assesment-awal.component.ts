import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-assesment-awal',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        DynamicFormComponent,
        ButtonModule,
    ],
    templateUrl: './assesment-awal.component.html',
    styleUrl: './assesment-awal.component.scss'
})
export class AssesmentAwalComponent implements OnInit {

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

    FormKeadaanUmumProps: FormModel.IForm;
    @ViewChild('FormKeadaanUmumComps') FormKeadaanUmumComps!: DynamicFormComponent;

    FormVitalSignProps: FormModel.IForm;
    @ViewChild('FormVitalSignComps') FormVitalSignComps!: DynamicFormComponent;

    SelectedPasien: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
    ) {
        this.FormProps = {
            id: 'form_assesment_pasien',
            fields: [
                {
                    id: 'tingkat_kesadaran',
                    label: 'Tingkat Kesadaran',
                    required: true,
                    type: 'radio',
                    radioButtonProps: [
                        {
                            name: 'tingkat_kesadaran',
                            label: 'Sadar Penuh',
                            value: 'Sadar Penuh'
                        },
                        {
                            name: 'tingkat_kesadaran',
                            label: 'Tampak Mengantuk / Gelisah Bicara Tidak Jelas',
                            value: 'Tampak Mengantuk / Gelisah Bicara Tidak Jelas'
                        },
                        {
                            name: 'tingkat_kesadaran',
                            label: 'Tidak Sadar',
                            value: 'Tidak Sadar'
                        },
                    ],
                    value: 'Sadar Penuh',
                },
                {
                    id: 'pernafasan',
                    label: 'Pernafasan',
                    required: true,
                    type: 'radio',
                    radioButtonProps: [
                        {
                            name: 'pernafasan',
                            label: 'Nafas Normal',
                            value: 'Nafas Normal'
                        },
                        {
                            name: 'pernafasan',
                            label: 'Tampak Sesak',
                            value: 'Tampak Sesak'
                        },
                        {
                            name: 'pernafasan',
                            label: 'Tidak Bernafas',
                            value: 'Tidak Bernafas'
                        },
                    ],
                    value: 'Nafas Normal',
                },
                {
                    id: 'resiko_jatuh',
                    label: 'Risiko Jatuh',
                    required: true,
                    type: 'radio',
                    radioButtonProps: [
                        {
                            name: 'resiko_jatuh',
                            label: 'Risiko Rendah',
                            value: 'Risiko Rendah'
                        },
                        {
                            name: 'resiko_jatuh',
                            label: 'Risiko Sedang',
                            value: 'Risiko Sedang'
                        },
                        {
                            name: 'resiko_jatuh',
                            label: 'Risiko Tinggi',
                            value: 'Risiko Tinggi'
                        },
                    ],
                    value: 'Risiko Rendah',
                },
                {
                    id: 'skala_nyeri',
                    label: 'Skala Nyeri',
                    required: true,
                    type: 'radio',
                    radioButtonProps: [
                        {
                            name: 'skala_nyeri',
                            label: 'Skor 1-3 (Nyeri Ringan)',
                            value: 'Skor 1-3 (Nyeri Ringan)'
                        },
                        {
                            name: 'skala_nyeri',
                            label: 'Skor 4-7 (Nyeri Sedang)',
                            value: 'Skor 4-7 (Nyeri Sedang)'
                        },
                        {
                            name: 'skala_nyeri',
                            label: 'Skor 8-10 (Nyeri Berat)',
                            value: 'Skor 8-10 (Nyeri Berat)'
                        },
                    ],
                    value: 'Skor 1-3 (Nyeri Ringan)',
                },
                {
                    id: 'batuk',
                    label: 'Batuk',
                    required: true,
                    type: 'radio',
                    radioButtonProps: [
                        {
                            name: 'batuk',
                            label: 'Tidak Ada / <2 Minggu',
                            value: 'Tidak Ada / <2 Minggu'
                        },
                        {
                            name: 'batuk',
                            label: '>= 2 Minggu',
                            value: '>= 2 Minggu'
                        }
                    ],
                    value: 'Tidak Ada / <2 Minggu',
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-5 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };

        this.FormKeadaanUmumProps = {
            id: 'form_keadaan_umum',
            fields: [
                {
                    id: 'tinggi_badan',
                    label: 'Tinggi Badan (cm)',
                    required: true,
                    type: 'number',
                    value: 0,
                },
                {
                    id: 'berat_badan',
                    label: 'Berat Badan (kg)',
                    required: true,
                    type: 'number',
                    value: 0,
                }
            ],
            style: 'not_inline',
            class: 'grid-rows-1 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };

        this.FormVitalSignProps = {
            id: 'form_vital_sign',
            fields: [
                {
                    id: 'sistole',
                    label: 'Sistole (mm/Hg)',
                    required: true,
                    type: 'number',
                    value: 0,
                },
                {
                    id: 'diastole',
                    label: 'Diastole (mm/Hg)',
                    required: true,
                    type: 'number',
                    value: 0,
                },
                {
                    id: 'spo2',
                    label: 'SpO2 (%)',
                    required: false,
                    type: 'number',
                    value: 0,
                },
                {
                    id: 'suhu_tubuh',
                    label: 'Suhu Tubuh (°C)',
                    required: true,
                    type: 'number',
                    value: 0,
                },
                {
                    id: 'denyut_nadi',
                    label: 'Denyut Nadi (/menit)',
                    required: true,
                    type: 'number',
                    value: 0,
                },
                {
                    id: 'pernafasan',
                    label: 'Pernafasan (/menit)',
                    required: true,
                    type: 'number',
                    value: 0,
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-3 grid-cols-2',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.queryParams['id'];
        console.log("no id medis =>", id);

        this.SelectedPasien = JSON.parse(localStorage.getItem('_SPSH_') as any);
        console.log("selected pasien =>", this.SelectedPasien);
    }

    handleBackToList() {
        this._router.navigateByUrl('antrian');
    }
}
