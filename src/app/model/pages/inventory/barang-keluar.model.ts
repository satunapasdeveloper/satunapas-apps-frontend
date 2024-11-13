import { HttpBaseResponse } from "../../http/http-request.model"

export namespace BarangKeluarModel {
    export interface IListBarangKeluar {
        id_barang_keluar: string
        tanggal: string
        no_trans: string
        keterangan: any
        grand_total: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: any
        canceled_at: string
        canceled_by: string
        reason_canceled: string
        status: string
    }

    export class GetAll implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: {
            totalRows: number;
            page: number;
            rows: IListBarangKeluar[]
        }
    }

    export interface IDetail {
        id_barang_keluar: string
        tanggal: string
        no_trans: string
        keterangan: any
        grand_total: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: any
        canceled_at: string
        canceled_by: string
        reason_canceled: string
        status: string
        detail: {
            id_barang_keluar_detail: string
            id_barang_keluar: string
            id_item: string
            qty: string
            harga_jual: string
            subtotal: string
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
        keterangan: string
        grand_total: number
        detail: {
            id_item: number
            qty: number
            harga_jual: number
            subtotal: number
        }[]
    }

    export interface Cancel {
        id_barang_keluar: number
        reason_canceled: string
    }
}