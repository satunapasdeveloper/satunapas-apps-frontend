import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { PendaftaranModel } from 'src/app/model/pages/pendaftaran/pendaftaran.model';
import { Observable } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PendaftaranService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getJadwalDokter(payload: any): Observable<PendaftaranModel.GetAllJadwalDokter> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/satunapas/Pendaftaran/findAllJadwalDokter`, payload);
    }

    create(payload: PendaftaranModel.CreatePendaftaran): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/satunapas/Pendaftaran/Create`, payload);
    }
}
