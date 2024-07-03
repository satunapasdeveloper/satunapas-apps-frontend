import { PostRequestByDynamicFiterModel } from "src/app/model/http/http-request.model";
import { PendaftaranPasienBaruModel } from "src/app/model/pages/pis/pendaftaran-pasien-baru/pendaftaran-pasien-baru.model";

export namespace PendaftaranPasienBaruActions {
    export class CheckPersonByNoIdentitas {
        static readonly type = '[PENDAFTARAN PASIEN BARU] Check Person By No Identitas';
        constructor(public payload: string) { }
    }

    export class GetAllPasien {
        static readonly type = '[PENDAFTARAN PASIEN BARU] Get All Pasien';
        constructor(public payload: PostRequestByDynamicFiterModel[]) { }
    }

    export class GetByIdPerson {
        static readonly type = '[PENDAFTARAN PASIEN BARU] Get By Id Person';
        constructor(public payload: number) { }
    }

    export class CreatePasien {
        static readonly type = '[PENDAFTARAN PASIEN BARU] Create Pasien';
        constructor(public payload: PendaftaranPasienBaruModel.Person) { }
    }

    export class CreatePersonSudahAda {
        static readonly type = '[PENDAFTARAN PASIEN BARU] Create Person Sudah Ada';
        constructor(public payload: PendaftaranPasienBaruModel.IPersonSudahAda) { }
    }

    export class GetFromBpjsByNoKartu {
        static readonly type = '[PENDAFTARAN PASIEN BARU] Get BPJS By No Kartu';
        constructor(public payload: string) { }
    }
}