import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { SetupPoliActions } from './store/setup-data/setup-poli';
import { SetupTindakanMedisActions } from './store/setup-data/tindakan-medis';
import { SetupItemActions } from './store/setup-data/item';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'frontend-cis';

    Destroy$ = new Subject();

    isLoading = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _renderer: Renderer2,
    ) {
        // this._router.events
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe(event => {
        //         if (event instanceof NavigationStart) {
        //             this.isLoading = true;
        //             this.triggerAnimation();
        //         } else if (
        //             event instanceof NavigationEnd ||
        //             event instanceof NavigationCancel ||
        //             event instanceof NavigationError
        //         ) {
        //             setTimeout(() => {
        //                 this.isLoading = false;
        //             }, 2000);
        //         }
        //     });
    }

    ngOnInit(): void {
        const isUserLoggedIn = localStorage.getItem('_CISUD_');

        if (isUserLoggedIn) {
            this.initAllNeededState();
        }
    }

    private initAllNeededState() {
        // ** Get All Poli
        this._store
            .dispatch(new SetupPoliActions.GetAllPoli())
            .pipe(takeUntil(this.Destroy$));

        // ** Get All Tindakan Medis
        this._store
            .dispatch(new SetupTindakanMedisActions.GetAllTindakanMedis())
            .pipe(takeUntil(this.Destroy$));

        // ** Get All Item
        this._store
            .dispatch(new SetupItemActions.GetAllItem())
            .pipe(takeUntil(this.Destroy$));
    }

    triggerAnimation() {
        const element = document.querySelector('.zoom-text') as HTMLElement;
        if (element) {
            this._renderer.removeClass(element, 'zoom-text');
            // Trigger reflow/repaint
            element.offsetHeight; // This forces a reflow
            this._renderer.addClass(element, 'zoom-text');
        }
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
