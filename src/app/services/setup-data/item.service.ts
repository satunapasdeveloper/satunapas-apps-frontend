import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-request.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http/http-request.service';
import { ItemModel } from 'src/app/model/pages/setup-data/item.model';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(): Observable<ItemModel.GetAllItem> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/Item/GetAll`);
    }

    getById(uuid: string): Observable<ItemModel.GetByIdItem> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/Item/GetByUuid/${uuid}`);
    }

    getAllIcd9(payload: any): Observable<ItemModel.GetAllKfa> {
        return this._httpRequestService
            .postRequest(`${environment.webApiUrl}/satunapas/Item/GetKfa`, payload)
            .pipe(
                map((result) => {
                    let response = {
                        responseResult: result.responseResult,
                        statusCode: result.statusCode,
                        message: result.message,
                        data: []
                    };

                    response.data = result.data.items.data ? result.data.items.data.map((item: any) => {
                        return {
                            kategori: item.farmalkes_type.code == 'medicine' ? 'obat' : 'alkes',
                            kode_kfa: item.kfa_code,
                            satuan: item.uom.name,
                            nama_item: item.name,
                            produsen: item.manufacturer,
                            nama_dagang: item.nama_dagang,
                            product_name: item.product_template.name,
                            bentuk: item.dosage_form.name,
                            kandungan: item.active_ingredients.map((ingredients: any) => {
                                return `${ingredients.zat_aktif} : ${ingredients.kekuatan_zat_aktif}`
                            })
                        }
                    }) : [];

                    return response;
                })
            )
    }

    create(payload: ItemModel.CreateItem): Observable<HttpBaseResponse> {
        delete (<any>payload)['uuid'];
        return this._httpRequestService.postRequest(`${environment.webApiUrl}/satunapas/Item/Create`, payload);
    }

    update(payload: ItemModel.UpdateItem): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/satunapas/Item/Update/${payload.uuid}`, payload);
    }

    updateStatus(uuid: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.putRequest(`${environment.webApiUrl}/satunapas/Item/UpdateStatus/${uuid}`, null);
    }

    delete(uuid: string): Observable<HttpBaseResponse> {
        return this._httpRequestService.deleteRequest(`${environment.webApiUrl}/satunapas/Item/Delete/${uuid}`);
    }
}
