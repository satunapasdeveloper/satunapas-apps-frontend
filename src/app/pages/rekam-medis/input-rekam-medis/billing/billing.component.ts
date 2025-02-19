import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subject, takeUntil, tap } from 'rxjs';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';
import { RekamMedisActions } from 'src/app/store/rekam-medis';

@Component({
    selector: 'app-billing',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputNumberModule,
    ],
    templateUrl: './billing.component.html',
    styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    SelectedPasien: any;

    Billing: any;

    Diskon: any = 0;

    constructor(
        private _store: Store,
        private _activatedRoute: ActivatedRoute,
        private _rekamMedisService: RekamMedisService
    ) { }

    ngOnInit(): void {
        this.getTagihan(this._activatedRoute.snapshot.queryParams['id']);
        this.getRekamMedis();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getRekamMedis() {
        const id = this._activatedRoute.snapshot.queryParams['id'];

        this._store
            .dispatch(new RekamMedisActions.GetByIdRekamMedis(id))
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.SelectedPasien = result.rekam_medis.single;
                console.log("selected pasien =>", this.SelectedPasien);
            });
    }

    private getTagihan(id_pendaftaran: string) {
        this._rekamMedisService
            .getTagihan(id_pendaftaran)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    console.log("data =>", result.data);
                    this.Billing = result.data;
                }
            })
    }

    handleChangeDiskon(args: any) {
        this.Billing.diskon = args;
        this.Billing.total = this.SelectedPasien.debitur == 'BPJS' ? 0 : this.Billing.subtotal - args;
    }
}
