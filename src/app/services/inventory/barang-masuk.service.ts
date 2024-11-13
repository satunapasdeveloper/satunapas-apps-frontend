import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { BarangMasukModel } from 'src/app/model/pages/inventory/barang-masuk.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';

@Injectable({
    providedIn: 'root'
})
export class BarangMasukService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(query: any): Observable<BarangMasukModel.GetAll> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/barang_masuk/getAll`, query);
    }

    getById(id_barang_masuk: string): Observable<BarangMasukModel.GetById> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/barang_masuk/getById/${id_barang_masuk}`);
    }

    create(payload: BarangMasukModel.Create): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/satunapas/barang_masuk/insert`, payload);
    }

    cancel(payload: BarangMasukModel.Cancel): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/satunapas/barang_masuk/cancel`, payload);
    }
}
