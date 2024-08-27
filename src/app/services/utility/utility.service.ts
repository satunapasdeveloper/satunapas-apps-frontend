import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    ShowLoading$ = new BehaviorSubject(false);

    ShowSidebar$ = new BehaviorSubject(false);

    ShowTopMenu$ = new BehaviorSubject(false);

    constructor() { }

    getVersion(): string {
        return "0.0.1";
    }

    exportToPdf(divId: string, fileTitle: string) {
        let data = document.getElementById(`${divId}`) as any;
        html2canvas(data).then(canvas => {
            let imgWidth = 208;
            let pageHeight = 295;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jspdf('p', 'mm', 'a4');
            let position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save(`${fileTitle}.pdf`);
        });
    }
}
