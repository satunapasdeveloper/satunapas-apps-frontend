import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormPilihPasienForDokumenComponent } from 'src/app/components/form/form-pilih-pasien-for-dokumen/form-pilih-pasien-for-dokumen.component';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { RiwayatRekamMedisComponent } from '../../rekam-medis/riwayat-rekam-medis/riwayat-rekam-medis.component';
import { Store } from '@ngxs/store';
import { RekamMedisActions } from 'src/app/store/rekam-medis';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-resume-medis',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        FormPilihPasienForDokumenComponent,
        RiwayatRekamMedisComponent,
    ],
    templateUrl: './resume-medis.component.html',
    styleUrl: './resume-medis.component.scss'
})
export class ResumeMedisComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'cetak',
            title: `Cetak`,
            icon: 'pi pi-print'
        }
    ];

    ShowRiwayatRekamMedis = false;

    constructor(
        private _store: Store,
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(args: any) {
        console.log(args);
    }

    handleChooseRiwayatKunjungan(args: any) {
        this._store
            .dispatch(new RekamMedisActions.GetResumeMedis(args.id_pendaftaran))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.rekam_medis.success) {
                    this.ShowRiwayatRekamMedis = true;
                }
            });
    }
}
