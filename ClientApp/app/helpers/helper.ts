import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/square';
import * as Constants from '../constants/constants';
import { PlayerActions } from '../actionHandlers/playerActions.actions';

@Injectable()
export class Helper {

    public skippedPosition: Position;

    constructor(
        private _store: Store<any>,
    ) { }

    public findSelectedSquare(row: number, col: number): Square | undefined {
        const squares = this.getSquares();
        return squares.find((square) => (square.position.row === row && square.position.column === col));
    }

    public getSquares(): Array<Square> {
        let allSquares: Array<Square> = [];
        this._store.select('squares').subscribe((squares) => allSquares = squares);
        return allSquares;
    }
    

}