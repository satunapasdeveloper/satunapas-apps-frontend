import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-diagnosis',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        ButtonModule
    ],
    templateUrl: './diagnosis.component.html',
    styleUrl: './diagnosis.component.scss'
})
export class DiagnosisComponent implements OnInit, AfterViewInit, OnDestroy {

    DiagnosaDatasource: any[] = [];

    JenisDiagnosa: any[] = [
        { label: 'Diagnosa Utama / Primer', value: 'Diagnosa Utama / Primer' },
        { label: 'Diagnosa Tambahan / Sekunder', value: 'Diagnosa Tambahan / Sekunder' },
    ];

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const diagnosa = localStorage.getItem('diagnosa');

            if (diagnosa) {
                this.DiagnosaDatasource = JSON.parse(diagnosa);
            } else {
                this.handleAddDiagnosa();
            }
        }, 100);
    }

    handleAddDiagnosa() {
        this.DiagnosaDatasource.push({
            id: 0,
            icd10: '',
            jenis: '',
        })
    };

    handleDeleteDiagnosa(index: number) {
        if (this.DiagnosaDatasource.length > 0) {
            this.DiagnosaDatasource.splice(index, 1);
        }
    }

    ngOnDestroy(): void {
        localStorage.setItem('diagnosa', JSON.stringify(this.DiagnosaDatasource));
    }
}
