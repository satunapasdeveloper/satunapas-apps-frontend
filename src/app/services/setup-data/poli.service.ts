import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { Observable } from 'rxjs';
import { PoliModel } from 'src/app/model/pages/setup-data/poli.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PoliService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getAll(): Observable<PoliModel.GetAllPoli> {
        return this._httpRequestService.getRequest(`${environment.webApiUrl}/satunapas/poli/Poli`);
    }
}
