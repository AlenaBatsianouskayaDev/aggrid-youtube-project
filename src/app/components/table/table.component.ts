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
import { CustomStatsToolPanel } from './custom-tool-bar/custom-tool-bar.component';

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
  public rowHeight: any = 100;

  public rowData$: Observable <ITableData[]>;
  public videos$: Observable<any> = this.store.select(getTableData);
  public columnDefs: ColDef[];
  public SEARCH_URL: string = 'https://www.youtube.com/watch?v=';


  public icons: any;
  public sideBar: any;
  public frameworkComponents: any;

  constructor(
    private store: Store
    ) {}

  ngOnInit(): void {
    this.rowData$ = this.store.select(getTableData);

    this.columnDefs = [
      { 
        headerName: '', 
        field: 'preview',
        cellRenderer(params) {
          return `<img src=${params.value} alt='video preview'>`
        },
        cellStyle: {'justify-content': 'center'}
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
      cellStyle: {
        'display': 'flex', 
        'align-items': 'center', 
        'justify-content': 'flex-start', 
        'white-space': 'normal'}
    };

    this.icons = {
      'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>',
    };
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
        {
          id: 'customStats',
          labelDefault: 'Custom Stats',
          labelKey: 'customStats',
          iconKey: 'custom-stats',
          toolPanel: 'customStatsToolPanel',
        },
      ],
      defaultToolPanel: 'customStats',
    };
    this.frameworkComponents = { customStatsToolPanel: CustomStatsToolPanel };
  } 

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getContextMenuItems(params: any): (string | MenuItemDef)[] {
    
    if (params.column.colId !== 'videoTitle') {
      return [];
    }

    const contextMenu = [
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
 

