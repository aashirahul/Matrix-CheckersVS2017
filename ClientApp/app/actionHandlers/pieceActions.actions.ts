import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { DISPLAY_PIECES, MOVE_PIECES, JUMP_PIECES, MAKE_KING } from '../stores/pieces.store';
import { Position } from '../models/position';
import { Square } from '../models/gameBoard';

@Injectable()
export class PieceActions {
    private pieces: Array<Piece>;

    constructor(
        private _store: Store<any>,
    ) { }

    public move(from: Position, to: Position, squares: Array<Square>): void {
        this._store.dispatch({
            type: MOVE_PIECES,
            payload: [from, to],
            squares: squares
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
