import { HttpBaseResponse } from "src/app/model/http/http-request.model";

export namespace PendaftaranPasienBaruModel {
    export interface IPerson {
        id_jenis_identitas: number;
        no_identitas: string;
        no_kartu_keluarga?: string;
        nama_depan: string;
        nama_belakang?: string;
        nama_panggilan?: string;
        gelar_depan?: string;
        gelar_belakang?: string;
        gender: string;
        path_foto?: string;
        nama_foto?: string;
        gol_darah?: string;
        tempat_lahir?: string;
        tanggal_lahir: Date;
        tinggi_badan_cm?: number;
        berat_badan_kg?: number;
        id_marital_status?: number;
        id_agama?: number;
        id_kebangsaan?: number;
        id_etnis?: number;
        id_bahasa?: number;
        id_last_education?: number;
        id_job_type?: number;
        user_created: number;
    }

    export interface IAlamatPerson {
        alamat_lengkap: string;
        kode_pos?: string;
        rt?: string;
        rw?: string;
        kelurahan?: string;
        kode_wilayah: string;
        user_created: number;
    }

    export interface IKontakPerson {
        hand_phone?: string;
        home_phone?: string;
        office_phone?: string;
        email?: string;
        keterangan?: string;
        user_created: number;
    }

    export interface IDebiturPasien {
        id_debitur?: number;
        no_member: string;
        tgl_aktif_member?: Date;
        tgl_expired_member?: Date;
        keterangan: string;
    }

    export interface IPasien {
        keterangan: string;
        no_rekam_medis: string;
    }

    export interface Person {
        person: IPerson;
        alamat_person: IAlamatPerson[];
        kontak_person: IKontakPerson[];
        debitur_pasien: IDebiturPasien[];
        pasien: IPasien;
    }

    export interface IPersonSudahAda {
        id_person: number;
        pasien: IPasien;
        debitur_pasien: IDebiturPasien[];
    }

    export class GetAllPasien implements HttpBaseResponse {
        responseResult!: boolean;
        data!: Person[];
        message!: string;
    }

    export class GetByIdPasien implements HttpBaseResponse {
        responseResult!: boolean;
        data!: Person;
        message!: string;
    }

    export interface UpdateDetailPerson {
        id_person: number;
        id_jenis_identitas: number;
        no_identitas: string;
        no_kartu_keluarga?: string;
        nama_depan: string;
        nama_belakang?: string;
        nama_panggilan?: string;
        gelar_depan?: string;
        gelar_belakang?: string;
        gender: string;
        path_foto?: string;
        nama_foto?: string;
        gol_darah?: string;
        tempat_lahir?: string;
        tanggal_lahir: Date;
        tinggi_badan_cm?: number;
        berat_badan_kg?: number;
        id_marital_status?: number;
        id_agama?: number;
        id_kebangsaan?: number;
        id_etnis?: number;
        id_bahasa?: number;
        id_last_education?: number;
        id_job_type?: number;
    }

    export interface UpdateAlamatPerson {
        id_alamat_person?: number;
        id_person: number;
        alamat_lengkap: string;
        kode_pos?: string;
        rt?: string;
        rw?: string;
        kelurahan?: string;
        kode_wilayah: string;
        is_default: boolean;
    }

    export interface UpdateStatusAlamatPerson {
        id_person: number;
        id_alamat_person: number;
        is_active: boolean;
    }

    export interface UpdateKontakPerson {
        id_alamat_person: number;
        id_person: number;
        hand_phone?: string;
        home_phone?: string;
        office_phone?: string;
        email?: string;
        keterangan?: string;
        is_default: boolean;
    }

    export interface UpdateStatusKontakPerson {
        id_person: number;
        id_kontak_person: number;
        is_active: boolean;
    }

    export interface UpdateDebiturPasien {
        id_alamat_person: number;
        id_person: number;
        id_debitur?: number;
        no_member: string;
        tgl_aktif_member?: Date;
        tgl_expired_member?: Date;
        keterangan: string;
        is_default: boolean;
    }

    export interface UpdateStatusDebiturPerson {
        id_person: number;
        id_debitur: number;
        is_active: boolean;
    }
}