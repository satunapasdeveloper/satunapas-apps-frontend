import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { DebiturModel } from 'src/app/model/pages/pis/setup-data/setup-debitur.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupDebiturService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(): Observable<DebiturModel.GetAllDebitur> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/SetupDebitur/GetAll`);
    }

    getById(id_debitur: number): Observable<DebiturModel.GetAllDebitur> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/SetupDebitur/GetById/${id_debitur}`);
    }

    create(payload: DebiturModel.CreateDebitur): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/SetupDebitur/Insert`, payload, true);
    }

    update(payload: DebiturModel.UpdateDebitur): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/SetupDebitur/Update`, payload, true);
    }

    changeStatus(payload: DebiturModel.ChangeStatusDebitur): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/SetupDebitur/UpdateStatusActive`, payload, true);
    }

    delete(id_debitur: number): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/pis/SetupDebitur/Delete/${id_debitur}`, true);
    }
}
