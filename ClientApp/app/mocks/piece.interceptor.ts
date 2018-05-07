import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Piece } from '../models/game-piece';

@Injectable()
export class MockPieceInterceptor  {
    //intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //    if (req.method === 'GET' && req.url === `${Constants.ApiBaseUrl}/pieces`) {
    //        const pieceResponse = this.getPieces();
    //        const response = new HttpResponse({
    //            body: pieceResponse
    //        });
    //        return Observable.of(response);
    //    }
    //    return next.handle(req);
    //}

    //getPieces(): Array<Piece> {
    //    const pieces = [{
    //        'id': 0,
    //        'row': 0,
    //        'col': 1,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 1,
    //        'row': 0,
    //        'col': 3,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 2,
    //        'row': 0,
    //        'col': 5,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 3,
    //        'row': 0,
    //        'col': 7,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 4,
    //        'row': 1,
    //        'col': 0,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 5,
    //        'row': 1,
    //        'col': 2,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 6,
    //        'row': 1,
    //        'col': 4,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 7,
    //        'row': 1,
    //        'col': 6,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 8,
    //        'row': 2,
    //        'col': 1,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 9,
    //        'row': 2,
    //        'col': 3,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 10,
    //        'row': 2,
    //        'col': 5,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 11,
    //        'row': 2,
    //        'col': 7,
    //        'color': 'red',
    //        'isKing': false
    //    }, {
    //        'id': 12,
    //        'row': 5,
    //        'col': 0,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 13,
    //        'row': 5,
    //        'col': 2,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 14,
    //        'row': 5,
    //        'col': 4,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 15,
    //        'row': 5,
    //        'col': 6,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 16,
    //        'row': 6,
    //        'col': 1,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 17,
    //        'row': 6,
    //        'col': 3,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 18,
    //        'row': 6,
    //        'col': 5,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 19,
    //        'row': 6,
    //        'col': 7,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 20,
    //        'row': 7,
    //        'col': 0,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 21,
    //        'row': 7,
    //        'col': 2,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 22,
    //        'row': 7,
    //        'col': 4,
    //        'color': 'black',
    //        'isKing': false
    //    }, {
    //        'id': 23,
    //        'row': 7,
    //        'col': 6,
    //        'color': 'black',
    //        'isKing': false
    //    }];
    //    return pieces;
    //}


}
