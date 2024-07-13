import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';

@Component({
    selector: 'app-dialog-resep-non-racikan',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        ButtonModule,
    ],
    templateUrl: './dialog-resep-non-racikan.component.html',
    styleUrl: './dialog-resep-non-racikan.component.scss'
})
export class DialogResepNonRacikanComponent implements OnInit {

    ShowDialog = false;

    @ViewChild('DropdownObatComps') DropdownObatComps!: Dropdown;

    ObatDatasource: any[] = [
        {
            id: 1,
            nama_obat: 'Paracetamol 250 mg Sirup (OBAPA) x 1',
            harga: 12000
        }
    ];

    SelectedObat: any;

    WaktuPemberianObat: any[] = this._rekamMedisService.WaktuPemberianObat;

    WaktuSpesifikPemberianObat: any[] = this._rekamMedisService.WaktuSpesifikPemberianObat;

    RutePemberianObat: any[] = this._rekamMedisService.RutePemberianObat;

    FormState: 'insert' | 'update' = 'insert';

    FormResep: FormGroup;

    @Output('onSave') onSave = new EventEmitter<any>();

    ObatEditedIndex: number = 0;

    constructor(
        private _formBuilder: FormBuilder,
        private _rekamMedisService: RekamMedisService
    ) {
        this.FormResep = this._formBuilder.group({
            nama_obat: ['', []],
            qty: [0, []],
            total: [0, []],
            aturan_pakai: ["", []],
            waktu_pemberian_obat: [[], []],
            waktu_spesifik_pemberian_obat: [[], []],
            rute_pemberian_obat: ["", []],
        });
    }

    ngOnInit(): void {

    }

    handleOpenDialog(state: 'insert' | 'update', index?: number, data?: any) {
        this.FormState = state;

        if (state == 'update') {
            this.FormResep.setValue(data);
            this.ObatEditedIndex = index!;
        } else {
            this.FormResep.reset();
            this.ObatEditedIndex = 0;
            this.FormResep = this._formBuilder.group({
                nama_obat: ['', []],
                qty: [0, []],
                total: [0, []],
                aturan_pakai: ["", []],
                waktu_pemberian_obat: [[], []],
                waktu_spesifik_pemberian_obat: [[], []],
                rute_pemberian_obat: ["", []],
            });

            setTimeout(() => {
                this.DropdownObatComps.clear();
            }, 100);
        }

        this.ShowDialog = true;
    }

    handleCloseDialog() {
        this.ShowDialog = false;
    }

    handleChangeObat(args: any) {
        if (args.value) {
            this.SelectedObat = args.value;
            this.FormResep.get('qty')?.setValue(1);
            this.FormResep.get('total')?.setValue(args.value.harga);
            this.FormResep.get('nama_obat')?.setValue(args.value.nama_obat);
        }
    }

    handleChangeQty(args: any) {
        const qty = this.FormResep.get('qty')?.value;

        if (qty > 1) {
            this.FormResep.get('total')?.setValue(qty * this.SelectedObat.harga);
        }
    }

    handleSave(data: any) {
        if (this.FormResep.valid) {
            this.onSave.emit({ state: this.FormState, index: this.ObatEditedIndex, data: data });
            this.handleCloseDialog();
        }
    }
}
