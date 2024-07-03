export class HttpBaseResponse {
    responseResult!: boolean;
    message!: string;
    data: any;
}

export interface PostRequestByDynamicFiterModel {
    columnName: string;
    filter: string;
    searchText: string;
    searchText2: string;
}