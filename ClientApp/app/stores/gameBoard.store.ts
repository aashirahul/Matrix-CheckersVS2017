import { Action } from '@ngrx/store';
import { Square } from '../models/square';
import { Position } from '../models/position';
import { Helper } from '../helpers/helper';

export type State = Array<Square>;

export const LOAD_SQUARES = 'LOAD_SQUARES';

export class DisplaySquareAction implements Action {
    readonly type = LOAD_SQUARES;
    payload: Array<Square>;
}

export type Actions = DisplaySquareAction  ;

export function squares(state: State = [], action: Actions): State {
    switch (action.type) {

        case LOAD_SQUARES:
            return action.payload;

        default:
            return state;
    }
}


