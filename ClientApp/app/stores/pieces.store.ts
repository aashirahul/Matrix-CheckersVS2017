import { Action } from '@ngrx/store';
import { Piece } from '../models/game-piece';
import { Position } from '../models/position';


export type State = Array<Piece>;

export const DISPLAY_PIECES = 'DISPLAY_PIECES';
export const MOVE_PIECES = 'MOVE_PIECES';
export const JUMP_PIECES = 'JUMP_PIECES';
export const MAKE_KING = 'MAKE_KING';

export class DisplayPieceAction implements Action {
    readonly type = DISPLAY_PIECES;
    payload: Array<Piece>;
}

export class MovePieceAction implements Action {
    readonly type = MOVE_PIECES;
    payload: Array<Position>;
}

export class JumpPieceAction implements Action {
    readonly type = JUMP_PIECES;
    payload: Array<Position>;

}

export class MakeKingAction implements Action {
    readonly type = MAKE_KING;
    payload: Piece;
}

export type Actions = DisplayPieceAction | MovePieceAction | JumpPieceAction | MakeKingAction;

export function pieces(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_PIECES:
            return action.payload;

        case MOVE_PIECES:
            const piece = state.find((p) => {
                if (p.position.row === action.payload[0].row && p.position.column === action.payload[0].column) {
                    return true;
                }
                return false;
            });
            const emptySpace = state.find((p) => {
                if (p.position.row === action.payload[1].row && p.position.column === action.payload[1].column) {
                    return true;
                } else {
                    return false;
                }
            });

            if (piece) {
                if (!emptySpace) {
                    piece.position.row = action.payload[1].row;
                    piece.position.column = action.payload[1].column;
                }
            }
            return state;

        case JUMP_PIECES:
            const skippedPiece = state.find((p) => {
                if (p.position.row === action.payload[2].row && p.position.column === action.payload[2].column) {
                    return true;
                }
                return false;
            });
            if (skippedPiece) {
                skippedPiece.color = 'null';
            }
            return state;

        case MAKE_KING:
            action.payload.isKing = true;
            return state;

        default:
            return state;
    }
}
