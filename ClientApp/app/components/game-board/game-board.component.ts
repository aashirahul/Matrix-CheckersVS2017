import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../../models/game-piece';
import { Square } from '../../models/gameBoard';
import { Point } from '../../models/point';
import { Position } from '../../models/position';
import { PieceActions } from '../../actionHandlers/pieceActions.actions';
import { GameBoardActions } from '../../actionHandlers/gameBoardActions.actions';
import { PointActions } from '../../actionHandlers/pointActions.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { Helper } from '../../helpers/helper';
import * as Constants from '../../constants/constants';
import * as fromappstate from '../../stores/appState.store';



@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
    public pieces: Array<Piece>;
    public piece: Piece;
    public point: Point;
    public squares: Array<Square>;
    public points: Array<Point>;
    public scoreRed: Array<number> = [];
    public scoreBlack: Array<number> = [];

    public selectedPiece: number;
    public isMoving = false;
    public originalPosition: Position;
    public currentlyPlayingColor = Constants.ColorForFirstPlayer;
    public firstPlayerName: string;
    public secondPlayerName: string;
    public displayPlayerName: string;
    public isplayerNameSet = false;
    public skippedPosition: Position;
    public availablePositionOne: Position;
    public availablePositionTwo: Position;
    public pieceSelected: any;
    public isKing = false;
    public showPlayerNameModal: boolean;
    private piecesSubscription: any;
    private pointsSubscription: any;
    private squaresSubscription: any;
    private appStateSubscription: any;


    constructor(
        private _store: Store<any>,
        private _pieceActions: PieceActions,
        private _squareActions: GameBoardActions,
        private _pointActions: PointActions,
        private _appStateActions: AppStateActions,
        private _helper: Helper
    ) { }

    public ngOnInit() {
        this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
            this.isMoving = appState[`player.isMoving`];
        });
        this.pointsSubscription = this._store.select('points').subscribe((points) => this.points = points);
        this.piecesSubscription = this._store.select('pieces').subscribe((pieces) => this.pieces = pieces);
        this.squaresSubscription = this._store.select('squares').subscribe((squares) => this.squares = squares);
        this.appStateSubscription = this._store.select('appState').subscribe((as: fromappstate.State) => {
            this.showPlayerNameModal = as.showPlayerNameModal;
        });
        this.setDisplayPlayerNames();
    }

    public ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
        this.pointsSubscription.unsubscribe();
        this.piecesSubscription.unsubscribe();
    }

    private setDisplayPlayerNames(): void {
        this.displayPlayerName = Constants.ColorForFirstPlayer;
        if (!this.firstPlayerName) {
            this.firstPlayerName = Constants.ColorForFirstPlayer;
        }
        if (!this.secondPlayerName) {
            this.secondPlayerName = Constants.ColorForSecondPlayer;
        }
    }

    private editPlayerName(): void {
        this._appStateActions.updateState({ 'showPlayerNameModal': true });
    }

    private playerNameAdded(event: any): void {
        if (!this.isplayerNameSet) {
            this.firstPlayerName = event;
            this.displayPlayerName = this.firstPlayerName;
            this.isplayerNameSet = true;
        } else {
            this.secondPlayerName = event;
        }
    }

    private pieceSelectedisCurrentPlayer(): boolean {
        if (this.pieceSelected.color === this.currentlyPlayingColor) {
            return true;
        }
        return false;
    }

    public findPiece(row: number, col: number): Piece | undefined {
        return this.pieces.find((piece) => {
            if (piece.position.row === row && piece.position.column === col) {
                return true;
            } else {
                return false;
            }
        });
    }

    public findSquare(row: number, col: number): Square | undefined {
        return this.squares.find((square) => (square.position.row === row && square.position.column === col));
    }

    private switchPlayingColor(): void {
        this.currentlyPlayingColor = this.currentlyPlayingColor === Constants.ColorForFirstPlayer ? Constants.ColorForSecondPlayer : Constants.ColorForFirstPlayer;
        console.log(this.currentlyPlayingColor);
    }

    private switchDisplayPlayerName(): void {
        if (this.firstPlayerName === Constants.ColorForFirstPlayer) {
            this.displayPlayerName = this.displayPlayerName === Constants.ColorForFirstPlayer ? Constants.ColorForSecondPlayer : Constants.ColorForFirstPlayer;
        } else {
            this.displayPlayerName = this.displayPlayerName === this.firstPlayerName ? this.secondPlayerName : this.firstPlayerName;
        }
    }

    private switchTurn(): void {
        this.switchPlayingColor();
        this.switchDisplayPlayerName();
    }

    private makePieceSelectedKing(pieceSelected: any, to: Position): void {
        if (!this.pieceSelected.isKing) {
            if (this._helper.checkIfPieceSelectedCanBeKing(this.pieceSelected, to.row)) {
                this._pieceActions.makeKing(this.pieceSelected);
            }
        }
    }

    private checkIfJumpCompleted(pieceSelected: Piece, originalPosition: Position, { row, column }: any, skippedPosition: Position): void {
        if (pieceSelected.position.row === row && pieceSelected.position.column === column) {
            this._squareActions.updateSquareHasPiece({ row, column });
            this._squareActions.updateSquareHasNoPiece(this.skippedPosition);
            this._squareActions.updateSquareHasNoPiece(originalPosition);
            this.switchTurn();
        }
    }

    private checkIfMoveCompleted(pieceSelected: Piece, originalPosition: Position, { row, column }: any): void {
        if (pieceSelected.position.row === row && pieceSelected.position.column === column) {
            this._squareActions.updateSquareHasPiece({ row, column });
            this._squareActions.updateSquareHasNoPiece(originalPosition);
            this.switchTurn();
        }
    }


    private moveStarted(row: number, column: number): void {
        this.originalPosition = { row, column };
        this.pieceSelected = this._helper.findSelectedPiece(this.originalPosition.row, this.originalPosition.column, this.pieces);
        if (this.pieceSelectedisCurrentPlayer()) {
            this._squareActions.squareSelected(this.originalPosition);
            if (!this.pieceSelected.isKing) {
                this._squareActions.availableMoves(this.originalPosition, this.pieceSelected);
            }
            this._appStateActions.updateState({ 'player.isMoving': true, 'pieceSelected.Id': this.pieceSelected.id });
        }
    }

    private moveInProgress(pieceSelected: Piece, originalPosition: Position, row: number, column: number): void {
        if (this.pieceSelectedisCurrentPlayer()) {
            if (this.isAJump(originalPosition, { row, column })) {
                this._pieceActions.jump(originalPosition, { row, column }, this.skippedPosition, this.squares);
                this.checkIfJumpCompleted(pieceSelected, originalPosition, { row, column }, this.skippedPosition);
                this.addingPoints();
            } else if (this.isValidMove(originalPosition, { row, column })) {
                this._pieceActions.move(originalPosition, { row, column }, this.squares);
                this.checkIfMoveCompleted(pieceSelected, originalPosition, { row, column });
            }
            this._squareActions.unhighlightSquares();
        }
    }

    private moveComplete(pieceSelected: any, originalPosition: any): void {
        this._appStateActions.updateState({ 'player.isMoving': false });
    }


    private addingPoints(): void {
        this._pointActions.addPoint(this.pieceSelected.color);
        if (this.pieceSelected.color === Constants.ColorForFirstPlayer) {
            this.scoreRed = Array(this.points[0].count).fill('1');
        } else if (this.pieceSelected.color === Constants.ColorForSecondPlayer) {
            this.scoreBlack = Array(this.points[1].count).fill('2');
        }
    }

    private moveSelected(row: number, column: number): void {
        if (!this.isMoving) {
            this.moveStarted(row, column);
            this.pieceSelected = this._helper.findSelectedPiece(row, column, this.pieces);
        } else {
            this.moveInProgress(this.pieceSelected, this.originalPosition, row, column);
            this.moveComplete(this.pieceSelected, this.originalPosition);
        }
    }

    private isAJump(from: Position, to: Position): boolean {
        this.makePieceSelectedKing(this.pieceSelected, to);
        if (this.pieceSelected.color === Constants.ColorForFirstPlayer) {
            if (!this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseOne(from);
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseTwo(from);
                        return true;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseThree(from);
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseFour(from);
                        return true;
                    }

                }
            } else if (this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceKingSkippedPositionCaseOne(from);
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseTwo(from);
                        return true;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseThree(from);
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseFour(from);
                        return true;

                    }

                }
            }

        } else if (this.pieceSelected.color === Constants.ColorForSecondPlayer) {
            if (!this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseOne(from);
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseTwo(from);
                        return true;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseThree(from);
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceNotKingSkippedPositionCaseFour(from);
                        return true;
                    }

                }
            } else if (this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceKingSkippedPositionCaseOne(from);
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceKingSkippedPositionCaseTwo(from);
                        return true;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = this._helper.ifPieceKingSkippedPositionCaseThree(from);
                        this.skippedPosition = {
                            row: this.skippedPosition.row,
                            column: this.skippedPosition.column + 1
                        };
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = this._helper.ifPieceKingSkippedPositionCaseFour(from);
                        return true;

                    }
                }
            }
        }
        return false;
    }

    private isValidMove(from: Position, to: Position): boolean {
        this.makePieceSelectedKing(this.pieceSelected, to);
        if (this.pieceSelected.color === Constants.ColorForFirstPlayer) {
            if (this._helper.checkIfMoveCorrectForRed(this.pieceSelected, from, to)) {
                return true;
            }
        } else if (this.pieceSelected.color === Constants.ColorForSecondPlayer) {
            if (this._helper.checkIfMoveCorrectForBlack(this.pieceSelected, from, to)) {
                return true;
            }
        }
        return false;
    }
}
