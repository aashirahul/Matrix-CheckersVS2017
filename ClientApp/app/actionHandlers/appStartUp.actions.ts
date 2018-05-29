import { HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Position } from '../models/position';
import { Piece } from '../models/game-piece';
import { Square } from '../models/square';
import { Player } from '../models/player';
import { LOAD_PIECES } from '../stores/pieces.store';
import { LOAD_SQUARES } from '../stores/gameBoard.store';
import { LOAD_PLAYERS } from '../stores/players.store';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { PieceHelper } from '../helpers/pieceHelper';
import { AppStateActions } from '../actionHandlers/appState.actions';

@Injectable()
export class AppStartUpActions {
    private pieces: Array<Piece>;
    public piece: Piece;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _http: HttpClient,
        private _pieceHelper: PieceHelper,
        private _appStateActions: AppStateActions,
    ) { }

    public initializeGame(): void {
        const piecesReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/pieces`);
        this._api.callApiService<Piece[]>(piecesReq)
            .subscribe(
            (pieces: Array<Piece>) => {
                this._store.dispatch({ type: LOAD_PIECES, payload: pieces });
            },
            (err) => {
                this._store.dispatch({ type: LOAD_PIECES, payload: [] });
            },

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


}
