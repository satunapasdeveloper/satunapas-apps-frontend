import { HttpBaseResponse } from "../../http/http-request.model"

export namespace ItemModel {
    export interface IItem {
        id_item: string
        uuid: string
        kategori: string
        nama_item: string
        kode_kfa: string
        satuan: string
        harga_jual: string
        harga_beli: any
        hpp_average: any
        is_active: boolean
        is_delete: boolean
        kandungan: number
        satuan_obat: string
        code: any
        rxperts_code: any
        produsen: any
        golongan_obat: any
        kategori_obat: any
        catatan: any
        notif_exp_day: any
        is_notf_exp: boolean
        created_at: any
        updated_at: string
        created_by: any
        updated_by: any
    }

    export interface IKfa {
        id_item: string
        kategori: string
        kode_kfa: string
        satuan: string
        nama_item: string
        produsen: string
        nama_dagang: string;
    }

    export class GetAllItem implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IItem[]
    }

    export class GetByIdItem implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IItem
    }

    export class GetAllKfa implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IKfa[]
    }

    export interface CreateItem {
        kategori: string
        nama_item: string
        kode_kfa: string
        satuan: string
        harga_jual: number
    }

    export interface UpdateItem {
        uuid: string
        kategori: string
        nama_item: string
        kode_kfa: string
        satuan: string
        harga_jual: number
    }
}