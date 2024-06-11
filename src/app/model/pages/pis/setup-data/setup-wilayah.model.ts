import { HttpBaseResponse } from "src/app/model/http/http-request.model"

export namespace WilayahModel {
    export interface IWilayah {
        kode_wilayah: string
        kode_wilayah_parent: any
        kode_tipe_wilayah: string
        nama_wilayah: string
    }

    export class GetAllWilayah implements HttpBaseResponse {
        responseResult!: boolean
        message!: string
        data!: IWilayah[]
    }

    export interface CreateWilayah {
        kode_wilayah: string
        kode_wilayah_parent: string
        kode_tipe_wilayah: string
        nama_wilayah: string
    }

    export interface UpdateWilayah {
        kode_wilayah: string
        kode_wilayah_parent: string
        kode_tipe_wilayah: string
        nama_wilayah: string
    }
}