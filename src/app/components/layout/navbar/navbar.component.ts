import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        TooltipModule
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ShowTopMenu = false;

    TopMenu$ =
        this._authenticationService.TopMenu$
            .pipe(takeUntil(this.Destroy$));

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this._utilityService.ShowTopMenu$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.ShowTopMenu = result;

                const topMenuEl = document.getElementById("top_menu") as HTMLElement;

                if (!result) {
                    topMenuEl.classList.replace("h-[5rem]", "h-0");
                    topMenuEl.classList.replace("px-5", "px-0");
                    topMenuEl.classList.replace("py-2", "py-0");
                } else {
                    topMenuEl.classList.replace("h-0", "h-[5rem]");
                    topMenuEl.classList.replace("px-0", "px-5");
                    topMenuEl.classList.replace("py-0", "py-2");
                }
            });
    }

    handleToggleSidebar() {
        const state: boolean = this._utilityService.ShowSidebar$.value;
        this._utilityService.ShowSidebar$.next(!state);
    }

    handleToggleTopMenu() {
        this.ShowTopMenu = !this.ShowTopMenu;
        this._utilityService.ShowTopMenu$.next(this.ShowTopMenu);
    }

    handleClickTopMenu(data: AuthenticationModel.TopMenu) {
        this._utilityService.ShowSidebar$.next(true);
        this._authenticationService.getSidebarMenu(data.id_menu);
    }

    onBackToBeranda() {
        this._router.navigateByUrl("/beranda");
    }

    onSignOut() {
        this._utilityService.ShowLoading$.next(true);

        setTimeout(() => {
            this._utilityService.ShowLoading$.next(false);

            this._messageService.clear();
            this._messageService.add({ severity: 'success', detail: 'Success', summary: 'Sign Out Berhasil' });

            this._router.navigateByUrl("");
        }, 2000);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}   
