import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of, switchMap, tap } from "rxjs";
import { RekamMedisModel } from "src/app/model/pages/rekam-medis/rekam-medis.model";
import { RekamMedisActions } from "./rekam-medis.action";
import { RekamMedisService } from "src/app/services/rekam-medis/rekam-medis.service";

interface RekamMedisStateModel {
    entities: RekamMedisModel.IRekamMedis[];
    single?: RekamMedisModel.IRekamMedis | null;
    variable?: RekamMedisModel.IVariableRekamMedis | null;
    success?: boolean;
}

@State<RekamMedisStateModel>({
    name: 'rekam_medis',
    defaults: {
        entities: [],
        single: null,
        variable: null,
        success: true
    }
})
@Injectable()
export class RekamMedisState {

    constructor(
        private _rekamMedisService: RekamMedisService,
    ) { }

    @Selector()
    static rekamMedisEntities(state: RekamMedisStateModel) {
        return state.entities;
    }

    @Selector()
    static rekamMedisVariable(state: RekamMedisStateModel) {
        return state.variable;
    }

    @Action(RekamMedisActions.GetAllRekamMedis)
    getAll(ctx: StateContext<RekamMedisStateModel>, actions: any) {
        return this._rekamMedisService
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

    @Action(RekamMedisActions.GetByIdRekamMedis)
    getById(ctx: StateContext<RekamMedisStateModel>, actions: any) {
        return this._rekamMedisService
            .getById(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        single: result.data,
                    });
                })
            )
    }

    @Action(RekamMedisActions.GetAllVariableRekamMedis)
    getAllVariable(ctx: StateContext<RekamMedisStateModel>) {
        return this._rekamMedisService
            .getAllVariableRekamMedis()
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        variable: result.data,
                    });
                })
            )
    }

    @Action(RekamMedisActions.CreateAssessment)
    createAssessment(ctx: StateContext<RekamMedisStateModel>, actions: any) {
        return this._rekamMedisService
            .createAssesment(actions.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();
                    if (result.responseResult) {
                        ctx.setState({
                            ...state,
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
                        return ctx.dispatch(new RekamMedisActions.GetByIdRekamMedis(actions.payload.id_pendaftaran));
                    } else {
                        return of([]);
                    }
                })
            )
    }

}