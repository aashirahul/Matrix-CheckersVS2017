import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Square } from '../models/square';
import { Point } from '../models/point';
import { DISPLAY_PIECES } from '../stores/pieces.store';
import { DISPLAY_SQUARES } from '../stores/squares.store';
import { DISPLAY_POINTS } from '../stores/point.store';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET, REQUEST_TYPE_GET_PIECES } from '../services/api.service';

@Injectable()
export class AppStartUpActions {
    private pieces: Array<Piece>;
    public piece: Piece;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
    ) { }

    public initializeGame(): void {
        const piecesReq = new HttpRequest(REQUEST_TYPE_GET_PIECES, `${"http://localhost:60118/api"}/pieces`);
       
        this._api.callApiService<Piece[]>(piecesReq)
            .subscribe(
            (pieces: Array<Piece>) => {
                    this._store.dispatch({ type: DISPLAY_PIECES, payload: pieces });
                },
                (err) => {
                    this._store.dispatch({ type: DISPLAY_PIECES, payload: [] });
            },
                ()=>
                {
                    
            }
            );
    }

    //public initializeGame(): void {
    //    const piecesReq = new HttpRequest(REQUEST_TYPE_GET, `${"http://localhost:60118/api"}/pieces`);
    //    let pieces = this._api.callApiService<Piece[]>(piecesReq);
     
    //        // this._api.callApiService<Piece[]>(piecesReq)
    //        //.subscribe(
    //        //     (pieces: any) => {
    //        //         debugger;
    //        //      this._store.dispatch({ type: DISPLAY_PIECES, payload: pieces });
    //        //    console.log(pieces);
    //        //},
    //        //     (err) => {
    //        //         window.alert(err);
    //        //      this._store.dispatch({ type: DISPLAY_PIECES, payload: [] });
    //        //},
    //        //() => {

    //        //}
    //        //);
    //}

   
    public initializeSquares(): void {
        const squaresReq = new HttpRequest(REQUEST_TYPE_GET, `${"http://localhost:60118/api"}/squares`);
        this._api.callApiService<Square[]>(squaresReq)
            .subscribe(
            (squares: Array<Square>) => {
                this._store.dispatch({ type: DISPLAY_SQUARES, payload: squares });
              
            },
            (err) => {
                this._store.dispatch({ type: DISPLAY_SQUARES, payload: [] });
            }
            );
    }

    public initializeScores(): void {
        const pointsReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/points`);
        this._api.callApiService<Point[]>(pointsReq)
            .subscribe(
            (points: Array<Point>) => {
                this._store.dispatch({ type: DISPLAY_POINTS, payload: points });
            },
            (err) => {
                this._store.dispatch({ type: DISPLAY_POINTS, payload: [] });
            }
            );
    }
}
