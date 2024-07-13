import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/dynamic-form/dynamic-form.component';
import { FormModel } from 'src/app/model/components/form.model';

@Component({
    selector: 'app-anamesis',
    standalone: true,
    imports: [
        DynamicFormComponent
    ],
    templateUrl: './anamesis.component.html',
    styleUrl: './anamesis.component.scss'
})
export class AnamesisComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    FormState: 'insert' | 'update' = 'insert';
    FormProps: FormModel.IForm;
    @ViewChild('FormComps') FormComps!: DynamicFormComponent;

    constructor() {
        this.FormProps = {
            id: 'form_anamesis_rekam_medis',
            fields: [
                {
                    id: 'keluhan_utama',
                    label: 'Keluhan Utama',
                    required: true,
                    type: 'textarea',
                    textareaRow: 3,
                    value: '',
                },
                {
                    id: 'riwayat_penyakit',
                    label: 'Riwayat Penyakit',
                    required: true,
                    type: 'textarea',
                    textareaRow: 3,
                    value: '',
                },
                {
                    id: 'is_ada_riwayat_penyakit_terdahulu',
                    label: 'Ada Riwayat Penyakit Terdahulu',
                    required: false,
                    type: 'switch',
                    hideLabel: true,
                    value: false,
                    onChange: (args: any) => {
                        if (args.checked) {
                            this.FormProps.fields[3].hidden = false;
                        } else {
                            this.FormProps.fields[3].hidden = true;
                        }
                    }
                },
                {
                    id: 'keterangan_ada_riwayat_penyakit_terdahulu',
                    label: 'Ada Riwayat Penyakit Terdahulu',
                    required: false,
                    type: 'textarea',
                    textareaRow: 2,
                    hideLabel: true,
                    value: "",
                    hidden: true,
                },
                {
                    id: 'is_ada_riwayat_alergi',
                    label: 'Ada Riwayat Alergi',
                    required: false,
                    type: 'switch',
                    hideLabel: true,
                    value: false,
                    onChange: (args: any) => {
                        if (args.checked) {
                            this.FormProps.fields[5].hidden = false;
                        } else {
                            this.FormProps.fields[5].hidden = true;
                        }
                    }
                },
                {
                    id: 'keterangan_ada_riwayat_alergi',
                    label: 'Ada Riwayat Alergi',
                    required: false,
                    type: 'textarea',
                    textareaRow: 2,
                    hideLabel: true,
                    value: "",
                    hidden: true,
                },
                {
                    id: 'is_ada_riwayat_pengobatan',
                    label: 'Ada Riwayat Pengobatan',
                    required: false,
                    type: 'switch',
                    hideLabel: true,
                    value: false,
                    onChange: (args: any) => {
                        if (args.checked) {
                            this.FormProps.fields[7].hidden = false;
                            this.FormProps.class = 'grid-rows-8 grid-cols-1';
                        } else {
                            this.FormProps.fields[7].hidden = true;
                            this.FormProps.class = 'grid-rows-7 grid-cols-1';
                        }
                    }
                },
                {
                    id: 'keterangan_ada_riwayat_pengobatan',
                    label: 'Ada Riwayat Pengobatan',
                    required: false,
                    type: 'textarea',
                    textareaRow: 2,
                    hideLabel: true,
                    value: "",
                    hidden: true,
                },
            ],
            style: 'not_inline',
            class: 'grid-rows-6 grid-cols-1',
            state: 'write',
            defaultValue: null,
        };
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const data: any = localStorage.getItem('anamesis');
            if (data) {
                this.FormComps.FormGroup.setValue(JSON.parse(data));
            }
        }, 100);
    }

    ngOnDestroy(): void {
        localStorage.setItem("anamesis", JSON.stringify(this.FormComps.FormGroup.value));

        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
