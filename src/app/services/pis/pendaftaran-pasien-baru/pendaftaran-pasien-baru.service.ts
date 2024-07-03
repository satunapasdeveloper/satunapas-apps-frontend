import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../http/http-request.service';
import { PendaftaranPasienBaruModel } from 'src/app/model/pages/pis/pendaftaran-pasien-baru/pendaftaran-pasien-baru.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpBaseResponse, PostRequestByDynamicFiterModel } from 'src/app/model/http/http-request.model';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PendaftaranPasienBaruService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    checkPersonByNoIdentitas(no_identitas: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/Person/CheckPersonByNoIdentitas/${no_identitas}`);
    }

    getAll(payload?: PostRequestByDynamicFiterModel[]): Observable<PendaftaranPasienBaruModel.GetAllPasien> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/Person/PersonPasienGetAllByDynamicFilter`, payload);
    }

    getByIdPerson(id_person: number): Observable<HttpBaseResponse> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/Person/GetPersonPasienDetails/${id_person}`);
    }

    create(payload: PendaftaranPasienBaruModel.Person): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/Person/PendaftaranBaruPasienInsert`, payload);
    }

    createPersonSudahAda(payload: PendaftaranPasienBaruModel.IPersonSudahAda): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/Person/PendaftaranPasienPersonSudahAda`, payload);
    }

    getFromBpjsByNoKartu(no_kartu: string): Observable<any> {
        const payload = {
            no_kartu: no_kartu,
            tgl_pelayanan: formatDate(new Date(), 'yyyy-MM-dd', 'EN')
        };

        return this._httpRequestService.postRequest(`${environment.webApiUrl}/admisi/Bpjs/PencarianDataPesertaBPJS`, payload);
    }

    updateDetail(payload: PendaftaranPasienBaruModel.UpdateDetailPerson): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdatePerson`, payload);
    }

    createAlamat(payload: PendaftaranPasienBaruModel.UpdateAlamatPerson): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/InsertAlamatPerson`, payload);
    }

    updateAlamat(payload: PendaftaranPasienBaruModel.UpdateAlamatPerson): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdateAlamatPerson`, payload);
    }

    updateStatusAlamat(payload: PendaftaranPasienBaruModel.UpdateStatusAlamatPerson): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdateAlamatPerson`, payload);
    }

    updateKontak(payload: PendaftaranPasienBaruModel.UpdateKontakPerson): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdateKontakPerson`, payload);
    }

    updateStatusKontak(payload: PendaftaranPasienBaruModel.UpdateKontakPerson): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdateKontakPersonStatusActive`, payload);
    }

    updateDebitur(payload: PendaftaranPasienBaruModel.UpdateDebiturPasien): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdateDebiturPasien`, payload);
    }

    updateStatusDebitur(payload: PendaftaranPasienBaruModel.UpdateDebiturPasien): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Person/UpdateDebiturPasienStatusActive`, payload);
    }
}
