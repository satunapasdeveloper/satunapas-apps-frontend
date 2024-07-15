import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'app-tindakan',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        InputSwitchModule,
        DropdownModule,
        CalendarModule
    ],
    templateUrl: './tindakan.component.html',
    styleUrl: './tindakan.component.scss'
})
export class TindakanComponent implements OnInit, AfterViewInit, OnDestroy {

    FormTindakan: FormGroup;

    PetugasDatasource: any[] = [
        {
            value: 1,
            label: 'Frey Blake'
        },
        {
            value: 2,
            label: 'Anastasia'
        },
    ];

    TindakanMedisDatasource: any[] = [
        {
            nama_tindakan_medis: 'Jahitan',
            nama_tindakan_icd_9: 'Part Gastrec W Jej Anast',
            harga_satuan: 30000,
            status_active: true
        },
        {
            nama_tindakan_medis: 'USG',
            nama_tindakan_icd_9: 'Therap Ultrasound Periphrl V (Begin 2002)',
            harga_satuan: 300000,
            status_active: true
        },
    ];

    TindakanForSave: any[] = [];

    BmhpDatasource: any[] = [];

    BmhpForSave: any[] = [];

    constructor(
        private _formBuilder: FormBuilder,
    ) {
        this.FormTindakan = this._formBuilder.group({
            is_ada_kie: [false, []],
            keterangan_kie: ['', []],
            is_ada_tindakan: [false, []],
            tanggal_tindakan: [new Date(), []],
            waktu_tindakan: [new Date(), []],
            tindakan: [[], []],
            bmhp: [[], []]
        })
    };

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const form_tindakan = localStorage.getItem('form_tindakan');
            const tindakan = localStorage.getItem('tindakan');
            const bmhp = localStorage.getItem('bmhp');

            if (form_tindakan) {
                let data = JSON.parse(form_tindakan);
                data.tanggal_tindakan = new Date(data.tanggal_tindakan);
                data.waktu_tindakan = new Date(data.waktu_tindakan);

                this.FormTindakan.patchValue(data);
            };

            if (tindakan) {
                this.TindakanForSave = JSON.parse(tindakan);
            } else {
                this.handleAddTindakan();
            }

            if (bmhp) {
                this.BmhpForSave = JSON.parse(bmhp);
            };
        }, 100);
    }

    ngOnDestroy(): void {
        localStorage.setItem('form_tindakan', JSON.stringify(this.FormTindakan.value));
        localStorage.setItem('tindakan', JSON.stringify(this.TindakanForSave));
        localStorage.setItem('bmhp', JSON.stringify(this.BmhpForSave));
    }

    handleAddTindakan() {
        this.TindakanForSave.push({
            id: this.TindakanForSave.length + 1,
            nama_tindakan_medis: '',
            petugas: 0,
            qty: 0,
            harga_satuan: 0,
            total: 0
        });
    }

    handleDeleteTindakan(index: number) {
        if (this.TindakanForSave.length > 1) {
            this.TindakanForSave.splice(index, 1);
        }
    }

    handleAddBmhp() {
        this.BmhpForSave.push({
            id: this.BmhpForSave.length + 1,
            nama_item: '',
            qty: 0,
            harga_satuan: 0,
            total: 0
        });
    }

    handleDeleteBmhp(index: number) {
        if (this.BmhpForSave.length > 1) {
            this.BmhpForSave.splice(index, 1);
        }
    }

    get is_ada_kie(): AbstractControl {
        return this.FormTindakan.get('is_ada_kie') as AbstractControl
    }

    get keterangan_kie(): AbstractControl {
        return this.FormTindakan.get('keterangan_kie') as AbstractControl
    }

    get is_ada_tindakan(): AbstractControl {
        return this.FormTindakan.get('is_ada_tindakan') as AbstractControl
    }

    get tindakan(): AbstractControl {
        return this.FormTindakan.get('tindakan') as AbstractControl
    }

    get bmhp(): AbstractControl {
        return this.FormTindakan.get('bmhp') as AbstractControl
    }
}
