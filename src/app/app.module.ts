import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgReduxModule, NgRedux, DevToolsExtension} from 'ng2-redux';
import { rootReducer } from './reducers';

import { AppComponent } from './app.component';
import {AppState} from './app.model';

const createLogger = require('redux-logger');

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

   constructor(private ngRedux: NgRedux<AppState>, private devTools: DevToolsExtension) {
     let initialAppState: AppState = {
      formData: { name: '', type: ''}};

     let enhancers = [createLogger()];
     if (devTools.isEnabled()) {
       enhancers = [...enhancers, devTools.enhancer()];
     }

     this.ngRedux.configureStore(
       rootReducer,
       initialAppState,
       [],
       enhancers);
   };
