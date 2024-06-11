import { ColDef } from "ag-grid-community";

export namespace GridModel {
    export interface IGridToolbar {
        id: string;
        title: string;
        icon: string;
    }

    export interface IGrid {
        id?: string;
        column: ColDef[];
        dataSource: any[];
        height: string;
        showPaging: boolean;
        toolbar?: string[];
    }
}