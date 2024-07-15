import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subject, takeUntil, tap } from 'rxjs';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';

@Component({
    selector: 'app-billing',
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
    ],
    templateUrl: './billing.component.html',
    styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Billing$ =
        this._rekamMedisService
            .getRekamMedisPasien()
            .pipe(
                takeUntil(this.Destroy$),
                tap((result) => {
                    console.log(result);
                })
            );

    constructor(
        private _rekamMedisService: RekamMedisService
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
