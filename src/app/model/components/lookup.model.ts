import { ColDef } from "ag-grid-community";
import { FilterModel } from "./filter.model";

export namespace LookupModel {
    export interface ILookup {
        id: string;
        label: string;
        url: string;
        title: string;
        columns: ColDef[];
        filter: FilterModel.IOffcanvasFilterDatasource[];
        selectedField: string;
        selectedValue?: string;
        callback?: (data: any) => void;
        showLabel?: boolean;
    }
}