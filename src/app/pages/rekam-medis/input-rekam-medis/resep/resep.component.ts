import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-resep',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
    ],
    templateUrl: './resep.component.html',
    styleUrl: './resep.component.scss'
})
export class ResepComponent implements OnInit {

    ResepNonRacikan: any[] = [];

    ResepRacikan: any[] = [];

    ResepManual: any[] = [];

    ngOnInit(): void {

    }
}
