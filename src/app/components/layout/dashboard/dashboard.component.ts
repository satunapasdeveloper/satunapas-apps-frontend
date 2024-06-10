import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        NavbarComponent,
        BreadcrumbsComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    ShowSidebar = false;

    UserData$ =
        this._authenticationService.UserData$
            .pipe(takeUntil(this.Destroy$));

    @Input('ButtonNavigation') ButtonNavigation: any[] = [];

    @Output('onClickButtonNavigation') onClickButtonNavigation = new EventEmitter<any>();

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) {
        // ** Set Userdata if page is refreshed
        this._authenticationService.setUserData();

        // ** Detect navigation end
        this._router.events
            .pipe(takeUntil(this.Destroy$))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this._utilityService.ShowSidebar$.next(false);
                }
            });
    }

    ngOnInit(): void {
        this.togglingSidebar();
    }

    private togglingSidebar() {
        this._utilityService.ShowSidebar$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.ShowSidebar = result;

                const sidebarEl = document.getElementById('sidebar') as HTMLElement;

                if (result) {
                    sidebarEl.classList.replace("w-[5rem]", "w-[20rem]");
                } else {
                    sidebarEl.classList.replace("w-[20rem]", "w-[5rem]");
                }
            });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNavigation(item: LayoutModel.IButtonNavigation) {
        this.onClickButtonNavigation.emit(item);
    }
}
