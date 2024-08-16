import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { RekamMedisState } from 'src/app/store/rekam-medis';

@Component({
    selector: 'app-informasi-pasien',
    standalone: true,
    imports: [],
    templateUrl: './informasi-pasien.component.html',
    styleUrl: './informasi-pasien.component.scss'
})
export class InformasiPasienComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Pasien: any;

    constructor(
        private _store: Store,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        // const no_rm = this._activatedRoute.snapshot.queryParams['no_rm'];
        // console.log("no rekam medis =>", no_rm);

        // this.Pasien = JSON.parse(localStorage.getItem('_SPSH_') as any);
        // console.log("selected pasien =>", this.Pasien);

        this._store
            .select(RekamMedisState.rekamMedisDetail)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Pasien = result;
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
