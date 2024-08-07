import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';
import { RekamMedisState } from 'src/app/store/rekam-medis';

@Component({
    selector: 'app-diagnosis',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        ButtonModule
    ],
    templateUrl: './diagnosis.component.html',
    styleUrl: './diagnosis.component.scss'
})
export class DiagnosisComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    Icd10: any[] = [];

    DiagnosaDatasource: any[] = [];

    JenisDiagnosa: any[] = [
        { label: 'Diagnosa Utama / Primer', value: 'Diagnosa Utama / Primer' },
        { label: 'Diagnosa Tambahan / Sekunder', value: 'Diagnosa Tambahan / Sekunder' },
    ];

    constructor(
        private _store: Store,
        private _activatedRoute: ActivatedRoute,
        private _rekamMedisService: RekamMedisService
    ) { }

    ngOnInit(): void {
        this.getAllIcd10();
    }

    ngAfterViewInit(): void {
        this.getDiagnosis();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getDiagnosis() {
        this._store
            .select(RekamMedisState.rekamMedisDetail)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result?.diagnosisi) {
                    this.DiagnosaDatasource = (<any>result.diagnosisi)['diagnosisi'];
                }
            })
    }


    private getAllIcd10() {
        this._rekamMedisService
            .getAllIcd10()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.Icd10 = result.data;
            })
    }

    handleAddDiagnosa() {
        let data = [...this.DiagnosaDatasource];
        data.push({
            id_pendaftaran: this._activatedRoute.snapshot.queryParams['id'],
            kode_icd10: '',
            display_icd10: '',
            jenis_diagnosis: '',
            keterangan: ''
        });

        this.DiagnosaDatasource = data;
    };

    handleDeleteDiagnosa(index: number) {
        if (this.DiagnosaDatasource.length > 0) {
            this.DiagnosaDatasource.splice(index, 1);
        }
    }
}
