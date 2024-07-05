import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';
import { UtilityService } from 'src/app/services/utility/utility.service';

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
export class BerandaComponent implements OnDestroy {

    Destroy$ = new Subject();

    UserData$ =
        this._authenticationService.UserData$
            .pipe(takeUntil(this.Destroy$));

    Menu: any[] = [];

    PasienTerlayani: number = 24;

    TotalPasien: number = 155;

    DokterPraktekHariIni: number = 3;

    TindakanMedisHariIni: number = 10;

    DokterPraktekHariIniDatasource: any[] = [
        {
            id: '1',
            nama_dokter: 'dr. John Doe',
            nama_poli: 'Poli Umum',
            jam_praktek: '08.00 - 12.00'
        },
        {
            id: '2',
            nama_dokter: 'dr. Jane Doe',
            nama_poli: 'Poli Umum',
            jam_praktek: '13.00 - 15.00'
        },
        {
            id: '3',
            nama_dokter: 'dr. Lisa Manobal',
            nama_poli: 'Poli Umum',
            jam_praktek: '16.00 - 20.00'
        },
    ];

    PenyakitTerpopuler: any[] = [
        {
            id: '1',
            nama_penyakit: 'Cholera, unspecified',
            jumlah: '4'
        },
        {
            id: '2',
            nama_penyakit: 'Congenital syphilis',
            jumlah: '2'
        },
        {
            id: '3',
            nama_penyakit: 'Paratyphoid fever A',
            jumlah: '2'
        },
    ];

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickMainMenu(data: any) {
        // localStorage.setItem("_CISMAINMENU_", JSON.stringify(data));
        // this._utilityService.ShowTopMenu$.next(true);
        // this._authenticationService.getTopMenu(data.id_menu);
    }

    handleNavigateToPendaftaranPasienBaru() {
        this._router.navigateByUrl("/pis/pendaftaran-pasien-baru");
    }
}
