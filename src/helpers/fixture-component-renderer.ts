import {Type} from '@angular/core';
import {AppState} from '../app/app.model';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgRedux} from 'ng2-redux';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { rootReducer } from '../app/reducers';
import {FormActions} from "../app/form-actions";


export class FixtureComponentRenderer {

  public static renderForm<T> (componentType: Type<T>, appState: AppState): ComponentFixture<T> {

    let ngRedux: NgRedux<AppState> = new NgRedux<AppState>();
    ngRedux.configureStore(rootReducer, appState);

    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule],
      declarations: [componentType],
      providers: [
        FormActions,
        {provide: NgRedux, useValue: ngRedux}
      ]
    });

    return TestBed.createComponent(componentType);
  }
}
