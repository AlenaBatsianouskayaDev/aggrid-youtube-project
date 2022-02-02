import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { videosReducer } from './store/videos.reducers';
import { VideosEffects } from './store/videos.effects';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot({
      videos: videosReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
      autoPause: true, 
    }),
    EffectsModule.forRoot([VideosEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
