import { Action } from '@ngrx/store';
import { Player } from '../models/player';

export type State = Array<Player>;

export const LOAD_PLAYERS = 'LOAD_PLAYERS';

export class LoadPlayersAction implements Action {
    readonly type = LOAD_PLAYERS;
    payload: Array<Player>;
}

export type Actions = LoadPlayersAction;

export function players(state: State = [], action: Actions): State {
    switch (action.type) {

        case LOAD_PLAYERS:
            return action.payload;

        default:
            return state;
    }
}
