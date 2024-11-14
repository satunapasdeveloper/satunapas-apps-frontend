import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { StokOpnameModel } from 'src/app/model/pages/inventory/stok-opname.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class StokOpnameService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(query: any): Observable<StokOpnameModel.GetAll> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/stock_opname/getAll`, query);
    }

    getById(id_stock_opname: string): Observable<StokOpnameModel.GetById> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/stock_opname/getById/${id_stock_opname}`);
    }

    getAllItem(): Observable<StokOpnameModel.GetItemStokOpname> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/stock_opname/getAllItem`);
    }

    create(payload: StokOpnameModel.Create): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/satunapas/stock_opname/capture`, payload);
    }

    update(payload: StokOpnameModel.Update): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/satunapas/stock_opname/update`, payload);
    }
}
