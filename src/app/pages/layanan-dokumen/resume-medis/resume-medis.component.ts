import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormPilihPasienForDokumenComponent } from 'src/app/components/form/form-pilih-pasien-for-dokumen/form-pilih-pasien-for-dokumen.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';

@Component({
    selector: 'app-resume-medis',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        FormPilihPasienForDokumenComponent
    ],
    templateUrl: './resume-medis.component.html',
    styleUrl: './resume-medis.component.scss'
})
export class ResumeMedisComponent implements OnInit {

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'cetak',
            title: `Cetak`,
            icon: 'pi pi-print'
        }
    ];

    constructor() { }

    ngOnInit(): void {

    }

    handleClickButtonNavigation(args: any) {
        console.log(args);
    }
}
