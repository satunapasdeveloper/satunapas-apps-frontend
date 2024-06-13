
import { WilayahModel } from '../../../../model/pages/pis/setup-data/setup-wilayah.model'

export namespace SetupWilayahActions {
    // ** Provinsi
    export class GetAllProvinsi {
        static readonly type = '[SETUP WILAYAH] Get All Provinsi';
    }

    export class CreateProvinsi {
        static readonly type = '[SETUP WILAYAH] Create Provinsi';
        constructor(public payload: WilayahModel.CreateWilayah) { }
    }

    export class UpdateProvinsi {
        static readonly type = '[SETUP WILAYAH] Update Provinsi';
        constructor(public payload: WilayahModel.UpdateWilayah) { }
    }

    export class DeleteProvinsi {
        static readonly type = '[SETUP WILAYAH] Delete Provinsi';
        constructor(public payload: string) { }
    }

    // ** Kota
    export class GetAllKota {
        static readonly type = '[SETUP WILAYAH] Get All Kota';
    }

    export class GetAllKotaByKodeProvinsi {
        static readonly type = '[SETUP WILAYAH] Get All Kota By Kode Provinsi';
        constructor(public payload: { kode_wilayah: string }) { }
    }

    export class CreateKota {
        static readonly type = '[SETUP WILAYAH] Create Kota';
        constructor(public payload: WilayahModel.CreateWilayah) { }
    }

    export class UpdateKota {
        static readonly type = '[SETUP WILAYAH] Update Kota';
        constructor(public payload: WilayahModel.UpdateWilayah) { }
    }

    export class DeleteKota {
        static readonly type = '[SETUP WILAYAH] Delete Kota';
        constructor(public payload: string) { }
    }

    // ** Kecamatan
    export class GetAllKecamatan {
        static readonly type = '[SETUP WILAYAH] Get All Kecamatan';
    }

    export class GetAllKecamatanByKodeKota {
        static readonly type = '[SETUP WILAYAH] Get All Kecamatan By Kode Kota';
        constructor(public payload: { kode_wilayah: string }) { }
    }

    export class CreateKecamatan {
        static readonly type = '[SETUP WILAYAH] Create Kecamatan';
        constructor(public payload: WilayahModel.CreateWilayah) { }
    }

    export class UpdateKecamatan {
        static readonly type = '[SETUP WILAYAH] Update Kecamatan';
        constructor(public payload: WilayahModel.UpdateWilayah) { }
    }

    export class DeleteKecamatan {
        static readonly type = '[SETUP WILAYAH] Delete Kecamatan';
        constructor(public payload: string) { }
    }
}