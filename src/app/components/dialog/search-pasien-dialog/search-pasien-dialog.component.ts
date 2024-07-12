import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-search-pasien-dialog',
    standalone: true,
    imports: [
        DialogModule,
        CommonModule,
        ButtonModule,
        InputTextModule
    ],
    templateUrl: './search-pasien-dialog.component.html',
    styleUrl: './search-pasien-dialog.component.scss'
})
export class SearchPasienDialogComponent {

    @Output('onSelect') onSelect = new EventEmitter<any>();

    ShowDialog: boolean = false;

    DataPasien: any[] = [];

    constructor() { }

    handleSearch(keyword: string) {
        const data: any[] = [
            {
                id: 1,
                no_rekam_medis: '112233',
                nama_lengkap: 'John Doe',
                no_identitas: '3374100408970001',
                alamat: 'Jalan Indonesia Raya 1',
            },
            {
                id: 2,
                no_rekam_medis: '112234',
                nama_lengkap: 'Jane Doe',
                no_identitas: '3374100408970002',
                alamat: 'Jalan Indonesia Raya 3',
            },
            {
                id: 3,
                no_rekam_medis: '112235',
                nama_lengkap: 'Lorem Ipsum',
                no_identitas: '3374100408970003',
                alamat: 'Jalan Indonesia Raya 2',
            },
        ];

        if (keyword.length) {
            this.DataPasien = data.filter(item => item.nama_lengkap.toLowerCase().includes(keyword.toLowerCase()));
        } else {
            this.DataPasien = [];
        }
    }

    handleSelectPasien(data: any) {
        this.onSelect.emit(data);
        this.ShowDialog = false;
    }
}
