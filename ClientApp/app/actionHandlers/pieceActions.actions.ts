import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';

import { Piece } from '../models/game-piece';
import {LOAD_PIECES } from '../stores/pieces.store';
import { Position } from '../models/position';
import { Square } from '../models/gameBoard';

@Injectable()
export class PieceActions {
    private pieces: Array<Piece>;

    constructor(
        private _store: Store<any>,
        private _helper: Helper,
    ) { }

    public move(from: Position, to: Position): void {
        let updatedPieces;
        const squares = this._helper.getSquares();
        const pieces = this._helper.getPieces();
        const emptySquare = squares.find((s) => {
            if (s.position.row === to.row && s.position.column === to.column && s.hasPiece) {
                return true;
            } else {
                return false;
            }
        });
        if (!emptySquare) {
            updatedPieces = pieces.map((piece) => {
                if (piece.position.row === from.row && piece.position.column === from.column) {
                    piece.position.row = to.row;
                    piece.position.column = to.column;
                }
                return piece;
            });
        } else {
            updatedPieces = pieces;
        }
        this._store.dispatch({
            type: LOAD_PIECES,
            payload: updatedPieces,

        });
    }

    public jump(skipped: Position): void {
        let updatedPieces;
        const pieces = this._helper.getPieces();
        updatedPieces = pieces.map((piece) => {
            if (piece.position.row === skipped.row && piece.position.column === skipped.column) {
                piece.color = 'null';
            }
            return piece;
        });
        this._store.dispatch({
            type: LOAD_PIECES,
            payload: updatedPieces,
        });
    }

    public makeKing(id: number): void {
        let updatedPieces;
        const updatedpiece = this._helper.getPieceToBeUpdated(id);
        const pieces = this._helper.getPieces();
        updatedPieces = pieces.map((piece) => {
            if (piece.id === updatedpiece.id) {
                piece.isKing = true;
            }
            return piece;
        });
        this._store.dispatch({
            type: LOAD_PIECES,
            payload: updatedPieces,
        });
    }
}
