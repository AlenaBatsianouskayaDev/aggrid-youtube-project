import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { videosReducer } from './store/videos.reducers';
import { VideosEffects } from './store/videos.effects';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBlockComponent } from './components/search-block/search-block.component';
import { MainComponent } from './components/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SearchBlockComponent,
    MainComponent
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
    EffectsModule.forRoot([VideosEffects]),
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
