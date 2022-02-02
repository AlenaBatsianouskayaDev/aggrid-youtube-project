import { Component, ViewChild, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { Store } from '@ngrx/store';

import { ApiService } from 'src/app/services/api.service';
import { ITableData } from 'src/app/interfaces/interfaces';
import { addVideosData } from 'src/app/store/videos.actions';

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
    private store: Store
    ) {}

  ngOnInit(): void {
    this._apiService.getPopularVideos('cat')
      .pipe(
        first())
      .subscribe(val => 
        this.rowData = val.items.map ((data: any) => 
          this.store.dispatch(addVideosData({
          preview: data.snippet.thumbnails.default.url, 
          publishedOn: data.snippet.publishedAt , 
          videoTitle: data.snippet.title , 
          description: data.snippet.description}))
        )
      )
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
 

