import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as Constants from '../constants/constants';

export const
    REQUEST_TYPE_GET = 'GET',
    REQUEST_TYPE_POST = 'POST';

@Injectable()
export class ApiService {

    constructor(
        private _http: HttpClient
    ) { }

    public callApiService<T>(req: HttpRequest<any>): Observable<T> {
        let response: any;
        switch (req.method) {

            case REQUEST_TYPE_GET:
                return this._http
                    .get<T>(req.url)
                    .map(res => {
                        response = res;
                        return res;
                    }).catch(
                    err => {
                        return Observable.throw(err)
                    }
                    );
        }
        return Observable.of(response);
    }

    public callingApiService<T>(req: HttpRequest<any>): Observable<T> {
        let response: any;
        switch (req.method) {

            case REQUEST_TYPE_GET:
                return this._http
                    .get<T>(req.url, { params: req.params })
                    .map(res => {
                        response = res;
                        return response;
                    }).catch(
                    err => {
                        return Observable.throw(err)
                    }
                    );
        }
        return Observable.of(response);
    }
}
