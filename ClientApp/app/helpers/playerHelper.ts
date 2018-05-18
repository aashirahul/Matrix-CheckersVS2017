import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/gameBoard';
import * as Constants from '../constants/constants';
import { PlayerActions } from '../actionHandlers/playerActions.actions';

@Injectable()
export class PlayerHelper {

    public skippedPosition: Position;

    constructor(
        private _store: Store<any>,
    ) { }
    
    public getPlayerNameBeingUpdated(): string {
        let playerBeingUpdated: string = '';
        this._store.select('appState').subscribe((appState) => {
            playerBeingUpdated = appState[`player.nameBeingUpdated`];
        });
        return playerBeingUpdated;
    }

    public getCurrentPlayers(): Array<Player> {
        let currentPlayers: Array<Player> = [];
        this._store.select('players').subscribe((players) => currentPlayers = players);
        return currentPlayers;
    }
        
    public switchDisplayPlayerName(displayPlayerName: string, firstPlayerName: string, secondPlayerName: string): string | any {
        if (firstPlayerName === Constants.ColorForFirstPlayer) {
            if (!secondPlayerName) {
                displayPlayerName = displayPlayerName === Constants.ColorForFirstPlayer ? Constants.ColorForSecondPlayer : Constants.ColorForFirstPlayer;
            } else {
                displayPlayerName = displayPlayerName === Constants.ColorForFirstPlayer ? secondPlayerName : Constants.ColorForFirstPlayer;
            }
            return displayPlayerName;
        } else {
            if (!secondPlayerName) {
                displayPlayerName = displayPlayerName === firstPlayerName ? Constants.ColorForSecondPlayer : firstPlayerName;
            } else {
                displayPlayerName = displayPlayerName === firstPlayerName ? secondPlayerName : firstPlayerName;
            }
            return displayPlayerName;
        }
    }

    public updateScore(color: string): Array<number> | any {
        const players = this.getCurrentPlayers();
        if (color === Constants.ColorForFirstPlayer) {
            const scoreRed = Array(players[0].score).fill('1');
            return scoreRed;
        } else if (color === Constants.ColorForSecondPlayer) {
            const scoreBlack = Array(players[1].score).fill('1');
            return scoreBlack;
        }
    }
}

