import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/square';
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
}

