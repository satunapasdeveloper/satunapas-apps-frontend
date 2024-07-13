import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { FormModel } from 'src/app/model/components/form.model';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';

@Component({
    selector: 'app-pemeriksaan-fisik',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        DynamicFormComponent,
        FormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule
    ],
    templateUrl: './pemeriksaan-fisik.component.html',
    styleUrl: './pemeriksaan-fisik.component.scss'
})
export class PemeriksaanFisikComponent implements OnInit, AfterViewInit, OnDestroy {

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    FormKeadaanUmumProps: FormModel.IForm;
    @ViewChild('FormKeadaanUmumComps') FormKeadaanUmumComps!: DynamicFormComponent;

    FormVitalSignProps: FormModel.IForm;
    @ViewChild('FormVitalSignComps') FormVitalSignComps!: DynamicFormComponent;

    BodyParts: any[] = this._rekamMedisService.BodyParts;

    CatatanKondisiTubuh: any[] = [];

    constructor(
        private _rekamMedisService: RekamMedisService
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
        this.handleAddCatatanTubuh();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const pemeriksaan_fisik = localStorage.getItem('pemeriksaan_fisik') as any;
            if (pemeriksaan_fisik) {
                this.FormComps.FormGroup.setValue(JSON.parse(pemeriksaan_fisik).assesment_awal);
                this.FormKeadaanUmumComps.FormGroup.setValue(JSON.parse(pemeriksaan_fisik).keadaan_umum);
                this.FormVitalSignComps.FormGroup.setValue(JSON.parse(pemeriksaan_fisik).vital_sign);
                this.CatatanKondisiTubuh = JSON.parse(pemeriksaan_fisik).catatan_tubuh;
            }
        }, 100);
    }

    ngOnDestroy(): void {
        const pemeriksaan_fisik = {
            assesment_awal: this.FormComps.FormGroup.value,
            keadaan_umum: this.FormVitalSignComps.FormGroup.value,
            vital_sign: this.FormVitalSignComps.FormGroup.value,
            catatan_tubuh: this.CatatanKondisiTubuh
        }

        localStorage.setItem('pemeriksaan_fisik', JSON.stringify(pemeriksaan_fisik));
    }

    handleAddCatatanTubuh() {
        this.CatatanKondisiTubuh.push({
            id: 0,
            label: '',
            body: '',
            keterangan: ''
        })
    };

    handleDeleteCatatanTubuh(index: number) {
        if (this.CatatanKondisiTubuh.length > 0) {
            this.CatatanKondisiTubuh.splice(index, 1);
        }
    }
}   
