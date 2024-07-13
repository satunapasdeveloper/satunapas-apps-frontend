import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogResepNonRacikanComponent } from './dialog-resep-non-racikan/dialog-resep-non-racikan.component';
import { DialogResepRacikanComponent } from './dialog-resep-racikan/dialog-resep-racikan.component';
import { DialogResepManualComponent } from './dialog-resep-manual/dialog-resep-manual.component';

@Component({
    selector: 'app-resep',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DialogResepNonRacikanComponent,
        DialogResepRacikanComponent,
        DialogResepManualComponent,
        ButtonModule,
    ],
    templateUrl: './resep.component.html',
    styleUrl: './resep.component.scss'
})
export class ResepComponent implements OnInit {

    ResepNonRacikan: any[] = [];

    @ViewChild('DialogResepNonRacikanComps') DialogResepNonRacikanComps!: DialogResepNonRacikanComponent;

    ResepRacikan: any[] = [];

    @ViewChild('DialogResepRacikanComps') DialogResepRacikanComps!: DialogResepRacikanComponent;

    ResepManual: any[] = [];

    ngOnInit(): void {

    }


    onFormatAturanPakai(data: any) {
        const aturan_pakai = data.aturan_pakai;

        const waktu_spesifik_pemberian_obat = data.waktu_spesifik_pemberian_obat.join(',');

        const waktu_pemberian_obat = data.waktu_pemberian_obat.join(',');

        return `${aturan_pakai} | ${waktu_spesifik_pemberian_obat} | ${waktu_pemberian_obat}`;
    }

    handleOpenDialogResepNonRacikan(state: 'insert' | 'update', index?: number, data?: any) {
        if (state == 'insert') {
            this.DialogResepNonRacikanComps.handleOpenDialog(state);
        } else {
            this.DialogResepNonRacikanComps.handleOpenDialog(state, index, data);
        }
    }

    handleSaveObatNonRacikan(args: any) {
        if (args.state == 'insert') {
            this.ResepNonRacikan.push(args.data);
        } else {
            this.ResepNonRacikan[args.index] = args.data;
        }
    }

    handleDeleteObatNonRacikan(index: number) {
        this.ResepNonRacikan.splice(index, 1);
    }

    handleOpenDialogResepRacikan(state: 'insert' | 'update', index?: number, data?: any) {
        if (state == 'insert') {
            this.DialogResepRacikanComps.handleOpenDialog(state);
        } else {
            this.DialogResepRacikanComps.handleOpenDialog(state, index, data);
        }
    }


    handleSaveObatRacikan(args: any) {
        if (args.state == 'insert') {
            console.log(args);
            this.ResepRacikan.push(args.data);
        } else {
            this.ResepRacikan[args.index] = args.data;
        }
    }

    handleDeleteObatRacikan(index: number) {
        this.ResepRacikan.splice(index, 1);
    }
}
