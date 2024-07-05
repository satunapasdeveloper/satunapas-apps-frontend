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

    SidebarMenu$ = new BehaviorSubject<AuthenticationModel.ISidebarMenu[]>([
        {
            id: '1',
            caption: 'Setup Data',
            icon: 'pi pi-cog',
            toggle_child: false,
            sidebarChild: [
                {
                    id: '11',
                    caption: 'Setup Poli',
                    icon: 'pi pi-shop',
                    toggle_child: false
                },
                {
                    id: '12',
                    caption: 'Setup Item',
                    icon: 'pi pi-clone',
                    toggle_child: false
                },
                {
                    id: '13',
                    caption: 'Setup Tindakan Medis',
                    icon: 'pi pi-arrows-alt',
                    toggle_child: false
                },
                {
                    id: '14',
                    caption: 'Setup Rekanan Penunjang',
                    icon: 'pi pi-address-book',
                    toggle_child: false
                },
            ]
        },
        {
            id: '2',
            caption: 'Pasien',
            icon: 'pi pi-users',
            toggle_child: false
        },
        {
            id: '3',
            caption: 'Dokter',
            icon: 'pi pi-shield',
            toggle_child: false
        },
        {
            id: '5',
            caption: 'Rekam Medis',
            icon: 'pi pi-file-edit',
            toggle_child: false
        },
        {
            id: '7',
            caption: 'Layanan Dokumen',
            icon: 'pi pi-file-o',
            toggle_child: false,
            sidebarChild: [
                {
                    id: '71',
                    caption: 'Resume Medis',
                    icon: 'pi pi-circle-fill',
                    toggle_child: false
                },
                {
                    id: '72',
                    caption: 'Surat Sehat',
                    icon: 'pi pi-circle-fill',
                    toggle_child: false
                },
                {
                    id: '73',
                    caption: 'Surat Sakit',
                    icon: 'pi pi-circle-fill',
                    toggle_child: false
                },
                {
                    id: '74',
                    caption: 'Setup Rujukan',
                    icon: 'pi pi-circle-fill',
                    toggle_child: false
                },
                {
                    id: '74',
                    caption: 'Invoice',
                    icon: 'pi pi-circle-fill',
                    toggle_child: false
                },
            ]
        },
        {
            id: '8',
            caption: 'Laporan',
            icon: 'pi pi-folder',
            toggle_child: false
        },
    ]);

    constructor(
        private _cookieService: CookieService,
        private _httpRequestService: HttpRequestService,
    ) { }

    signIn(payload: AuthenticationModel.ISignIn): Observable<AuthenticationModel.SignIn> {
        return this._httpRequestService
            .postRequest(`${environment.webApiUrl}/satunapas/auth/login`, payload)
            .pipe(
                tap((result) => {
                    if (result.responseResult) {
                        this.handleSignIn(result.data);
                    }
                })
            )
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
