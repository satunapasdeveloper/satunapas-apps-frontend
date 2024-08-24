import { CommonModule, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { PasienModel } from 'src/app/model/pages/pasien/pasien.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PasienService } from 'src/app/services/pasien/pasien.service';
import { RekamMedisState } from 'src/app/store/rekam-medis';

@Component({
    selector: 'app-riwayat-rekam-medis',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './riwayat-rekam-medis.component.html',
    styleUrl: './riwayat-rekam-medis.component.scss'
})
export class RiwayatRekamMedisComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    UserData$ = this._authenticationService
        .UserData$
        .pipe(takeUntil(this.Destroy$));

    ResumeMedis$ = this._store
        .select(RekamMedisState.rekamMedisResumeMedis)
        .pipe(
            takeUntil(this.Destroy$),
            tap((result) => {
                if (result) {
                    this.getDetailPasien(result?.id_pasien!);
                }
            })
        );

    Pasien$ = new BehaviorSubject<PasienModel.IPasien>(null as any);

    constructor(
        private _store: Store,
        private _pasienService: PasienService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getDetailPasien(id_pasien: string) {
        this._pasienService
            .getById(id_pasien)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Pasien$.next(result.data);
            })
    }

    formatDate(date: string): string {
        return formatDate(new Date(date), 'dd-MM-yyyy', 'EN');
    }
}
