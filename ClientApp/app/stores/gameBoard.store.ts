import { Action } from '@ngrx/store';
import { Square } from '../models/gameBoard';
import { Position } from '../models/position';
import { Helper } from '../helpers/helper';

export type State = Array<Square>;
export const HIGHLIGHT_SQUARES = 'HIGHLIGHT_SQUARES';
export const DISPLAY_SQUARES = 'DISPLAY_SQUARES';
export const UNHIGHLIGHT_SQUARES = 'UNHIGHLIGHT_SQUARES';
export const UPDATE_SQUARE_HAS_PIECE = 'UPDATE_SQUARE_HAS_PIECE';
export const UPDATE_SQUARE_HAS_NO_PIECE = 'UPDATE_SQUARE_HAS_NO_PIECE';

export class DisplaySquareAction implements Action {
    readonly type = DISPLAY_SQUARES;
    payload: Array<Square>;
}

export class HighlightSquareAction implements Action {
    readonly type = HIGHLIGHT_SQUARES;
    payload: Array<Position>;
}

export class UnhighlightSquareAction implements Action {
    readonly type = UNHIGHLIGHT_SQUARES;
}

export class UpdateHasPieceAction implements Action {
    readonly type = UPDATE_SQUARE_HAS_PIECE;
    payload: Position;
}

export class UpdateHasNoPieceAction implements Action {
    readonly type = UPDATE_SQUARE_HAS_NO_PIECE;
    payload: Position;
}

export type Actions = DisplaySquareAction | HighlightSquareAction | UnhighlightSquareAction | UpdateHasPieceAction | UpdateHasNoPieceAction;

export function squares(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_SQUARES:
            return action.payload;

        case HIGHLIGHT_SQUARES:
            markSquare(state, action.payload[0]);
            markSquare(state, action.payload[1]);
            return state;

        case UNHIGHLIGHT_SQUARES:
            state.forEach((square) => square.validMove = false);
            return state;
        default:
            return state;

        case UPDATE_SQUARE_HAS_PIECE:
            squareHasPiece(state, action.payload);
            return state;

        case UPDATE_SQUARE_HAS_NO_PIECE:
            squareHasNoPiece(state, action.payload);
            return state;
    }
}
    
function markSquare(state: State, position: { row: number, column: number }): void {
    const square = state.find((s) => {
        if (s.position.row === position.row && s.position.column === position.column) {
            return true;
        }
        return false;
    });
    if (square) {
        square.validMove = true;
    }
}
function squareHasPiece(state: State, position: { row: number, column: number }): void {
    const square = state.find((s) => {
        if (s.position.row === position.row && s.position.column === position.column) {
            return true;
        }
        return false;
    });
    if (square) {
        square.hasPiece = true;
    }
}
function squareHasNoPiece(state: State, position: { row: number, column: number }): void {
    const square = state.find((s) => {
        if (s.position.row === position.row && s.position.column === position.column) {
            return true;
        }
        return false;
    });
    if (square) {
        square.hasPiece = false;
    }
}
