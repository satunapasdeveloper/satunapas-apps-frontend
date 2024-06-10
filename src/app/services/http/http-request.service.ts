import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError, map } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(
        private _httpClient: HttpClient,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) { }

    getRequest(url: string, queryString?: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        let query = {};

        if (queryString) {
            query = Object.assign({}, ...queryString);
        }

        return this._httpClient.get<HttpBaseResponse>(url, {
            params: query
        }).pipe(
            map((result) => {
                this._utilityService.ShowLoading$.next(false);

                return result;
            }),
            catchError((error: any) => {
                this.handlingError(error);
                throw error;
            })
        )
    }

    postRequest(url: string, data: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient.post<HttpBaseResponse>(url, data)
            .pipe(
                map((result) => {
                    this._utilityService.ShowLoading$.next(false);

                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    putRequest(url: string, data: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient.put<HttpBaseResponse>(url, data)
            .pipe(
                map((result) => {
                    this._utilityService.ShowLoading$.next(false);

                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    private handlingError(error: HttpErrorResponse): void {
        this._utilityService.ShowLoading$.next(false);
        this._messageService.clear();
        this._messageService.add({ severity: 'error', summary: 'Oops', detail: error.message })
    }
}
