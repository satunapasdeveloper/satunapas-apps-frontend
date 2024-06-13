import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../http/http-request.service';
import { Observable } from 'rxjs';
import { WilayahModel } from 'src/app/model/pages/pis/setup-data/setup-wilayah.model';
import { environment } from 'src/environments/environment';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';

@Injectable({
    providedIn: 'root'
})
export class SetupWilayahService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    // ** Provinsi
    getAllProvinsi(): Observable<WilayahModel.GetAllWilayah> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/Wilayah/provinsiGetAll`);
    }

    createProvinsi(payload: WilayahModel.CreateWilayah): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/Wilayah/ProvinsiInsert`, payload, true);
    }

    updateProvinsi(payload: WilayahModel.UpdateWilayah): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Wilayah/ProvinsiUpdate`, payload, true);
    }

    deleteProvinsi(kode_wilayah: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/pis/Wilayah/ProvinsiDelete/${kode_wilayah}`, true);
    }

    // ** Kota
    getAllKota(kode_wilayah_provinsi: string): Observable<WilayahModel.GetAllWilayah> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/Wilayah/kotaGetAllByKodeProvinsi/${kode_wilayah_provinsi}`);
    }

    createKota(payload: WilayahModel.CreateWilayah): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/Wilayah/KotaInsert`, payload, true);
    }

    updateKota(payload: WilayahModel.UpdateWilayah): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Wilayah/KotaUpdate`, payload, true);
    }

    deleteKota(kode_wilayah: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/pis/Wilayah/KotaDelete/${kode_wilayah}`, true);
    }

    // ** Kecamatan
    getAllKecamatan(kode_wilayah_kota: string): Observable<WilayahModel.GetAllWilayah> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/pis/Wilayah/KecamatanGetAllByKodeKota/${kode_wilayah_kota}`);
    }

    createKecamatan(payload: WilayahModel.CreateWilayah): Observable<HttpBaseResponse> {
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/pis/Wilayah/KecamatanInsert`, payload, true);
    }

    updateKecamatan(payload: WilayahModel.UpdateWilayah): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/pis/Wilayah/KecamatanUpdate`, payload, true);
    }

    deleteKecamatan(kode_wilayah: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/pis/Wilayah/KecamatanDelete/${kode_wilayah}`, true);
    }
}
