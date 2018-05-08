import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/piece';
import { DISPLAY_PIECES, MOVE_PIECES, JUMP_PIECES, MAKE_KING } from '../stores/pieces.store';

@Injectable()
export class PieceActions {
    private pieces: Array<Piece>;

    constructor(
        private _store: Store<any>,
    ) { }

    public move(from: any, to: any): void {
        this._store.dispatch({
            type: MOVE_PIECES,
            payload: [from,to]
        });
    }

    public jump(from: any, to: any, skipped: any): void {
        this._store.dispatch({
            type: JUMP_PIECES,
            payload: [from,to,skipped],
        });
        this._store.dispatch({
            type: MOVE_PIECES,
            payload: [from, to],
        });
    }

    public makeKing(piece: any): void {
        this._store.dispatch({
            type: MAKE_KING,
            payload: piece,
        });
    }
}
