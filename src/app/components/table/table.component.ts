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
import { tableHeader } from 'src/app/constants/tableHeader.const';

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
  public columnDefs: ColDef[] = tableHeader;

  constructor(
    private localStorage: LocalStorageService,
    private commonService: CommonService,
    private store: Store
    ) {}

  ngOnInit(): void {

    this.dataFromStorage = this.localStorage.loadFromLocalStorage('videosData');
    if(this.dataFromStorage) {
      const a = this.commonService.makeTableData(this.dataFromStorage)
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
 

