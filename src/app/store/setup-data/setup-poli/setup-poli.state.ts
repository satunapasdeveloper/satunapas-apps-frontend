import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PoliModel } from "src/app/model/pages/setup-data/poli.model";
import { PoliService } from "src/app/services/setup-data/poli.service";
import { SetupPoliActions } from "./setup-poli.action";
import { tap } from "rxjs";

interface SetupPoliStateModel {
    entities: PoliModel.IPoli[];
    success?: boolean;
}

@State<SetupPoliStateModel>({
    name: 'setup_poli',
    defaults: {
        entities: [],
        success: true
    }
})
@Injectable()
export class SetupPoliState {

    constructor(
        private _poliService: PoliService,
    ) { }

    @Selector()
    static poliEntities(state: SetupPoliStateModel) {
        return state.entities;
    }

    @Action(SetupPoliActions.GetAllPoli)
    getAllPoli(ctx: StateContext<SetupPoliStateModel>) {
        return this._poliService
            .getAll()
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
}