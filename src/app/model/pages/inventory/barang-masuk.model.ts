import { HttpBaseResponse } from "../../http/http-request.model"

export namespace BarangMasukModel {
    export interface IListBarangMasuk {
        id_barang_masuk: string
        tanggal: string
        no_surat_jalan: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: any
        canceled_at: any
        canceled_by: any
        reason_canceled: any
        status: string
    }

    export class GetAll implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: {
            totalRows: number;
            page: number;
            rows: IListBarangMasuk[]
        }
    }

    export interface IDetail {
        id_barang_masuk: string
        tanggal: string
        no_surat_jalan: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: any
        canceled_at: string
        canceled_by: string
        reason_canceled: string
        status: string
        detail: {
            id_barang_masuk_detail: string
            id_barang_masuk: string
            id_item: string
            batch: string
            expired_date: string
            qty: string
            harga_beli: string
            item: {
                nama_item: string
                code: any
            }
        }[]
    }

    export class GetById implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IDetail
    }

    export interface Create {
        tanggal: string
        no_surat_jalan: string
        detail: {
            id_item: number
            batch: string
            expired_date: string
            qty: number
            harga_beli: number
        }[]
    }

    export interface Cancel {
        id_barang_masuk: number
        reason_canceled: string
    }
}