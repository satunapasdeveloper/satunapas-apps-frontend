import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationModel } from 'src/app/model/pages/authentication/authentication.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    UserData$ = new BehaviorSubject<AuthenticationModel.IAuthentication>({} as any);

    TopMenu$ = new BehaviorSubject<AuthenticationModel.TopMenu[]>(JSON.parse(localStorage.getItem("_CISTOPMENU_") as any));

    SidebarMenu$ = new BehaviorSubject<AuthenticationModel.SidebarMenu[]>(JSON.parse(localStorage.getItem("_CISSIDEMENU_") as any));

    constructor(
        private _cookieService: CookieService,
        private _httpRequestService: HttpRequestService,
    ) { }

    signIn(payload: AuthenticationModel.ISignIn): Observable<AuthenticationModel.SignIn> {
        return this._httpRequestService
            .postRequest(`${environment.webApiUrl}/pis/Authentication/LoginTenant`, payload)
            .pipe(
                tap((result) => {
                    if (result.responseResult) {
                        this.handleSignIn(result.data);
                    }
                })
            )
    }

    getMainMenu(): AuthenticationModel.MainMenu[] {
        this.setUserData();
        return this.UserData$.value.menuJson.mainMenu;
    }

    getTopMenu(id_menu: number): AuthenticationModel.TopMenu[] {
        // ** Get from localstorage
        const topMenu = this.UserData$.value.menuJson.topMenu;

        // ** Filtering by id_menu
        const data = topMenu.filter(item => item.id_menu_parent == id_menu);

        // ** Save to localstorage
        localStorage.setItem("_CISTOPMENU_", JSON.stringify(data));

        // ** Set State
        this.TopMenu$.next([]);
        this.TopMenu$.next(data);

        return data;
    }

    getSidebarMenu(id_top_menu: number): AuthenticationModel.SidebarMenu[] {
        const sidebarMenu = this.UserData$.value.menuJson.sidebarMenu;
        let data = sidebarMenu.filter(item => item.id_top_menu == id_top_menu)

        data = data.map((item: any) => {
            return {
                ...item,
                toggle_child: false
            }
        });

        // ** Save to localstorage
        localStorage.setItem("_CISSIDEMENU_", JSON.stringify(data));

        this.SidebarMenu$.next([]);
        this.SidebarMenu$.next(data);
        return data;
    }

    setUserData() {
        const user_data = localStorage.getItem("_CISUD_")
        this.UserData$.next(JSON.parse(user_data as any));
    }

    private handleSignIn(data: AuthenticationModel.IAuthentication) {
        localStorage.clear();
        localStorage.setItem("_CISUD_", JSON.stringify(data));
    }
}
