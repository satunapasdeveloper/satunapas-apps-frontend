import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetupWilayahService } from "src/app/services/pis/setup-data/setup-wilayah.service";
import { SetupWilayahActions } from "./setup-wilayah.action";
import { mergeMap, of, switchMap, tap } from "rxjs";
import { WilayahModel } from "src/app/model/pages/pis/setup-data/setup-wilayah.model";

interface SetupWilayahStateModel {
    entities: WilayahModel.IWilayah[] | WilayahModel.IWilayah | any;
    provinsi?: WilayahModel.IWilayah[] | WilayahModel.IWilayah | any;
    kota?: WilayahModel.IWilayah[] | WilayahModel.IWilayah | any;
    kecamatan?: WilayahModel.IWilayah[] | WilayahModel.IWilayah | any;
    success?: boolean;
}

@State<SetupWilayahStateModel>({
    name: 'setup_wilayah',
    defaults: {
        entities: [],
        provinsi: [],
        kota: [],
        kecamatan: [],
        success: true
    }
})
@Injectable()
export class SetupWilayahState {

    constructor(
        private _setupWilayahService: SetupWilayahService,
    ) { }

    @Selector()
    static provinsiEntities(state: SetupWilayahStateModel) {
        return state.provinsi;
    }

    @Selector()
    static kotaEntities(state: SetupWilayahStateModel) {
        return state.kota;
    }

    @Selector()
    static kecamatanEntities(state: SetupWilayahStateModel) {
        return state.kecamatan;
    }

    @Action(SetupWilayahActions.GetAllProvinsi)
    getAllProvinsi(ctx: StateContext<SetupWilayahStateModel>) {
        return this._setupWilayahService
            .getAllProvinsi()
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        provinsi: result.data,
                    });
                })
            )
    }

    @Action(SetupWilayahActions.CreateProvinsi)
    createProvinsi(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .createProvinsi(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            provinsi: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllProvinsi());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.UpdateProvinsi)
    updateProvinsi(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .updateProvinsi(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            provinsi: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllProvinsi());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.DeleteProvinsi)
    deleteProvinsi(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .deleteProvinsi(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            provinsi: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllProvinsi());
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.GetAllKotaByKodeProvinsi)
    getAllKota(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .getAllKota(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        kota: result.data,
                    })
                })
            )
    }

    @Action(SetupWilayahActions.CreateKota)
    createKota(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .createKota(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            kota: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllKotaByKodeProvinsi(actions.payload.kode_wilayah_parent));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.UpdateKota)
    updateKota(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .updateKota(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            kota: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllKotaByKodeProvinsi(actions.payload.kode_wilayah_parent));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.DeleteKota)
    deleteKota(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .deleteProvinsi(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            kota: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllKotaByKodeProvinsi(actions.payload.kode_wilayah_parent));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.GetAllKecamatanByKodeKota)
    getAllKecamatan(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .getAllKecamatan(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        kecamatan: result.data,
                    })
                })
            )
    }

    @Action(SetupWilayahActions.CreateKecamatan)
    createKecamatan(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .createKecamatan(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            kecamatan: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllKecamatanByKodeKota(actions.payload.kode_wilayah_parent));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.UpdateKecamatan)
    updateKecamatan(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .updateKecamatan(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            kecamatan: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllKecamatanByKodeKota(actions.payload.kode_wilayah_parent));
                    } else {
                        return of([]);
                    }
                })
            )
    }

    @Action(SetupWilayahActions.DeleteKecamatan)
    deleteKecamatan(ctx: StateContext<SetupWilayahStateModel>, actions: any) {
        return this._setupWilayahService
            .deleteProvinsi(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
                            kecamatan: result.data,
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
                        return ctx.dispatch(new SetupWilayahActions.GetAllKecamatanByKodeKota(actions.payload.kode_wilayah_parent));
                    } else {
                        return of([]);
                    }
                })
            )
    }
}