import { HttpBaseResponse } from "../../http/http-request.model"

export namespace StokOpnameModel {
    export interface IListStokOpname {
        id_stock_opname: string
        tanggal: string
        no_trans: string
        keterangan: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: string
        status: string
        keterangan_validasi: any
        validated_at: any
        validated_by: any
        total_selisih_qty: any
        total_selisih_hpp: any
        total_selisih_harga_jual: any
    }

    export class GetAll implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: {
            totalRows: number;
            page: number;
            rows: IListStokOpname[]
        }
    }

    export interface IDetail {
        id_stock_opname: string
        tanggal: string
        no_trans: string
        keterangan: string
        created_at: string
        created_by: string
        updated_at: string
        updated_by: string
        status: string
        keterangan_validasi: any
        validated_at: any
        validated_by: any
        total_selisih_qty: any
        total_selisih_hpp: any
        total_selisih_harga_jual: any
        detail: {
            id_stock_opname_detail: string
            id_stock_opname: string
            id_item: string
            batch: any
            expired_date: any
            qty_sistem: number
            hpp_sistem: number
            harga_jual_sistem: number
            qty_fisik: number
            hpp_fisik: number
            harga_jual_fisik: number
            selisih: number
            hpp_selisih: number
            harga_jual_selisih: number
            item: {
                nama_item: string
                code?: string
                satuan: string
            }
        }[]
    }

    export class GetById implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IDetail
    }

    export interface IItemStokOpname {
        id_item: string
        uuid: string
        kode_kfa: string
        is_active: boolean
        nama_item: string
        code: any
        kategori: string
        satuan: string
        harga_jual: number
        hpp_average: number
        stock: number
    }

    export class GetItemStokOpname implements HttpBaseResponse {
        responseResult!: boolean
        statusCode!: number
        message!: string
        data!: IItemStokOpname[]
    }

    export interface Create {
        tanggal: string
        keterangan: string
        detail: {
            id_item: number
            qty_sistem: number
            hpp_sistem: number
            harga_jual_sistem: number
        }[]
    }

    export interface Update {
        id_stock_opname: number
        tanggal: string
        keterangan: string
        total_selisih_qty: number
        total_selisih_hpp: number
        total_selisih_harga_jual: number
        detail: {
            id_stock_opname_detail: number
            id_item: number
            batch: string
            expired_date: string
            qty_sistem: number
            hpp_sistem: number
            harga_jual_sistem: number
            qty_fisik: number
            hpp_fisik: number
            harga_jual_fisik: number
            selisih: number
            hpp_selisih: number
            harga_jual_selisih: number
        }[]
    }
}