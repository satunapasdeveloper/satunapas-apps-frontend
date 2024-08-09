import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { map, Subject, takeUntil } from 'rxjs';
import { RekamMedisService } from 'src/app/services/rekam-medis/rekam-medis.service';
import { RekamMedisState } from 'src/app/store/rekam-medis';
import { SetupTindakanMedisState } from 'src/app/store/setup-data/tindakan-medis';

@Component({
    selector: 'app-tindakan',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        InputSwitchModule,
        DropdownModule,
        CalendarModule
    ],
    templateUrl: './tindakan.component.html',
    styleUrl: './tindakan.component.scss'
})
export class TindakanComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    FormTindakan: FormGroup;

    PetugasDatasource: any[] = [];

    TindakanMedisDatasource: any[] = [];

    TindakanForSave: any[] = [];

    BmhpDatasource: any[] = [];

    BmhpForSave: any[] = [];

    constructor(
        private _store: Store,
        private _formBuilder: FormBuilder,
        private _rekamMedisService: RekamMedisService,
    ) {
        this.FormTindakan = this._formBuilder.group({
            is_ada_kie: [false, []],
            keterangan_kie: ['', []],
            is_ada_tindakan: [false, []],
            tanggal_tindakan: [new Date(), []],
            waktu_tindakan: [new Date(), []],
            tindakan: [[], []],
            bmhp: [[], []]
        })
    };

    ngOnInit(): void {
        this.getBmhp();
        this.getSetupTindakanMedis();
    }

    ngAfterViewInit(): void {
        this.getTindakan();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getBmhp() {
        this._rekamMedisService
            .getAllBmhp()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log(result);
            })
    }

    private getSetupTindakanMedis() {
        this._store
            .select(SetupTindakanMedisState.TindakanMedisEntities)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log(result);
                this.TindakanMedisDatasource = result;
            })
    }

    private getTindakan() {
        this._store
            .select(RekamMedisState.rekamMedisDetail)
            .pipe(
                takeUntil(this.Destroy$),
                map((result) => {
                    return result?.tindakan ? result.tindakan : null;
                })
            )
            .subscribe((result) => {
                if (result) {
                    console.log("tindakan =>", result);
                }
            })
    }

    handleAddTindakan() {
        this.TindakanForSave.push({
            id: this.TindakanForSave.length + 1,
            nama_tindakan_medis: '',
            petugas: 0,
            qty: 0,
            harga_satuan: 0,
            total: 0
        });
    }

    handleDeleteTindakan(index: number) {
        if (this.TindakanForSave.length > 1) {
            this.TindakanForSave.splice(index, 1);
        }
    }

    handleAddBmhp() {
        this.BmhpForSave.push({
            id: this.BmhpForSave.length + 1,
            nama_item: '',
            qty: 0,
            harga_satuan: 0,
            total: 0
        });
    }

    handleDeleteBmhp(index: number) {
        if (this.BmhpForSave.length > 1) {
            this.BmhpForSave.splice(index, 1);
        }
    }

    get is_ada_kie(): AbstractControl {
        return this.FormTindakan.get('is_ada_kie') as AbstractControl
    }

    get keterangan_kie(): AbstractControl {
        return this.FormTindakan.get('keterangan_kie') as AbstractControl
    }

    get is_ada_tindakan(): AbstractControl {
        return this.FormTindakan.get('is_ada_tindakan') as AbstractControl
    }

    get tindakan(): AbstractControl {
        return this.FormTindakan.get('tindakan') as AbstractControl
    }

    get bmhp(): AbstractControl {
        return this.FormTindakan.get('bmhp') as AbstractControl
    }
}
