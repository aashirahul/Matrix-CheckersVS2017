import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Constants from '../constants/constants';
import { UPDATE_APP_STATE } from '../stores/appState.store';
import { Piece } from '../models/game-piece';
import { Player } from '../models/player';
import { Position } from '../models/position';

@Injectable()
export class AppStateActions {
    private selectedPiece: any;
    public originalPosition: Position;

    constructor(
        private _store: Store<any>
    ) { }

    public updateState(stateChanges: object): void {
        this._store.dispatch(
            {
                type: UPDATE_APP_STATE,
                payload: stateChanges
            }
        );
    }

    public setOriginalPosition(row: any, col: any): void {
        this.originalPosition = {
            row: row,
            column: col
        };
    }

    public getOriginalPosition(): Position {
        return this.originalPosition;
    }

    public getSelectedPiece(): Piece {
        return this.selectedPiece;
    }

    public setSelectedPiece(selectedPiece: any): void {
        this.selectedPiece = selectedPiece;
    }
       
}