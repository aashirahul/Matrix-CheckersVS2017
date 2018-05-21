import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';
import { PlayerHelper } from '../helpers/playerHelper';

import { Player } from '../models/player';
import { LOAD_PLAYERS } from '../stores/players.store';
import { AppStateActions } from './appState.actions';

@Injectable()
export class PlayerActions {
    private pieces: Array<Player>;

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

    public addPoint(currentPlayer: string): void {
        const players: Array<Player> = this._playerHelper.getCurrentPlayers();
        const updatedScores = players.map((player) => {
            if (player.color === currentPlayer) {
                player.score += 1;
            }
            return player;
        });


        this._store.dispatch({
            type: LOAD_PLAYERS,
            payload: updatedScores
        });
    }

    public switchTurns(): void {
        let players: Array<Player> = this._playerHelper.getCurrentPlayers();
        let currentPlayer = this._appStateActions.getCurrentPlayer();

        players.forEach((player) => {
            if (player !== currentPlayer) {
                this._appStateActions.setCurrentPlayer(player);
            }
        });
    }
}


