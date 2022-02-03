import { Component, ViewChild, OnInit } from '@angular/core';
import { ColDef, Column, MenuItemDef, GetContextMenuItemsParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { Store } from '@ngrx/store';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { ITableData } from 'src/app/interfaces/interfaces';
import { getTableData } from 'src/app/store/videos.selectors';
import { tableHeader } from 'src/app/constants/tableHeader.const';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;
  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowData$: Observable <ITableData[]>;
  public videos$: Observable<any> = this.store.select(getTableData);
  public columnDefs: ColDef[];
  public SEARCH_URL: string = 'https://www.youtube.com/watch?';

  constructor(
    private store: Store
    ) {}

  ngOnInit(): void {
    this.rowData$ = this.store.select(getTableData);

    this.columnDefs = [
      { 
        headerName: '', 
        field: 'preview', 
        checkboxSelection: true,
      },
      { 
        headerName: 'Published on', 
        field: 'publishedOn', 
      },
      { 
        headerName: 'Video Title', 
        field: 'videoTitle', 
        cellRenderer(params) {
          return `<a href= https://www.youtube.com/watch?v=${params.data.id}&list=LL target="_blank">`+ params.value +`</a>`
        },
      
      },
      { 
        headerName: 'Description', 
        field: 'description', 
      }
    ];
    
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
      filter: true,
      sortable: true,
    };
  } 

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getContextMenuItems(params: any): (string | MenuItemDef)[] {
    
    if (params.column.colId !== 'videoTitle') {
      return [];
    }

    let contextMenu = [
      'copy',
      {
        name: 'Open in new tab',
        action: function () {
          window.open(`https://www.youtube.com/watch?v=${params.node.data.id}&list=LL`, "_blank")
        },
      },
      'paste'
    ];
    return contextMenu;
  }
}
 

