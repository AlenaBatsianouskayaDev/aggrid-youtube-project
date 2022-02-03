import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { videosRequest } from 'src/app/store/videos.actions';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent implements OnInit {

  public search: string = '';
  public searchChanged: Subject<string> = new Subject<string>();
  private debounceTime: number = 1000;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.searchChanged.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged())
      .subscribe(() => this.store.dispatch(videosRequest())
    )
  }

  public onChanged(): void {
    this.searchChanged.next(this.search)
  }
}
