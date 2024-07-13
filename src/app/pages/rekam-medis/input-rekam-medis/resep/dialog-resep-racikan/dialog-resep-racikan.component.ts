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
    selector: 'app-dialog-resep-racikan',
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
    templateUrl: './dialog-resep-racikan.component.html',
    styleUrl: './dialog-resep-racikan.component.scss'
})
export class DialogResepRacikanComponent implements OnInit {

    ShowDialog = false;

    @ViewChild('DropdownObatComps') DropdownObatComps!: Dropdown;

    ObatRacikans: any[] = [];

    ObatDatasource: any[] = [
        {
            id: 1,
            nama_obat: 'Paracetamol 250 mg Sirup (OBAPA)',
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
            nama_racikan: ['', []],
            obats: [[], []],
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
            this.ObatRacikans = data.obats;
            this.ObatEditedIndex = index!;
        } else {
            this.FormResep.reset();
            this.ObatEditedIndex = 0;
            this.FormResep = this._formBuilder.group({
                nama_racikan: ['', []],
                aturan_pakai: ["", []],
                waktu_pemberian_obat: [[], []],
                waktu_spesifik_pemberian_obat: [[], []],
                rute_pemberian_obat: ["", []],
            });

            setTimeout(() => {
                this.ObatRacikans = [];
            }, 100);
        }

        this.ShowDialog = true;
    }

    handleCloseDialog() {
        this.ShowDialog = false;
    }

    handleAddObat() {
        this.ObatRacikans.push({
            nama_obat: "",
            qty: 0,
            harga: 0,
            total: 0
        })
    }

    handleDeleteObat(index: number) {
        this.ObatRacikans.splice(index, 1);
    }

    handleChangeObat(args: any, index: number) {
        if (args.value) {
            this.ObatRacikans[index].nama_obat = args.value.nama_obat;
            this.ObatRacikans[index].qty = 1;
            this.ObatRacikans[index].harga = args.value.harga;
            this.ObatRacikans[index].total = args.value.harga;
        }
    }

    handleChangeQty(args: any, index: number) {
        if (parseInt(args.target.value) > 0) {
            this.ObatRacikans[index].qty = parseInt(args.target.value);
            this.ObatRacikans[index].total = parseInt(args.target.value) * this.ObatRacikans[index].harga;
        }
    }

    handleSave(data: any) {
        if (this.FormResep.valid) {
            data.obats = this.ObatRacikans;
            this.onSave.emit({ state: this.FormState, index: this.ObatEditedIndex, data: data });
            this.handleCloseDialog();
        }
    }
}
