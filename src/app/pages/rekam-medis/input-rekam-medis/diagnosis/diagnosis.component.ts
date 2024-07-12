import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class DiagnosisComponent implements OnInit {

    DiagnosaDatasource: any[] = [];

    JenisDiagnosa: any[] = [
        { label: 'Diagnosa Utama / Primer', value: 'Diagnosa Utama / Primer' },
        { label: 'Diagnosa Tambahan / Sekunder', value: 'Diagnosa Tambahan / Sekunder' },
    ];

    constructor() { }

    ngOnInit(): void {
        this.handleAddDiagnosa();
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
}
