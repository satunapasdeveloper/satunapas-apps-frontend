import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { BillingModel } from 'src/app/model/pages/rekam-medis/billing.model';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';
import { RekamMedisState } from 'src/app/store/rekam-medis';

@Component({
    selector: 'app-history-payment',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule
    ],
    templateUrl: './history-payment.component.html',
    styleUrl: './history-payment.component.scss'
})
export class HistoryPaymentComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Billing: any;

    Invoice!: BillingModel.IHistoryPembayaran;

    constructor(
        private _store: Store,
        private _activatedRoute: ActivatedRoute,
        private _rekamMedisService: RekamMedisService,
    ) { }

    ngOnInit(): void {
        this.getHistoryPayment();
        this.getTagihan(this._activatedRoute.snapshot.queryParams['id']);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    getHistoryPayment() {
        this._store
            .select(RekamMedisState.rekamMedisHistoryPayment)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Invoice = result as BillingModel.IHistoryPembayaran;
            })
    }

    private getTagihan(id_pendaftaran: string) {
        this._rekamMedisService
            .getTagihan(id_pendaftaran)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.responseResult) {
                    this.Billing = result.data;
                }
            })
    }
}
