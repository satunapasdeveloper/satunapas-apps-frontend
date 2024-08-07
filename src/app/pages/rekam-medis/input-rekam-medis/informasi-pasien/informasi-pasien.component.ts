import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-informasi-pasien',
    standalone: true,
    imports: [],
    templateUrl: './informasi-pasien.component.html',
    styleUrl: './informasi-pasien.component.scss'
})
export class InformasiPasienComponent implements OnInit {

    Pasien: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const no_rm = this._activatedRoute.snapshot.queryParams['no_rm'];
        // console.log("no rekam medis =>", no_rm);

        this.Pasien = JSON.parse(localStorage.getItem('_SPSH_') as any);
        // console.log("selected pasien =>", this.Pasien);
    }
}
