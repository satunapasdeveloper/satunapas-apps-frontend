import { HttpBaseResponse } from "../../http/http-request.model"

export namespace AuthenticationModel {
    export interface IAuthentication {
        nama: string
        username: string
        layanan: string
        host: string
        token: string
    }


    export interface ISignIn {
        username: string
        password: string
    }

    export class SignIn implements HttpBaseResponse {
        responseResult!: boolean
        message!: string
        data!: IAuthentication
    }
}