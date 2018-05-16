import { Action } from '@ngrx/store';
import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Square } from '../models/gameBoard';


export type State = Array<Piece>;

export const DISPLAY_PIECES = 'DISPLAY_PIECES';
export const MOVE_PIECES = 'MOVE_PIECES';
export const JUMP_PIECES = 'JUMP_PIECES';
export const MAKE_KING = 'MAKE_KING';

export class DisplayPieceAction implements Action {
    readonly type = DISPLAY_PIECES;
    payload: Array<Piece>;
}


export type Actions = DisplayPieceAction;

export function pieces(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_PIECES:
            return action.payload;

        default:
            return state;
    }
}
