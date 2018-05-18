import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../../models/game-piece';
import { Square } from '../../models/gameBoard';
import { Position } from '../../models/position';
import { Player } from '../../models/player';
import { PieceActions } from '../../actionHandlers/pieceActions.actions';
import { GameBoardActions } from '../../actionHandlers/gameBoardActions.actions';
import { PlayerActions } from '../../actionHandlers/playerActions.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { AppStartUpActions } from '../../actionHandlers/appStartUp.actions';
import { Helper } from '../../helpers/helper';
import { PieceHelper } from '../../helpers/pieceHelper';
import { MoveHelper } from '../../helpers/moveHelper';
import { SkippedPositionHelper } from '../../helpers/skippedPositionHelper';
import { PlayerHelper } from '../../helpers/playerHelper';
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
    public player: Player;
    public squares: Array<Square>;
    public players: Array<Player>;
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
    public skippedPosition: any;
    public availablePositionOne: Position;
    public availablePositionTwo: Position;
    public pieceSelected: any;
    public isKing = false;
    public showPlayerNameModal: boolean;
    private piecesSubscription: any;
    private squaresSubscription: any;
    private playersSubscription: any;
    private appStateSubscription: any;


    constructor(
        private _store: Store<any>,
        private _pieceActions: PieceActions,
        private _squareActions: GameBoardActions,
        private _playerActions: PlayerActions,
        private _appStartUpActions: AppStartUpActions,
        private _appStateActions: AppStateActions,
        private _helper: Helper,
        private _pieceHelper: PieceHelper,
        private _moveHelper: MoveHelper,
        private _playerHelper: PlayerHelper,
        private _skippedPositionHelper: SkippedPositionHelper
    ) { }

    public ngOnInit() {
        this.appStateSubscription = this._store.select('appState').
            subscribe((appState) => {
                this.isMoving = appState[`player.isMoving`];
                this.showPlayerNameModal = appState[`showPlayerNameModal`];
            });
        this.piecesSubscription = this._store.select('pieces').subscribe((pieces) => this.pieces = pieces);
        this.squaresSubscription = this._store.select('squares').subscribe((squares) => this.squares = squares);
        this.playersSubscription = this._store.select('players').subscribe((players: Array<Player>) => {
            if (players && players.length) {
                this.firstPlayerName = players[0].name;
                this.secondPlayerName = players[1].name;
            }
        });
        this.setDisplayPlayerName();
    }

    public ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
        this.piecesSubscription.unsubscribe();
    }

    private setDisplayPlayerName() {
        if (!this.firstPlayerName) {
            this.displayPlayerName = Constants.ColorForFirstPlayer;
        } else {
            this.displayPlayerName = this.firstPlayerName;
        }
    }

    private editRedPlayerName(): void {
        this._appStateActions.updateState({ 'showPlayerNameModal': true, 'player.nameBeingUpdated': Constants.ColorForFirstPlayer });
    }

    private editBlackPlayerName(): void {
        this._appStateActions.updateState({ 'showPlayerNameModal': true, 'player.nameBeingUpdated': Constants.ColorForSecondPlayer });
    }

    private playerNameAdded(name: string): void {
        this._playerActions.updatePlayerName(name);
        this.setDisplayPlayerName();
    }

    private pieceSelectedisCurrentPlayer(): boolean {
        if (this.pieceSelected.color === this.currentlyPlayingColor) {
            return true;
        }
        return false;
    }

    public findPiece(row: number, col: number): Piece | undefined {
        const piece = this._pieceHelper.findSelectedPiece(row, col);
        if (piece) {
            return piece;
        }
    }

    public findSquare(row: number, col: number): Square | undefined {
        const square = this._helper.findSelectedSquare(row, col);
        if (square) {
            return square;
        }
    }

    private switchTurn(): void {
        this.currentlyPlayingColor = this._helper.switchPlayingColor(this.currentlyPlayingColor);
        this.displayPlayerName = this._playerHelper.switchDisplayPlayerName(this.displayPlayerName, this.firstPlayerName, this.secondPlayerName);
    }

    private makePieceSelectedKing(pieceSelected: any, to: Position): void {
        if (!this.pieceSelected.isKing) {
            if (this._pieceHelper.checkIfPieceSelectedCanBeKing(this.pieceSelected, to.row)) {
                this._pieceActions.makeKing(this.pieceSelected.id);
                this._pieceActions.move(this.pieceSelected.position, to);
            }
        }
    }

    private callPieceActions(pieceSelected: Piece, originalPosition: Position, { row, column }: any): void {
        this._pieceActions.move(originalPosition, { row, column });
        this.skippedPosition = this._skippedPositionHelper.findSkippedPosition(pieceSelected, originalPosition, { row, column });
        this._pieceActions.jump(this.skippedPosition);
    }

    private callSquareActions(originalPosition: Position, { row, column }: any, skippedPosition: Position): void {
        this._squareActions.updateSquareHasPiece({ row, column });
        this._squareActions.updateSquareHasNoPiece(originalPosition);
        this.switchTurn();
        this._squareActions.unhighlightSquares();
        if (this.skippedPosition) {
            this._squareActions.updateSquareHasNoPiece(skippedPosition);
        }
    }

    private addingPoints(): void {
        this._playerActions.addPoint(this.pieceSelected.color);
        if (this.pieceSelected.color === Constants.ColorForFirstPlayer) {
            this.scoreRed = this._playerHelper.updateScore(this.pieceSelected.color);
        }
        if (this.pieceSelected.color === Constants.ColorForSecondPlayer) {
            this.scoreBlack = this._playerHelper.updateScore(this.pieceSelected.color);
        }
    }

    private moveStarted(row: number, column: number): void {
        this.originalPosition = { row, column };
        this.pieceSelected = this._pieceHelper.findSelectedPiece(this.originalPosition.row, this.originalPosition.column);
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
            this.makePieceSelectedKing(this.pieceSelected, { row, column });
            if (this._moveHelper.isAJump(pieceSelected, originalPosition, { row, column })) {
                this.callPieceActions(pieceSelected, originalPosition, { row, column });
                if (this._moveHelper.checkIfJumpCompleted(pieceSelected, originalPosition, { row, column }, this.skippedPosition)) {
                    this.callSquareActions(originalPosition, { row, column }, this.skippedPosition);
                    this.addingPoints();
                }
            } else if (this._moveHelper.isValidMove(pieceSelected, originalPosition, { row, column })) {
                this._pieceActions.move(originalPosition, { row, column });
                if (this._moveHelper.checkIfMoveCompleted(pieceSelected, originalPosition, row, column)) {
                    this.callSquareActions(originalPosition, { row, column }, this.skippedPosition);
                }
            }
        }
    }

    private moveComplete(pieceSelected: any, originalPosition: any): void {
        this._appStateActions.updateState({ 'player.isMoving': false });
    }

    private moveSelected(row: number, column: number): void {
        if (!this.isMoving) {
            this.moveStarted(row, column);
            this.pieceSelected = this._pieceHelper.findSelectedPiece(row, column);
        } else {
            this.moveInProgress(this.pieceSelected, this.originalPosition, row, column);
            this.moveComplete(this.pieceSelected, this.originalPosition);
        }
    }

    private restartGame(): void {
        this._appStartUpActions.initializeGame();
        this._appStartUpActions.initializeSquares();
        this._appStartUpActions.initializePlayers();
    }

}
