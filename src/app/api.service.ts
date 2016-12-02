import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormActions} from './form-actions';

@Injectable()
export class ApiService {
  http: Http;
  formActions: FormActions;
  constructor(http: Http, formActions: FormActions) { 
    this.http = http;
    this.formActions = formActions;
  }

  getData() {
    this.http.get('http://google.com')
      .subscribe((response) => {
          this.formActions.saveOwnerName(response.text());
      });    
  }
}
