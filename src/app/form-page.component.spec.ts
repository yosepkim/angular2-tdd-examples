import {Type} from '@angular/core';
import {ComponentFixture, inject} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormPageComponent} from './form-page.component';
import {AppState} from './app.model';
import {FixtureComponentRenderer} from '../helpers/fixture-component-renderer';
import {FormActions} from "./form-actions";


describe('Component: FormPageComponent', () => {
  let formPage: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  describe('when AppState is empty', () => {

    beforeEach(() => {
      fixture = FixtureComponentRenderer.renderForm(FormPageComponent as Type<FormPageComponent>, {formData: { name: '', type: ''}});
      formPage = fixture.debugElement.componentInstance;
    });

    it('should render the component', (() => {
      expect(formPage).toBeTruthy();
    }));

    it('should disable submit when name is empty', () => {
      let form = fixture.componentInstance.myForm;
      expect(form.valid).toBe(false);

      form.controls.name.setValue('');
      form.controls.type.setValue('hello');
      fixture.detectChanges();

      let button = fixture.debugElement.query(By.css(('[data-test=submit]'))).nativeElement;
      expect(button.disabled).toBeTruthy();
      expect(form.valid).toBe(false);
    });


    it('should enable submit when only name entered', () => {
      let form = fixture.componentInstance.myForm;
      expect(form.valid).toBe(false);

      form.controls.name.setValue('name value');
      form.controls.type.setValue('');
      fixture.detectChanges();

      let button = fixture.debugElement.query(By.css(('[data-test=submit]'))).nativeElement;
      expect(button.disabled).toBeFalsy();
      expect(form.valid).toBe(true);
    });
  });


  describe('when AppState contains form values', () => {

    beforeEach(() => {
       let appState: AppState = {
         formData: {
            name: 'this is a name',
            type: 'some default type',
          }
       };

       fixture = FixtureComponentRenderer.renderForm(FormPageComponent as Type<FormPageComponent>, appState);
       formPage = fixture.debugElement.componentInstance;
       fixture.detectChanges();
     });

    it('form controls should default to those values', () => {
      let form = fixture.componentInstance.myForm;
      expect(form.controls.name.value).toBe('this is a name');
      expect(form.controls.type.value).toBe('some default type');

    });
  });

  describe('#onSubmit', () => {
    var formActions:  FormActions;

    beforeEach(() => {
      let appState: AppState = {
        formData: {
          name: '',
          type: 'something that will not be overwritten',
        }
      };

      fixture = FixtureComponentRenderer.renderForm(FormPageComponent as Type<FormPageComponent>, appState);
      formPage = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([FormActions], (_formActions) => {
      formActions = _formActions;
    }));

    it('triggers formSave action with values entered', () => {
      let form = fixture.componentInstance.myForm;
      form.controls.name.setValue('name value');

      spyOn(formActions, 'saveForm');

      formPage.saveForm();

      expect(formActions.saveForm).toHaveBeenCalledWith({
        name: 'name value',
        type: 'something that will not be overwritten',
      })

    })
  })

});
