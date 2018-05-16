import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/gameBoard';
import * as Constants from '../constants/constants';
import { PlayerActions } from '../actionHandlers/playerActions.actions';

@Injectable()
export class Helper {

    public skippedPosition: Position;

    constructor(
        private _store: Store<any>,
    ) { }

    public findSelectedPiece(row: number, col: number): Piece | undefined {
        const pieces = this.getPieces();
        return pieces.find((piece) => (piece.position.row === row && piece.position.column === col));
    }

    public findSelectedSquare(row: number, col: number): Square | undefined {
        const squares = this.getSquares();
        return squares.find((square) => (square.position.row === row && square.position.column === col));
    }

    public getPieceToBeUpdated(id: number): any {
        const pieces = this.getPieces();
        let updatedPiece: any;
        return pieces.find((piece) =>
            (piece.id === id));
    }

    public getPlayerNameBeingUpdated(): string {
        let playerBeingUpdated: string = '';
        this._store.select('appState').subscribe((appState) => {
            playerBeingUpdated = appState[`player.nameBeingUpdated`];
        });
        return playerBeingUpdated;
    }

    public getCurrentPlayers(): Array<Player> {
        let currentPlayers: Array<Player> = [];
        this._store.select('players').subscribe((players) => currentPlayers = players);
        return currentPlayers;
    }

    public getSquares(): Array<Square> {
        let allSquares: Array<Square> = [];
        this._store.select('squares').subscribe((squares) => allSquares = squares);
        return allSquares;
    }

    public getPieces(): Array<Piece> {
        let allPieces: Array<Piece> = [];
        this._store.select('pieces').subscribe((pieces) => allPieces = pieces);
        return allPieces;
    }

    public switchDisplayPlayerName(displayPlayerName: string, firstPlayerName: string, secondPlayerName: string): string | any {
        if (firstPlayerName === Constants.ColorForFirstPlayer) {
            if (!secondPlayerName) {
                displayPlayerName = displayPlayerName === Constants.ColorForFirstPlayer ? Constants.ColorForSecondPlayer : Constants.ColorForFirstPlayer;
            } else {
                displayPlayerName = displayPlayerName === Constants.ColorForFirstPlayer ? secondPlayerName : Constants.ColorForFirstPlayer;
            }
            return displayPlayerName;
        } else {
            if (!secondPlayerName) {
                displayPlayerName = displayPlayerName === firstPlayerName ? Constants.ColorForSecondPlayer : firstPlayerName;
            } else {
                displayPlayerName = displayPlayerName === firstPlayerName ? secondPlayerName : firstPlayerName;
            }
            return displayPlayerName;
        }
    }

    public switchPlayingColor(currentlyPlayingColor: string): string | any {
        currentlyPlayingColor = currentlyPlayingColor === Constants.ColorForFirstPlayer ? Constants.ColorForSecondPlayer : Constants.ColorForFirstPlayer;
        return currentlyPlayingColor;
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

    public updateRedScoreOnGameBoard(color: string): Array<number> {
        const players = this.getCurrentPlayers();
        const scoreRed = Array(players[0].score).fill('1');
        return scoreRed;
    }

    public updateBlackScoreOnGameBoard(color: string): Array<number> {
        const players = this.getCurrentPlayers();
        const scoreBlack = Array(players[1].score).fill('1');
        return scoreBlack;
    }

    public checkIfPieceSelectedCanBeKing(piece: Piece, row: number): boolean {
        if (piece.color === Constants.ColorForFirstPlayer && row === 7) {
            return true;
        } else if (piece.color === Constants.ColorForSecondPlayer && row === 0) {
            return true;
        }
        return false;
    }

    public isValidMove(piece: Piece, from: Position, to: Position): boolean {
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

    public isAJump(pieceSelected: Piece, from: Position, to: Position): boolean {
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

