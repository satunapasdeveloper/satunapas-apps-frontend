import { HttpBaseResponse } from "../../http/http-request.model"

export namespace DiagnosisModel {
    export interface IDiagnosisi {
        diagnosisi: any[]
    }

    export interface IIcd10 {
        id: string
        kode_icd_10: string
        nama_icd_10: string
        sab: string
    }

    export class GetAllIcd10 implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IIcd10[]
    }
}