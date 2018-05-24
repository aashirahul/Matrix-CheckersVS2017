import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/square';
import * as Constants from '../constants/constants';
import { PlayerActions } from '../actionHandlers/playerActions.actions';

@Injectable()
export class MoveHelper {

    public skippedPosition: Position;

    constructor(
        private _store: Store<any>,
    ) { }

    public checkIfMoveStarted(): boolean {
        let squareSelected = null;
        this._store.select('appState').subscribe((appState) => {
            squareSelected = appState[`squareSelected`];
        });
        if (squareSelected === null) {
            return true;
        }
        return false;
    }

 
   
    public checkIfMoveCompleted(pieceSelected: Piece, originalPosition: Position, row: number, column: number): boolean {
        if (pieceSelected.position.row === row && pieceSelected.position.column === column) {
            return true;
        }
        return false;
    }

    public checkIfJumpCompleted(pieceSelected: Piece, originalPosition: Position, { row, column }: any, skippedPosition: Position): boolean {
        if (pieceSelected.position.row === row && pieceSelected.position.column === column) {
            return true;
        }
        return false;
    }

    public isValidMove(piece: any, from: Position, to: Position): boolean {
        if (piece.color === Constants.ColorForFirstPlayer) {
            if (this.checkIfMoveCorrectForRed(piece, from, to)) {
                return true;
            }
        } else if (piece.color === Constants.ColorForSecondPlayer) {
            if (this.checkIfMoveCorrectForBlack(piece, from, to)) {
                return true;
            }
        }
        return false;
    }

    public checkIfMoveCorrectForRed(pieceSelected: Piece, from: Position, to: Position): boolean {
        if (!pieceSelected.isKing) {
            if (to.row > from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
                return false;
            }
            return false;
        } else if (pieceSelected.isKing) {
            if (to.row > from.row || to.row < from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
                return false;
            }
            return false;
        }
        return false;
    }

    public checkIfMoveCorrectForBlack(pieceSelected: Piece, from: Position, to: Position): boolean {
        if (!pieceSelected.isKing) {
            if (to.row < from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
                return false;
            }
            return false;

        } else if (pieceSelected.isKing) {
            if (to.row < from.row || to.row > from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
                return false;
            }
            return false;
        }
        return false;
    }

    public isAJump(pieceSelected: any, from: Position, to: Position): boolean {
        if (pieceSelected.color === Constants.ColorForFirstPlayer) {
            if (!pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        return true;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        return true;
                    }

                }
            } else if (pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        return true;

                    } else if (from.column === to.column + 2) {
                        return true;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        return true;

                    } else if (from.column === to.column + 2) {
                        return true;

                    }

                }
            }

        } else if (pieceSelected.color === Constants.ColorForSecondPlayer) {
            if (!pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        return true;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        return true;
                    }

                }
            } else if (pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        return true;

                    } else if (from.column === to.column + 2) {
                        return true;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        return true;

                    } else if (from.column === to.column + 2) {
                        return true;

                    }
                }
            }
        }
        return false;
    }

}

