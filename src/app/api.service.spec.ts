/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Http, Response, BaseRequestOptions, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormActions } from './form-actions';
import { NgRedux } from 'ng2-redux';

describe('Service: ApiService', () => {
  let service: ApiService;
  let backend: MockBackend;
  let formActions: FormActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        MockBackend,
        NgRedux,
        FormActions,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          }
        }
      ]
    });
  });

  beforeEach(inject([ApiService, MockBackend, FormActions], (_service, _backend, _formActions) => {
    service = _service;
    backend = _backend;
    formActions = _formActions;
  }));

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('should call the service', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('http://google.com');
      connection.mockRespond(new Response(new ResponseOptions({ body: 'Yes' })));
      done();
    });
    
    spyOn(formActions, 'saveOwnerName');
    service.getData();
    expect(formActions.saveOwnerName).toHaveBeenCalledWith('Yes');
  });

});
