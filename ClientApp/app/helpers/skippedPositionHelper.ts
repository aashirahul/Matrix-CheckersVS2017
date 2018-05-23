import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/square';
import * as Constants from '../constants/constants';
import { PlayerActions } from '../actionHandlers/playerActions.actions';

@Injectable()
export class SkippedPositionHelper {

    public skippedPosition: Position;

    constructor(
        private _store: Store<any>,
    ) { }

    public ifPieceNotKingSkippedPositionCaseOne(from: Position): Position {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column + 1
        };
        return this.skippedPosition;
    }

    public ifPieceNotKingSkippedPositionCaseTwo(from: Position): Position {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceNotKingSkippedPositionCaseThree(from: Position): Position {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column + 1
        };
        return this.skippedPosition;
    }

    public ifPieceNotKingSkippedPositionCaseFour(from: Position): Position {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseOne(from: Position): Position {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column + 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseTwo(from: Position): Position {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseThree(from: Position): Position {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseFour(from: Position): Position {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public findSkippedPosition(pieceSelected: Piece, from: Position, to: Position): Position | undefined {
        if (pieceSelected.color === Constants.ColorForFirstPlayer) {
            if (!pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseOne(from);
                        return this.skippedPosition;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseTwo(from);
                        return this.skippedPosition;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseThree(from);
                        return this.skippedPosition;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseFour(from);
                        return this.skippedPosition;
                    }

                }
            } else if (pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceKingSkippedPositionCaseOne(from);
                        return this.skippedPosition;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseTwo(from);
                        return this.skippedPosition;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseThree(from);
                        return this.skippedPosition;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseFour(from);
                        return this.skippedPosition;

                    }

                }
            }

        } else if (pieceSelected.color === Constants.ColorForSecondPlayer) {
            if (!pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseOne(from);
                        return this.skippedPosition;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseTwo(from);
                        return this.skippedPosition;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseThree(from);
                        return this.skippedPosition;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceNotKingSkippedPositionCaseFour(from);
                        return this.skippedPosition;
                    }

                }
            } else if (pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceKingSkippedPositionCaseOne(from);
                        return this.skippedPosition;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceKingSkippedPositionCaseTwo(from);
                        return this.skippedPosition;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this.ifPieceKingSkippedPositionCaseThree(from);
                        this.skippedPosition = {
                            row: this.skippedPosition.row,
                            column: this.skippedPosition.column + 1
                        };
                        return this.skippedPosition;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this.ifPieceKingSkippedPositionCaseFour(from);
                        return this.skippedPosition;

                    }
                }
            }
        }
    }
}

