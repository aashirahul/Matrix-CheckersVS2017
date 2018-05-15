import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';

import { Piece } from '../models/game-piece';
import { DISPLAY_PIECES, MOVE_PIECES, JUMP_PIECES, MAKE_KING } from '../stores/pieces.store';
import { Position } from '../models/position';
import { Square } from '../models/gameBoard';

@Injectable()
export class PieceActions {
    private pieces: Array<Piece>;

    constructor(
        private _store: Store<any>,
        private _helper: Helper,
    ) { }

    public move(from: Position, to: Position ): void {
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
            type: DISPLAY_PIECES,
            payload: updatedPieces,
        
        });
    }

    public jump(from: Position, to: Position, skipped: Position, squares: Array<Square>): void {
        this._store.dispatch({
            type: JUMP_PIECES,
            payload: [from, to, skipped],
        });
        this._store.dispatch({
            type: MOVE_PIECES,
            payload: [from, to],
            squares: squares
        });
    }

    public makeKing(piece: any): void {
        this._store.dispatch({
            type: MAKE_KING,
            payload: piece,
        });
    }
}
