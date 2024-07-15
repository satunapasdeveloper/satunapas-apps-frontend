import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './status.component.html',
    styleUrl: './status.component.scss'
})
export class StatusComponent implements AfterViewInit, OnDestroy {

    Status: any[] = [
        {
            id: 'pulang',
            icon: 'home',
            label: 'Pulang'
        },
        {
            id: 'rujuk_rajal',
            icon: 'home',
            label: 'Rujuk Rawat Jalan'
        },
        {
            id: 'rujuk_ranap',
            icon: 'home',
            label: 'Rujuk Rawat Inap'
        },
        {
            id: 'meninggal',
            icon: 'home',
            label: 'Meninggal'
        },
    ];

    SelectedStatus: 'pulang' | 'rujuk_rajal' | 'rujuk_ranap' | 'meninggal' = 'pulang';

    ngAfterViewInit(): void {
        setTimeout(() => {
            const status: any = localStorage.getItem('status');

            if (status) {
                this.SelectedStatus = status;
            } else {
                this.SelectedStatus = 'pulang';
            }
        }, 100);
    }

    ngOnDestroy(): void {
        localStorage.setItem('status', this.SelectedStatus);
    }
}
