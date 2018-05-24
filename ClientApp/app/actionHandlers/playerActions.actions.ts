import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';
import { PlayerHelper } from '../helpers/playerHelper';
import * as Constants from '../constants/constants';

import { Player } from '../models/player';
import { Piece } from '../models/game-piece';
import { LOAD_PLAYERS } from '../stores/players.store';
import { AppStateActions } from './appState.actions';

@Injectable()
export class PlayerActions {


    constructor(
        private _store: Store<any>,
        private _helper: Helper,
        private _playerHelper: PlayerHelper,
        private _appStateActions: AppStateActions
    ) { }

    public updatePlayerName(name: string): void {
        const playerBeingUpdated: string = this._playerHelper.getPlayerNameBeingUpdated();
        const players: Array<Player> = this._playerHelper.getCurrentPlayers();
        const updatedPlayers = players.map((player) => {
            if (player.color === playerBeingUpdated) {
                player.name = name;
            }
            return player;
        });
        this._store.dispatch({
            type: LOAD_PLAYERS,
            payload: updatedPlayers
        });
    }

    public addPoint(piece: any): void {
        const players: Array<Player> = this._playerHelper.getCurrentPlayers();
        const updatedScores = players.map((player) => {
            if (player.color === piece.color) {
                player.score += 1;
            }
            return player;
        });


        this._store.dispatch({
            type: LOAD_PLAYERS,
            payload: updatedScores
        });
    }

    public switchTurns(piece:any): void {
        if (piece && piece.color === Constants.ColorForFirstPlayer) {
            this._appStateActions.updateState({
                'currentlyPlayingColor': Constants.ColorForSecondPlayer,
                'currentPlayerIndex': 1
            });
        } else if (piece && piece.color === Constants.ColorForSecondPlayer) {
            this._appStateActions.updateState({
                'currentlyPlayingColor': Constants.ColorForFirstPlayer,
                'currentPlayerIndex': 0
            });
        }
    }

}


