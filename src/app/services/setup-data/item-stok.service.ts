import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemModel } from 'src/app/model/pages/setup-data/item.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class ItemStokService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(query: any): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/item_stock/getAll`, query);
    }
}
