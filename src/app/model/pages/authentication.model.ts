import { HttpBaseResponse } from "../http/http-request.model"

export namespace AuthenticationModel {
    export interface IAuthentication {
        id_user: number
        id_karyawan: number
        id_role: number
        id_outlet: number
        nama_role: string
        user_name: string
        id_tenant: number;
        full_name: string
        token: string
        menuJson: MenuJson
        timeOut: number
    }

    export interface MenuJson {
        mainMenu: MainMenu[]
        topMenu: TopMenu[]
        sidebarMenu: SidebarMenu[]
    }

    export interface MainMenu {
        id_menu: number
        caption: string
        id_menu_parent: number
        is_parent: boolean
        icon: string
    }

    export interface TopMenu {
        id_menu: number
        caption: string
        id_menu_parent: number
        is_parent: boolean
        icon: string
    }

    export interface SidebarMenu {
        id_menu_sidebar: number
        caption: string
        icon: string
        url: string
        is_parent: boolean
        id_menu_sidebar_parent: number
        id_top_menu: number
        button: Button[]
        fieldgrid: Fieldgrid[]
        sidebarChild: string[]
    }

    export interface Button {
        id_jenis_button: number
        caption: string
        keterangan: string
        stack_icon: string
        icon: string
        icon2: string
    }

    export interface Fieldgrid {
        id_field_grid: number
        id_menu_sidebar: number
        nama_asli_field: string
        nama_header_text: string
        width_field: number
        tipe_field: string
        format_field: string
        keterangan: string
    }

    export interface ISignIn {
        user_name: string
        password: string
        app_tipe: string
    }

    export class SignIn implements HttpBaseResponse {
        responseResult!: boolean
        message!: string
        data!: IAuthentication
    }
}