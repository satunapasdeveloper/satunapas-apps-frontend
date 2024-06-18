import { HttpBaseResponse } from "src/app/model/http/http-request.model"

export namespace DebiturModel {
    export interface IDebitur {
        id_debitur: number
        kode_debitur: string
        nama_debitur: string
        alamat_debitur: string
        telepon: string
        email: string
        tgl_expired: string
        is_active: boolean
        user_created: number
        time_created: string
        user_deactived: number
        time_deactived: string
    }

    export class GetAllDebitur implements HttpBaseResponse {
        responseResult!: boolean
        message!: string
        data!: IDebitur[]
    }

    export class GetByIdDebitur implements HttpBaseResponse {
        responseResult!: boolean
        message!: string
        data!: IDebitur
    }

    export interface CreateDebitur {
        kode_debitur: string
        nama_debitur: string
        alamat_debitur: string
        telepon: string
        email: string
        tgl_expired: string
    }

    export interface UpdateDebitur {
        id_debitur: number
        kode_debitur: string
        nama_debitur: string
        alamat_debitur: string
        telepon: string
        email: string
        tgl_expired: string
    }

    export interface ChangeStatusDebitur {
        id_debitur: number
        is_active: boolean
    }
}