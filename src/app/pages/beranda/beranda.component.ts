import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
    ],
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss']
})
export class BerandaComponent {

    constructor(
        private _router: Router,
    ) { }

    handleNavigateToPendaftaranPasienBaru() {
        this._router.navigateByUrl("/pis/pendaftaran-pasien-baru");
    }
}
