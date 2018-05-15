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

export class JumpPieceAction implements Action {
    readonly type = JUMP_PIECES;
    payload: Array<Position>;

}

export class MakeKingAction implements Action {
    readonly type = MAKE_KING;
    payload: Piece;
}

export type Actions = DisplayPieceAction  | JumpPieceAction | MakeKingAction;

export function pieces(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_PIECES:
            return action.payload;


        case MAKE_KING:
            action.payload.isKing = true;
            return state;

        default:
            return state;
    }
}
