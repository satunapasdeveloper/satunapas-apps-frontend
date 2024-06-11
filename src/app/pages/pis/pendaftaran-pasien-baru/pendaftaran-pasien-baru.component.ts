import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LayoutModel } from 'src/app/model/components/layout.model';
import { OffcanvasFilterComponent } from 'src/app/components/filter/offcanvas-filter/offcanvas-filter.component';

@Component({
    selector: 'app-pendaftaran-pasien-baru',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        OffcanvasFilterComponent,
    ],
    templateUrl: './pendaftaran-pasien-baru.component.html',
    styleUrls: ['./pendaftaran-pasien-baru.component.scss']
})
export class PendaftaranPasienBaruComponent {

    ButtonNavigation: LayoutModel.IButtonNavigation[] = [
        {
            id: 'save',
            title: 'Simpan',
            icon: 'pi pi-save'
        }
    ];

    handleClickButtonNavigation(data: LayoutModel.IButtonNavigation) {
        console.log(data);
    }
}
