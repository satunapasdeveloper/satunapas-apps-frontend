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

    Menu = this._authenticationService.getMainMenu();

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickMainMenu(data: AuthenticationModel.MainMenu) {
        console.log("main menu =>", data);

        this._utilityService.ShowTopMenu$.next(true);
        this._authenticationService.getTopMenu(data.id_menu);
    }

    handleNavigateToPendaftaranPasienBaru() {
        this._router.navigateByUrl("/pis/pendaftaran-pasien-baru");
    }
}
