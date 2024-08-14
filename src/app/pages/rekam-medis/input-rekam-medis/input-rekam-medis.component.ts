import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { RekamMedisActions } from 'src/app/store/rekam-medis';
import { Subject, takeUntil } from 'rxjs';
import { PaymentComponent } from './payment/payment.component';

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
        PaymentComponent
    ],
    templateUrl: './input-rekam-medis.component.html',
    styleUrl: './input-rekam-medis.component.scss'
})
export class InputRekamMedisComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'back',
            title: 'Kembali',
            icon: 'pi pi-chevron-left'
        }
    ];

    SelectedPasien: any;

    @ViewChild('AnamesisComps') AnamesisComps!: AnamesisComponent;

    @ViewChild('PemeriksaanFisikComps') PemeriksaanFisikComps!: PemeriksaanFisikComponent;

    @ViewChild('DiagnosisComps') DiagnosisComps!: DiagnosisComponent;

    @ViewChild('PaymentComps') PaymentComps!: PaymentComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _rekamMedisService: RekamMedisService,
    ) { }

    ngOnInit(): void {
        this.getById(this._activatedRoute.snapshot.queryParams['id']);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getById(id_pendaftaran: string) {
        this._store
            .dispatch(new RekamMedisActions.GetByIdRekamMedis(id_pendaftaran))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log("detail rekam medis =>", result);
            })
    }

    handleBackToList() {
        this._router.navigateByUrl('antrian');
    }

    handleCreateAnamesis(nextCallback: any) {
        let payload = this.AnamesisComps.FormComps.FormGroup.value;
        delete payload.is_ada_riwayat_alergi;
        delete payload.is_ada_riwayat_pengobatan;
        delete payload.is_ada_riwayat_penyakit_terdahulu;

        this._store
            .dispatch(new RekamMedisActions.CreateAnamesis(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.rekam_medis.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Disimpan' });

                    setTimeout(() => {
                        nextCallback.emit();
                    }, 500);
                }
            });
    }

    handleCreatePemeriksaanFisik(nextCallback: any) {
        let payload = {
            ...this.PemeriksaanFisikComps.FormComps.FormGroup.value,
            ...this.PemeriksaanFisikComps.FormKeadaanUmumComps.FormGroup.value,
            ...this.PemeriksaanFisikComps.FormVitalSignComps.FormGroup.value,
            kondisi_tubuh: this.PemeriksaanFisikComps.CatatanKondisiTubuh$.value
        };

        this._store
            .dispatch(new RekamMedisActions.CreatePemeriksaanFisik(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.rekam_medis.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Disimpan' });

                    setTimeout(() => {
                        nextCallback.emit();
                    }, 500);
                }
            });
    }

    handleCreateDiagnosa(nextCallback: any) {
        let payload = {
            diagnosisi: this.DiagnosisComps.DiagnosaDatasource
        };

        this._store
            .dispatch(new RekamMedisActions.CreateDiagnosa(payload))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.rekam_medis.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data Berhasil Disimpan' });

                    setTimeout(() => {
                        nextCallback.emit();
                    }, 500);
                }
            });
    }
}
