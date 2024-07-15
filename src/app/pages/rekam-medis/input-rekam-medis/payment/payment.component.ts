import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
    ],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit, OnDestroy {


    constructor(
        private _rekamMedisService: RekamMedisService,
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }
}
