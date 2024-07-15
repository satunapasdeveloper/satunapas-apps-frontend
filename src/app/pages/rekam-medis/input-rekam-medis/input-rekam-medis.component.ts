import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { AnamesisComponent } from './anamesis/anamesis.component'
import { PemeriksaanFisikComponent } from './pemeriksaan-fisik/pemeriksaan-fisik.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { TindakanComponent } from './tindakan/tindakan.component';
import { ResepComponent } from './resep/resep.component';
import { StatusComponent } from './status/status.component';
import { BillingComponent } from './billing/billing.component';
import { InformasiPasienComponent } from './informasi-pasien/informasi-pasien.component';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-input-rekam-medis',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        StepperModule,
        ButtonModule,
        AnamesisComponent,
        PemeriksaanFisikComponent,
        InformasiPasienComponent,
        DiagnosisComponent,
        TindakanComponent,
        ResepComponent,
        StatusComponent,
        BillingComponent,
        DialogModule,
    ],
    templateUrl: './input-rekam-medis.component.html',
    styleUrl: './input-rekam-medis.component.scss'
})
export class InputRekamMedisComponent {

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        }
    ];

    SelectedPasien: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _rekamMedisService: RekamMedisService,
    ) { }

    ngOnInit(): void {
        const no_rm = this._activatedRoute.snapshot.queryParams['no_rm'];
        console.log("no rekam medis =>", no_rm);

        this.SelectedPasien = JSON.parse(localStorage.getItem('_SPSH_') as any);
        console.log("selected pasien =>", this.SelectedPasien);
    }

    handleBackToList() {
        this._router.navigateByUrl('antrian');
    }
}
