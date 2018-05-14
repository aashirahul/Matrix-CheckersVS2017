import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Player } from '../models/player';
import { GET_PLAYERS, UPDATE_PLAYER_NAME, SET_UPDATE_PLAYER_NAME } from '../stores/players.store';

@Injectable()
export class PlayerActions {
    private pieces: Array<Player>;

    constructor(
        private _store: Store<any>,
    ) { }

    public setUpdatePlayerName(color: string): void {
        this._store.dispatch({
            type: SET_UPDATE_PLAYER_NAME,
            payload: color
        });
    }

    public updatePlayerName(name: any): void {
        this._store.dispatch({
            type: UPDATE_PLAYER_NAME,
            payload: name
        });
    }

}


