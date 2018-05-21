import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Constants from '../constants/constants';
import { UPDATE_APP_STATE } from '../stores/appState.store';
import { Piece } from '../models/game-piece';
import { Player } from '../models/player';

@Injectable()
export class AppStateActions {
    private selectedPiece: any;
    private currentPlayer: Player;

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

    public getSelectedPiece(): Piece {
        return this.selectedPiece;
    }

    public setSelectedPiece(selectedPiece: any): void {
        this.selectedPiece = selectedPiece;
    }

    public setCurrentPlayer(player: Player) {
        this.currentPlayer = player;
    }

    public getCurrentPlayer() {
        return this.currentPlayer;
    }
}