import { AssesmentModel } from "src/app/model/pages/rekam-medis/assesment.model";

export namespace RekamMedisActions {
    export class GetAllRekamMedis {
        static readonly type = '[REKAM MEDIS] Get All Rekam Medis';
        constructor(public payload: any[]) { }
    }

    export class GetByIdRekamMedis {
        static readonly type = '[REKAM MEDIS] Get By Id Pendaftaran';
        constructor(public payload: string) { }
    }

    export class GetAllVariableRekamMedis {
        static readonly type = '[REKAM MEDIS] Get All Variable';
    }

    export class CreateAssessment {
        static readonly type = '[REKAM MEDIS] Create Assessment';
        constructor(public payload: AssesmentModel.IAssesment) { }
    }
}