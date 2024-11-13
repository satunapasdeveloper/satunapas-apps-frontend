import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { BarangKeluarModel } from 'src/app/model/pages/inventory/barang-keluar.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class BarangKeluarService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(query: any): Observable<BarangKeluarModel.GetAll> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/barang_keluar/getAll`, query);
    }

    getById(id_barang_keluar: string): Observable<BarangKeluarModel.GetById> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/barang_keluar/getById/${id_barang_keluar}`);
    }

    create(payload: BarangKeluarModel.Create): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/satunapas/barang_keluar/insert`, payload);
    }

    cancel(payload: BarangKeluarModel.Cancel): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/satunapas/barang_keluar/cancel`, payload);
    }
}
