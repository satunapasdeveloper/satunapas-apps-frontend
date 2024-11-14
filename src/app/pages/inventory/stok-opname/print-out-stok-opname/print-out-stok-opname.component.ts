import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { GridModel } from 'src/app/model/components/grid.model';
import { StokOpnameService } from 'src/app/services/inventory/stok-opname.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-print-out-stok-opname',
    standalone: true,
    imports: [
        CommonModule,
        GridComponent
    ],
    templateUrl: './print-out-stok-opname.component.html',
    styleUrl: './print-out-stok-opname.component.scss'
})
export class PrintOutStokOpnameComponent implements OnInit {

    Data: any;

    GridProps: GridModel.IGrid = {
        id: 'DetailStokOpname',
        column: [
            { field: 'code', headerName: 'Kode Item', class: 'font-semibold text-xs' },
            { field: 'nama_item', headerName: 'Nama Item', class: 'text-xs' },
            { field: 'satuan', headerName: 'Satuan', class: 'text-xs' },
            { field: 'qty_sistem', headerName: 'Qty Sistem', format: 'number', class: 'text-xs' },
            { field: 'hpp_sistem', headerName: 'Hpp Sistem', format: 'currency', class: 'text-xs' },
            { field: 'harga_jual_sistem', headerName: 'Harga Jual Sistem', format: 'currency', class: 'text-xs' },
            { field: 'qty_fisik', headerName: 'Qty Fisik', format: 'number', class: 'text-xs' },
            { field: 'hpp_fisik', headerName: 'Hpp Fisik', format: 'currency', class: 'text-xs' },
            { field: 'harga_jual_fisik', headerName: 'Harga Fisik', format: 'currency', class: 'text-xs' },
            { field: 'selisih', headerName: 'Selisih', format: 'number', class: 'text-xs' },
            { field: 'hpp_selisih', headerName: 'Hpp Selisih', format: 'currency', class: 'text-xs' },
            { field: 'harga_jual_selisih', headerName: 'Harga Selisih', format: 'currency', class: 'text-xs' },
        ],
        dataSource: [],
        height: "calc(100vh - 14.5rem)",
        showPaging: false,
        showSearch: false,
        showSort: false,
        searchKeyword: 'no_trans',
        searchPlaceholder: 'Cari No. Faktur Disini',
        totalRows: 0,
    };

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _stokOpnameService: StokOpnameService,
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.getDetail();
        }, 500);
    }

    private getDetail() {
        const id = this._activatedRoute.snapshot.params['id'];

        this._stokOpnameService
            .getById(id)
            .subscribe((result) => {
                if (result.responseResult) {
                    (<any>result.data.tanggal) = this._utilityService.onFormatDate(new Date(result.data.tanggal), 'DD-MMM-yyyy');

                    this.Data = result.data;

                    this.GridProps.dataSource = result.data.detail.map((item: any) => {
                        (<any>item.qty_sistem) = parseInt(item.qty_sistem);
                        (<any>item.qty_fisik) = parseInt(item.qty_fisik ? item.qty_fisik : 0);

                        return {
                            ...item,
                            nama_item: item.item.nama_item
                        }
                    });

                    setTimeout(() => {
                        // window.print();
                    }, 1000);
                }
            })
    }

}
