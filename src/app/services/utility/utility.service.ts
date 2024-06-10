import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    ShowLoading$ = new BehaviorSubject(false);

    ShowSidebar$ = new BehaviorSubject(false);

    constructor() { }

    getVersion(): string {
        return "0.0.1";
    }
}
