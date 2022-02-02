import { Component, ViewChild, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { Store } from '@ngrx/store';

import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ITableData, IResponseVideoData } from 'src/app/interfaces/interfaces';
import { addVideosData, videosRequest } from 'src/app/store/videos.actions';
import { getTableData } from 'src/app/store/videos.selectors';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  public rowData: ITableData[];
  public videos$: Observable<any> = this.store.select(getTableData);
  private dataFromStorage: IResponseVideoData | null | undefined;

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
    private localStorage: LocalStorageService,
    private commonService: CommonService,
    private store: Store
    ) {}

  ngOnInit(): void {

    this.dataFromStorage = this.localStorage.loadFromLocalStorage('videosData');
    if(this.dataFromStorage) {
      const a = this.commonService.makeTableData(this.dataFromStorage)
      console.log(a)
      this.store.dispatch(addVideosData(this.dataFromStorage))
    } else {
      this.store.dispatch(videosRequest());
    }
  } 

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
 

