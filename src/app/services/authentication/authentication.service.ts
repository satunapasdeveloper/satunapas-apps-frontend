import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AuthenticationModel } from 'src/app/model/pages/authentication.model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    UserData$ = new BehaviorSubject(null);

    constructor(
        private _cookieService: CookieService,
        private _httpRequestService: HttpRequestService,
    ) { }

    signIn(payload: AuthenticationModel.ISignIn): Observable<AuthenticationModel.SignIn> {
        return this._httpRequestService
            .postRequest(`${environment.webApiUrl}/pis/Authentication/Login`, payload)
            .pipe(
                tap((result) => {
                    if (result.responseResult) {
                        this.handleSignIn(result.data);
                    }
                })
            )
    }

    setUserData() {
        const user_data = JSON.parse(this._cookieService.get("_CISUD_"));
        this.UserData$.next(user_data);
    }

    private handleSignIn(data: AuthenticationModel.IAuthentication) {
        this._cookieService.deleteAll();
        this._cookieService.set("_CISUD_", JSON.stringify(data));
    }
}
