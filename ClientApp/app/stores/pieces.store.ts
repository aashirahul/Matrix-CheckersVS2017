import { Action } from '@ngrx/store';
import { Piece } from '../models/game-piece';


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
    origin: { row: number, column: number };
    destination: { row: number, column: number };
}

export class JumpPieceAction implements Action {
    readonly type = JUMP_PIECES;
    // payload: Array<Piece>;
    origin: { row: number, column: number };
    destination: { row: number, column: number };
    skipped: { row: number, column: number };
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
                if (p.position.row === action.origin.row && p.position.column === action.origin.column) {
                    return true;
                }
                return false;
            });
            const emptySpace = state.find((p) => {
                if (p.position.row === action.destination.row && p.position.column === action.destination.column && p.color != 'null') {
                    return true;
                } else {
                    return false;
                }
            });
            
            if (piece) {
                if (!emptySpace) {
                    piece.position.row = action.destination.row;
                    piece.position.column = action.destination.column;
                }
            }
            return state;

        case JUMP_PIECES:
            const skippedPiece = state.find((p) => {
                if (p.position.row === action.skipped.row && p.position.column === action.skipped.column) {
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
