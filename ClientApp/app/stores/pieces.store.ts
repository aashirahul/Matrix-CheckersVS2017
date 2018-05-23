import { Action } from '@ngrx/store';
import { Piece } from '../models/game-piece';


export type State = Array<Piece>;

export const LOAD_PIECES = 'DISPLAY_PIECES';

export class LoadPieceAction implements Action {
    readonly type = LOAD_PIECES;
    payload: Array<Piece>;
}

export type Actions = LoadPieceAction;

export function pieces(state: State = [], action: Actions): State {
    switch (action.type) {

        case LOAD_PIECES:
            return action.payload;

        default:
            return state;
    }
}
