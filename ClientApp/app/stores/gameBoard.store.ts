import { Action } from '@ngrx/store';
import { Square } from '../models/gameBoard';
import { Position } from '../models/position';

export type State = Array<Square>;
export const HIGHLIGHT_SQUARES = 'HIGHLIGHT_SQUARES';
export const DISPLAY_SQUARES = 'DISPLAY_SQUARES';
export const UNHIGHLIGHT_SQUARES = 'UNHIGHLIGHT_SQUARES';


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

export type Actions = DisplaySquareAction | HighlightSquareAction | UnhighlightSquareAction;

export function squares(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_SQUARES:
            console.log(action.payload);
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
    }
}

function markSquare(state: State, position: { row: number, column: number }): void {
    const square = state.find((s) => {
        if (s.row === position.row && s.col === position.column) {
            return true;
        }
        return false;
    });
    if (square) {
        square.validMove = true;
    }
}
