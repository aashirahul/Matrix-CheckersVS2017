import { HttpErrorResponse, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Square } from '../models/gameBoard';
import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { HIGHLIGHT_SQUARES, UNHIGHLIGHT_SQUARES, UPDATE_SQUARE_HAS_PIECE, UPDATE_SQUARE_HAS_NO_PIECE } from '../stores/gameBoard.store';
import { pieces } from '../stores/pieces.store';

@Injectable()
export class GameBoardActions {
    private pieces: Array<Square>;
    public availablePositionOne: { row: number, col: number };
    public availablePositionTwo: { row: number, col: number };
    public test: any;
    public pieceSelected: Piece;
    constructor(
        private _store: Store<any>,
        private _api: ApiService,
    ) { }

    public availableMoves(position: any, pieceSelected: any) {
        let color = pieceSelected.color;
        const movesReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/squares/moves`, {
            params: new HttpParams().set("row", position.row).set("col", position.column).set("color", color)
        });
        this._api.callingApiService(movesReq)
            .subscribe(
            (moves) => {
                this._store.dispatch({ type: HIGHLIGHT_SQUARES, payload: moves });
            },
            (err) => {
                this._store.dispatch({ type: HIGHLIGHT_SQUARES, payload: [] });
            }
            );
    }

    public updateSquareHasPiece(position: any): void {
        this._store.dispatch({
            type: UPDATE_SQUARE_HAS_PIECE,
            payload: position
        });
    }

    public unhighlightSquares(): void {
        this._store.dispatch({
            type: UNHIGHLIGHT_SQUARES
        });
    }

    public updateSquareHasNoPiece(position: any): void {
        this._store.dispatch({
            type: UPDATE_SQUARE_HAS_NO_PIECE,
            payload: position
        });
    }
}
