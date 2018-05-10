import { Action } from '@ngrx/store';
import { Player } from '../models/player';


export type State = Array<Player>;

export const GET_PLAYERS = 'GET_PLAYERS';



export class DisplayPointAction implements Action {
    readonly type = GET_PLAYERS;
    payload: Array<Player>;
}

export type Actions = DisplayPointAction  ;

export function players(state: State = [], action: Actions): State {
    switch (action.type) {

        case GET_PLAYERS:
            return action.payload;

        
         default:
            return state;
    }
}
