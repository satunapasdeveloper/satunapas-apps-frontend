import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
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

    constructor(
        private _store: Store
    ) { }

    ngOnInit(): void {
        this.getDetailRekamMedis();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getDetailRekamMedis() {
        this._store
            .select(RekamMedisState.rekamMedisDetail)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log(result);
            })
    }
}
