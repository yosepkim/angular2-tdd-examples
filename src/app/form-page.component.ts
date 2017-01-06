import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgRedux} from 'ng2-redux';
import {AppState} from './app.model';
import {FormModel} from './form-model';
import {FormActions} from "./form-actions";


@Component({
  selector: 'info-form',
  template: `
      <div data-test='infoForm'>
      <h1>Info Form</h1>
        <form [formGroup]='myForm'>
          <div class='form-group'>
            <label for='name'>Name</label>
            <input type='text' formControlName='name' data-test='name' required>
          </div>
          <div class='form-group'>
            <label for='type'>Type</label>
            <input type='text' formControlName='type' data-test='type'>
          </div>
          <button type='submit' data-test='submit' [disabled]='myForm.invalid'>Submit</button>
        </form>
      </div>

`
})

export class FormPageComponent {
    myForm: FormGroup;
    formData: FormModel;

   constructor( _formBuilder: FormBuilder, private _ngRedux: NgRedux<AppState>, private _formActions: FormActions) {
     this._ngRedux.select(['formData'])
       .subscribe(formData =>
         this.formData = formData);

     this.myForm = _formBuilder.group({
       name: [this.formData.name, Validators.required],
       type: [this.formData.type],
     });
   }

   saveForm(){
      this._formActions.saveForm(this.myForm.value);
   }
}
