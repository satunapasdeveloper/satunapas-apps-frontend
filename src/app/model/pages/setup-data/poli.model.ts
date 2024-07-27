import { HttpBaseResponse } from "../../http/http-request.model"

export namespace PoliModel {
    export interface IPoli {
        id_poli: string
        uuid: any
        kode_poli: string
        satusehat_id_poli: string
        poli: string
    }

    export class GetAllPoli implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IPoli[]
    }
}