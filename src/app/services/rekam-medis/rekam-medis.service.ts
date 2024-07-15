import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RekamMedisService {

    BodyParts: any[] = [
        { id: 'kulit', label: 'Kulit', keterangan: '' },
        { id: 'kuku', label: 'Kuku', keterangan: '' },
        { id: 'kepala', label: 'Kepala', keterangan: '' },
        { id: 'wajah', label: 'Wajah', keterangan: '' },
        { id: 'mata', label: 'Mata', keterangan: '' },
        { id: 'telinga', label: 'Telinga', keterangan: '' },
        { id: 'hidung', label: 'Hidung', keterangan: '' },
        { id: 'mulut', label: 'Mulut', keterangan: '' },
        { id: 'gigi', label: 'Gigi', keterangan: '' },
        { id: 'leher', label: 'Leher', keterangan: '' },
        { id: 'tenggorokan', label: 'Tenggorokan', keterangan: '' },
        { id: 'tonsil', label: 'Tonsil', keterangan: '' },
        { id: 'dada', label: 'Dada', keterangan: '' },
        { id: 'payudara', label: 'Payudara', keterangan: '' },
        { id: 'punggung', label: 'Punggung', keterangan: '' },
        { id: 'perut', label: 'Perut', keterangan: '' },
        { id: 'genital', label: 'Genital', keterangan: '' },
        { id: 'anus / dubur', label: 'Anus / Dubur', keterangan: '' },
        { id: 'lengan atas', label: 'Lengan Atas', keterangan: '' },
        { id: 'lengan bawah', label: 'Lengan Bawah', keterangan: '' },
        { id: 'jari tangan', label: 'Jari Tangan', keterangan: '' },
        { id: 'kuku tangan', label: 'Kuku Tangan', keterangan: '' },
        { id: 'persendian tangan', label: 'Persendian Tangan', keterangan: '' },
        { id: 'tungkai atas', label: 'Tungkai Atas', keterangan: '' },
        { id: 'tungkai bawah', label: 'Tungkai Bawah', keterangan: '' },
        { id: 'jari kaki', label: 'Jari Kaki', keterangan: '' },
        { id: 'kuku kaki', label: 'Kuku Kaki', keterangan: '' },
        { id: 'persendian kaki', label: 'Persendian Kaki', keterangan: '' },
        { id: 'lainnya', label: 'Lainnya', keterangan: '' }
    ];

    WaktuPemberianObat: any[] = [
        { label: 'Pagi', value: 'Pagi' },
        { label: 'Siang', value: 'Siang' },
        { label: 'Sore', value: 'Sore' },
        { label: 'Lain - Lain', value: 'Lain - Lain' },
    ];

    WaktuSpesifikPemberianObat: any[] = [
        { label: 'Sebelum Makan', value: 'Sebelum Makan' },
        { label: 'Sesudah Makan', value: 'Sesudah Makan' },
        { label: 'Bersamaan Makan', value: 'Bersamaan Makan' },
        { label: 'Lain - Lain', value: 'Lain - Lain' },
    ];

    RutePemberianObat: any[] = [
        { label: 'Injeksi', value: 'Injeksi' },
        { label: 'Oral', value: 'Oral' },
        { label: 'Suppositoria', value: 'Suppositoria' },
        { label: 'Topikal', value: 'Topikal' },
        { label: 'Sublingual', value: 'Sublingual' },
        { label: 'Inhalasi', value: 'Inhalasi' },
    ];

    constructor() { }

    getRekamMedisPasien() {
        const tindakan: any = localStorage.getItem('tindakan');
        const bmhp: any = localStorage.getItem('bmhp');
        const resep_non_racikan: any = localStorage.getItem('resep_non_racikan');
        const resep_racikan: any = localStorage.getItem('resep_racikan');

        let data_billing = {
            tindakan: JSON.parse(tindakan),
            bmhp: JSON.parse(bmhp),
            resep: [
                ...JSON.parse(resep_non_racikan),
                ...JSON.parse(resep_racikan),
            ],
        };

        return of(data_billing);
    }
}
