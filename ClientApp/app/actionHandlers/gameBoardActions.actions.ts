import { HttpErrorResponse, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';

import { Square } from '../models/gameBoard';
import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { LOAD_SQUARES } from '../stores/gameBoard.store';
import { pieces } from '../stores/pieces.store';

@Injectable()
export class GameBoardActions {

    private pieces: Array<Square>;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _helper: Helper,
    ) { }

    public availableMoves(position: Position, pieceSelected: Piece) {
        let color = pieceSelected.color;
        const movesReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/squares/moves`, {
            params: new HttpParams().set("row", `${position.row}`).set("col", `${position.column}`).set("color", color)
        });
        this._api.callingApiService(movesReq)
            .subscribe(
            (moves) => {
                let availablesMoves: any = [];
                availablesMoves = moves;
                const squares = this._helper.getSquares();
                const updatedsquares = squares.map((square) => {
                    for (var i = 0; i < availablesMoves.length; i++) {
                        if (square.position.row === availablesMoves[i].row && square.position.column === availablesMoves[i].column) {
                            square.validMove = true;
                        }
                    }
                    return square;
                });
                this._store.dispatch({
                    type: LOAD_SQUARES,
                    payload: updatedsquares
                });
            },
            (err) => {
                this._store.dispatch({
                    type: LOAD_SQUARES,
                    payload: []
                });
            });
    }

    public squareSelected(position: Position): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === position.row && square.position.column === position.column) {
                square.isSelected = true;
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedSquares
        });
    }

    public updateSquareHasPiece(position: any): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === position.row && square.position.column === position.column) {
                square.hasPiece = true;
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedSquares
        });
    }

    public updateSquareHasNoPiece(position: any): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === position.row && square.position.column === position.column) {
                square.hasPiece = false;
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedSquares
        });
    }

    public unhighlightSquares(): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        squares.forEach((square) => {
            square.validMove = false;
            square.isSelected = false;
        });

        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: squares
        });
    }
}
