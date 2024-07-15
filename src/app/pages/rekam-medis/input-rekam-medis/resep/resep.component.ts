import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ResepComponent implements OnInit, AfterViewInit, OnDestroy {

    ResepNonRacikan: any[] = [];

    @ViewChild('DialogResepNonRacikanComps') DialogResepNonRacikanComps!: DialogResepNonRacikanComponent;

    ResepRacikan: any[] = [];

    @ViewChild('DialogResepRacikanComps') DialogResepRacikanComps!: DialogResepRacikanComponent;

    ResepManual: any[] = [];

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const resep_non_racikan = localStorage.getItem('resep_non_racikan');
            const resep_racikan = localStorage.getItem('resep_racikan');

            if (resep_non_racikan) {
                this.ResepNonRacikan = JSON.parse(resep_non_racikan)
            };

            if (resep_racikan) {
                this.ResepRacikan = JSON.parse(resep_racikan)
            };
        }, 100);
    }

    ngOnDestroy(): void {
        localStorage.setItem('resep_non_racikan', JSON.stringify(this.ResepNonRacikan));
        localStorage.setItem('resep_racikan', JSON.stringify(this.ResepRacikan));
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
            this.ResepRacikan.push(args.data);
        } else {
            this.ResepRacikan[args.index] = args.data;
        }
    }

    handleDeleteObatRacikan(index: number) {
        this.ResepRacikan.splice(index, 1);
    }
}
