import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PendaftaranPasienBaruModel } from "src/app/model/pages/pis/pendaftaran-pasien-baru/pendaftaran-pasien-baru.model";
import { PendaftaranPasienBaruService } from "src/app/services/pis/pendaftaran-pasien-baru/pendaftaran-pasien-baru.service";
import { PendaftaranPasienBaruActions } from "./pendaftaran-pasien-baru.action";
import { of, switchMap, tap } from "rxjs";

interface PendaftaranPasienBaruStateModel {
    entities: PendaftaranPasienBaruModel.Person[] | PendaftaranPasienBaruModel.Person | any;
    success?: boolean;
}

@State<PendaftaranPasienBaruStateModel>({
    name: 'pendaftaran_pasien_baru',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class PendaftaranPasienBaruState {

    constructor(
        private _pendaftaranPasienBaruService: PendaftaranPasienBaruService,
    ) { }

    @Selector()
    static provinsiEntities(state: PendaftaranPasienBaruStateModel) {
        return state.entities;
    }

    @Action(PendaftaranPasienBaruActions.GetAllPasien)
    getAll(ctx: StateContext<PendaftaranPasienBaruStateModel>, actions: any) {
        return this._pendaftaranPasienBaruService
            .getAll(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        entities: result.data,
                    });
                })
            )
    }

    @Action(PendaftaranPasienBaruActions.GetByIdPerson)
    getById(ctx: StateContext<PendaftaranPasienBaruStateModel>, actions: any) {
        return this._pendaftaranPasienBaruService
            .getByIdPerson(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        entities: result.data,
                    });
                })
            )
    }

    @Action(PendaftaranPasienBaruActions.GetFromBpjsByNoKartu)
    getFromBpjs(ctx: StateContext<PendaftaranPasienBaruStateModel>, actions: any) {
        return this._pendaftaranPasienBaruService
            .getFromBpjsByNoKartu(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        entities: result,
                    });
                })
            )
    }

    @Action(PendaftaranPasienBaruActions.CreatePasien)
    create(ctx: StateContext<PendaftaranPasienBaruStateModel>, actions: any) {
        return this._pendaftaranPasienBaruService
            .create(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            entities: result.data,
                            success: true
                        })
                    } else {
                        ctx.patchState({
                            ...state,
                            success: false
                        })
                    }
                }),
                switchMap((result: any) => {
                    if (result.responseResult) {
                        return ctx.dispatch(new PendaftaranPasienBaruActions.GetAllPasien([]));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(PendaftaranPasienBaruActions.CreatePersonSudahAda)
    createPersonSudahAda(ctx: StateContext<PendaftaranPasienBaruStateModel>, actions: any) {
        return this._pendaftaranPasienBaruService
            .createPersonSudahAda(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            entities: result.data,
                            success: true
                        })
                    } else {
                        ctx.patchState({
                            ...state,
                            success: false
                        })
                    }
                }),
                switchMap((result: any) => {
                    if (result.responseResult) {
                        return ctx.dispatch(new PendaftaranPasienBaruActions.GetAllPasien([]));
                    } else {
                        return of([]);
                    }
                })
            )
    }
}