import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { GridModel } from 'src/app/model/components/grid.model';
import { ColDef, GridApi, ColumnApi, GridReadyEvent } from 'ag-grid-community';
import { TableModule } from 'primeng/table'
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [
        CommonModule,
        // AgGridModule
        TableModule,
        OverlayPanelModule,
    ],
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

    @Input('props') props!: GridModel.IGrid;

    @Output('cellClicked') cellClicked = new EventEmitter<any>();

    @Output('rowDoubleClicked') rowDoubleClicked = new EventEmitter<any>();

    // @Output('toolbarClicked') toolbarClicked = new EventEmitter<GridModel.IGridToolbar>();

    // @Output('cellFinishEdited') cellFinishEdited = new EventEmitter<any>();

    @Output('aksiClicked') aksiClicked = new EventEmitter<any>();

    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    gridApi!: GridApi;

    gridColumnApi!: ColumnApi;

    gridToolbar: GridModel.IGridToolbar[] = [];

    SelectedRow: any;

    constructor(
        // private _documentService: DocumentService,
    ) { };

    ngOnInit(): void {
        this.onGridReady();
    }

    onGridReady(): void {
        const column = this.props.column.map((item) => {
            return {
                id: item.field,
                renderAsCheckbox: item.renderAsCheckbox ? item.renderAsCheckbox : false,
                ...item
            }
        });

        this.props.column = column as any;

        console.log("column =>", this.props.column);

        if (this.props.toolbar?.length) {
            this.props.toolbar.forEach((item) => {
                let icon = "";

                switch (item) {
                    case 'Add':
                        icon = 'pi pi-plus';
                        break;
                    case 'Edit':
                        icon = 'pi pi-file-edit';
                        break;
                    case 'Delete':
                        icon = 'pi pi-trash';
                        break;
                    case 'Detail':
                        icon = 'pi pi-info-circle';
                        break;
                    default:
                        break;
                }

                this.gridToolbar.push({
                    id: item.toLowerCase(),
                    title: item,
                    icon: icon
                });
            });
        };
    }

    onCellClicked(args: any): void {
        this.cellClicked.emit(args.data);
    }

    onRowDoubleClicked(args: any): void {
        this.rowDoubleClicked.emit(args.data);
    }

    onToolbarClicked(args: GridModel.IGridToolbar): void {
        if (args.id == 'excel') {
            this.handleExportExcel();
        } else {
            // this.toolbarClicked.emit(args);
        }
    }

    onAksiClicked(type: string, data: any) {
        this.aksiClicked.emit({ type: type, data: data });
    }

    private handleExportExcel(): void {
        const dataSource: any[] = this.props.dataSource;

        const worksheetName = this.props.id ? this.props.id : 'mini-erp';

        if (dataSource.length) {
            let column = [];

            for (const data of Object.keys(dataSource[0])) {
                column.push({
                    header: data.replace(/_/g, " ").toUpperCase(),
                    key: data,
                    width: 20,
                });
            }

            console.log("Exporting to excel...");

            // this._documentService.exportToExcel({
            //     worksheetName: worksheetName,
            //     columns: column,
            //     dataSource: dataSource
            // });
        }
    }
}
