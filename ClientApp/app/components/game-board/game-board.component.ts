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
    public currentlyPlayingColor: string;
    public firstPlayerName: string;
    public secondPlayerName: string;
    public displayPlayerName: string;
    public isplayerNameSet = false;
    public pieceSelected: any;
    public isKing = false;
    public showPlayerNameModal: boolean;
    public currentPlayerIndex: number;
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
                this.currentlyPlayingColor = appState[`currentlyPlayingColor`];
                this.currentPlayerIndex = appState[`currentPlayerIndex`];
            });
        this.piecesSubscription = this._store.select('pieces').subscribe((pieces) => this.pieces = pieces);
        this.squaresSubscription = this._store.select('squares').subscribe((squares) => this.squares = squares);
        this.playersSubscription = this._store.select('players').subscribe((players: Array<Player>) => {
            this.players = players;
            if (players && players.length) {
                this.firstPlayerName = players[0].name;
                this.secondPlayerName = players[1].name;
            }
        });
    }

    public ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
        this.piecesSubscription.unsubscribe();
    }

    private editRedPlayerName(): void {
        this._appStateActions.updateState({ 'showPlayerNameModal': true, 'player.nameBeingUpdated': Constants.ColorForFirstPlayer });
    }

    private editBlackPlayerName(): void {
        this._appStateActions.updateState({ 'showPlayerNameModal': true, 'player.nameBeingUpdated': Constants.ColorForSecondPlayer });
    }

    private playerNameAdded(name: string): void {
        this._playerActions.updatePlayerName(name);
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

    public createRange(number: number) {
        return Array(number).fill('1');
    }

    private makePieceSelectedKing(pieceSelected: any, to: Position): void {
        if (!this.pieceSelected.isKing) {
            if (this._pieceHelper.checkIfPieceSelectedCanBeKing(this.pieceSelected, to.row)) {
                this._pieceActions.makeKing(this.pieceSelected.id);
                this._pieceActions.move(this.pieceSelected.position, to);
            }
        }
    }

    private restartGame(): void {
        this._appStartUpActions.initializeGame();
        this._appStartUpActions.initializeSquares();
        this._appStartUpActions.initializePlayers();
    }

}
