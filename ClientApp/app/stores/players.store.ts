import { Action } from '@ngrx/store';
import { Player } from '../models/player';


export type State = Array<Player>;

export const GET_PLAYERS = 'GET_PLAYERS';
export const UPDATE_PLAYER_NAME = 'UPDATE_PLAYER_NAME';
export const SET_UPDATE_PLAYER_NAME = 'SET_UPDATE_PLAYER_NAME';
export const RESET_UPDATE_PLAYER_NAME = 'RESET_UPDATE_PLAYER_NAME';


export class DisplayPlayerAction implements Action {
    readonly type = GET_PLAYERS;
    payload: Array<Player>;
}

export class SetUpdatePlayerNameAction implements Action {
    readonly type = SET_UPDATE_PLAYER_NAME;
    payload: string;
}

export class UpdatePlayerNameAction implements Action {
    readonly type = UPDATE_PLAYER_NAME;
    payload: string;
}

export class ResetUpdatePlayerNameAction implements Action {
    readonly type = RESET_UPDATE_PLAYER_NAME;
}

export type Actions = DisplayPlayerAction | UpdatePlayerNameAction | SetUpdatePlayerNameAction | ResetUpdatePlayerNameAction;

export function players(state: State = [], action: Actions): State {
    switch (action.type) {

        case GET_PLAYERS:
            return action.payload;

        case SET_UPDATE_PLAYER_NAME:
            const playerColor = state.find((p) => {
                if (p.color === action.payload) {
                    return true;
                }
                return false;
            });
            if (playerColor) {
                playerColor.updateName = true;
            }
            return state;
            
        case UPDATE_PLAYER_NAME:
            const player = state.find((p) => {
                if (p.updateName) {
                    return true;
                }
                return false;
            });
            if (player) {
                player.name = action.payload;
            }
            return state;

        case RESET_UPDATE_PLAYER_NAME:
            state.forEach((p) => {
                p.updateName = false;
            });
            return state;

        default:
            return state;
    }
}
