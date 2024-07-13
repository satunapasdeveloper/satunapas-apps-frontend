import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './status.component.html',
    styleUrl: './status.component.scss'
})
export class StatusComponent {

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
}
