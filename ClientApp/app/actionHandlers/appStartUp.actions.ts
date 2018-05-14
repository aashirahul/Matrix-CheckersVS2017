import { HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Square } from '../models/gameBoard';
import { Point } from '../models/point';
import { Player } from '../models/player';
import { DISPLAY_PIECES } from '../stores/pieces.store';
import { DISPLAY_SQUARES } from '../stores/gameBoard.store';
import { DISPLAY_POINTS } from '../stores/point.store';
import { LOAD_PLAYERS } from '../stores/players.store';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';

@Injectable()
export class AppStartUpActions {
    private pieces: Array<Piece>;
    public piece: Piece;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _http: HttpClient
    ) { }

    public initializeGame(): void {
        const piecesReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/pieces`);
        this._api.callApiService<Piece[]>(piecesReq)
            .subscribe(
            (pieces: Array<Piece>) => {
                this._store.dispatch({ type: DISPLAY_PIECES, payload: pieces });
            },
            (err) => {
                this._store.dispatch({ type: DISPLAY_PIECES, payload: [] });
            },

        );
    }
    
    public initializeSquares(): void {
        const squaresReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/squares`);
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

    public initializePlayers(): void {
        const playersreq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/players`);
        this._api.callApiService<Player[]>(playersreq)
            .subscribe(
            (players: Array<Player>) => {
                this._store.dispatch({ type: LOAD_PLAYERS, payload: players });
            },
            (err) => {
                this._store.dispatch({ type: LOAD_PLAYERS, payload: [] });
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
