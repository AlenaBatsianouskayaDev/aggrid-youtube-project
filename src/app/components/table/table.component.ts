import { Component, ViewChild, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { Store } from '@ngrx/store';

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

  public rowData: ITableData[];
  public videos$: Observable<any> = this.store.select(getTableData);
  
  public columnDefs: ColDef[] = tableHeader;

  constructor(
    private store: Store
    ) {}

  ngOnInit(): void {
    
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
 

