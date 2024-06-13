import { NgModule, ModuleWithProviders } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { PIS_STATE } from "./pis";

const STATES = [
    ...PIS_STATE
];

@NgModule({
    imports: [
        NgxsModule.forRoot([...STATES], {
            developmentMode: !environment.production,
        }),
    ],
})
export class StateModule {
    static forRoot(): ModuleWithProviders<StateModule> {
        return {
            ngModule: StateModule,
        }
    }
}