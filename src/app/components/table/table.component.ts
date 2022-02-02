import { Component, ViewChild, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiService } from 'src/services/api.service';
import { ITableData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;
  public rowData: ITableData[];
  dataRequest$: Observable<any>
  dataRequestSubscription: Subscription;

  columnDefs: ColDef[] = [
    { 
      headerName: '', 
      field: 'preview', 
      sortable: true, 
      filter: true, 
      checkboxSelection: true 
    },
    { 
      headerName: 'Published on', 
      field: 'publishedOn', 
      sortable: true, 
      filter: true 
    },
    { 
      headerName: 'Video Title', 
      field: 'videoTitle', 
      sortable: true, 
      filter: true 
    },
    { 
      headerName: 'Description', 
      field: 'description', 
      sortable: true, 
      filter: true 
    }
  ];

  constructor(
    private _apiService: ApiService,
    ) {}

  ngOnInit(): void {
    this._apiService.getQuery('cat')
      .pipe(
        // takeUntil(this.destroy$)) 
        first())
      .subscribe(val => 
        this.rowData = val.items.map ((data: any) => ({
          preview: data.snippet.thumbnails.default.url, 
          publishedOn: data.snippet.publishedAt , 
          videoTitle: data.snippet.title , 
          description: data.snippet.description})
        )
      )
    // this.rowData = [
    //   { preview: 'a', publishedOn: 'rfhf', videoTitle: 'dgdfrf', description: 'rfhfh' },
    //   { preview: 'rdgdf', publishedOn: 'rfhfd', videoTitle: 'rfgdf', description: 'rfhfhd' },
    //   { preview: 'rfh', publishedOn: 'rfhf', videoTitle: 'rfhf', description: 'rfhf'},
    //   { preview: 'rfhdf', publishedOn: 'rfhfh', videoTitle: 'rfhfd', description: 'rfh'}
    // ] 
  }

  // getSelectedRows(): void {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map(node => node.data);
    // const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');
    
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    
  // }

  // interface GetContextMenuItemsParams {
  //   // Names of the items that would be provided by default. 
  //   defaultItems: string[] | undefined;
  // }

  // getContextMenuItems = (params: GetContextMenuItemsParams
  // ) => (string | MenuItemDef)[];

  

  getContextMenuItems(params: any) {
    let result = [
      'copy',
      'separator',
      'chartRange',
      'paste'
    ];
    return result;
  }
}
 

