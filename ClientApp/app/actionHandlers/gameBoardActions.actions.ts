import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';

import { MoveHelper } from '../helpers/moveHelper';
import { PieceHelper } from '../helpers/pieceHelper';
import { SkippedPositionHelper } from '../helpers/skippedPositionHelper';
import { Square } from '../models/square';
import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { LOAD_SQUARES } from '../stores/gameBoard.store';
import { pieces } from '../stores/pieces.store';
import { PieceActions } from './pieceActions.actions';
import { PlayerActions } from './playerActions.actions';
import { AppStateActions } from './appState.actions';
import * as fromappstate from '../stores/appState.store';

@Injectable()
export class GameBoardActions implements OnInit {

    private pieces: Array<Square>;
    private appStateSubscription: any;
    public isJump: boolean;
    public jumpedSquare: Square;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _helper: Helper,
        private _moveHelper: MoveHelper,
        private _pieceHelper: PieceHelper,
        private _pieceActions: PieceActions,
        private _playerActions: PlayerActions,
        private _skippedPositionHelper: SkippedPositionHelper,
        private _appStateActions: AppStateActions

    ) { }

    public ngOnInit() {

    }


    public availableJumps(square: Square, pieceSelected: Piece): void {
        let availableJumps: Array<any> = [];
        const squares = this._helper.getSquares();
        availableJumps = this._pieceHelper.getAvailableJumpsForPiece(square.position, pieceSelected);
        const updatedsquares = squares.map((square) => {
            for (var i = 0; i < availableJumps.length; i++) {
                if (this.isSamePosition(square.position, availableJumps[i]) &&
                    this.isNextToJumpedSquare(square)) {
                    if (!square.piece) {
                        square.validMove = true;
                    } else if (square.piece) {

                    }
                }
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedsquares
        });
    }

    private isNextToJumpedSquare(square: Square): boolean {
        let availableMoveOne: Position;
        let availableMoveTwo: Position;
        let availableMoveThree: Position;
        let availableMoveFour: Position;

        availableMoveOne = {
            row: this.jumpedSquare.position.row + 1,
            column: this.jumpedSquare.position.column + 1
        }
        availableMoveTwo = {
            row: this.jumpedSquare.position.row + 1,
            column: this.jumpedSquare.position.column - 1
        }
        availableMoveThree = {
            row: this.jumpedSquare.position.row - 1,
            column: this.jumpedSquare.position.column + 1
        }
        availableMoveFour = {
            row: this.jumpedSquare.position.row - 1,
            column: this.jumpedSquare.position.column - 1
        }

        return this.isSamePosition(square.position, availableMoveOne) ||
            this.isSamePosition(square.position, availableMoveTwo) ||
            this.isSamePosition(square.position, availableMoveThree) ||
            this.isSamePosition(square.position, availableMoveFour);
    }

    private isSamePosition(pos1: Position, pos2: Position): boolean {
        return pos1.row === pos2.row && pos1.column === pos2.column;
    }

    public availableMoves(square: Square, pieceSelected: Piece) {
        this.isJump = false;
        let availableMoves: Array<any> = [];
        availableMoves = this._pieceHelper.getAvailableMovesForPiece(square.position, pieceSelected);
        const squares = this._helper.getSquares();
        const updatedsquares = squares.map((square) => {
            for (var i = 0; i < availableMoves.length; i++) {
                if (square.position.row === availableMoves[i].row &&
                    square.position.column === availableMoves[i].column) {
                    if (!square.piece) {
                        square.validMove = true;
                    } else if (square.piece) {
                        this.isJump = true;
                        this.jumpedSquare = square;
                    }
                }
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedsquares
        });
    }

    public highlightSelectedSquare(selectedSquare: Square): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === selectedSquare.position.row && square.position.column === selectedSquare.position.column) {
                square.isSelected = true;
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedSquares
        });
    }

    public unhighlightSquares(): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        squares.forEach((square) => {
            square.validMove = false;
            square.isSelected = false;
        });

        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: squares
        });
    }

    public moveStarted(square: Square, selectedPiece: any): void {
        if (this._pieceHelper.checkIfPieceCurrentPlayingColor(selectedPiece)) {
            this.unhighlightSquares();
            this.highlightSelectedSquare(square);
            this.availableMoves(square, selectedPiece);
            if (this.isJump) {
                this.availableJumps(square, selectedPiece);
            }
            this._appStateActions.updateState({ 'player.isMoving': true });
        } else {
            this._appStateActions.updateState({ 'squareSelected': null });

            alert("Not your turn");
        }
    }

    public squareClicked(square: Square): void {
        if (this._moveHelper.checkIfMoveStarted()) {
            this._appStateActions.updateState({ 'squareSelected': square });
            if (this._pieceHelper.checkIfSquareHasPiece(square)) {
                this.moveStarted(square, square.piece)
            } else {
                alert("Must select a Piece");
                this._appStateActions.updateState({ 'squareSelected': null });
            }
        } else {
            let toMoveSquare = square;
            let originalSquare = this._pieceHelper.getOriginalSquare();
            if (!toMoveSquare.piece) {
                if (this._moveHelper.isAJump(originalSquare.piece, originalSquare.position, square.position)) {
                    let skippedPosition: any;
                    skippedPosition = this._skippedPositionHelper.findSkippedPosition(originalSquare.piece, originalSquare.position, square.position);
                    this._pieceActions.jump(skippedPosition);
                    this.pieceMoved(originalSquare, toMoveSquare);
                    this._playerActions.addPoint(originalSquare.piece);
                }
                else if (this._moveHelper.isValidMove(originalSquare.piece, originalSquare.position, toMoveSquare.position)) {
                    this.pieceMoved(originalSquare, toMoveSquare);

                } else {
                    alert("Cannot make this move");
                }
            } else if (toMoveSquare == originalSquare) {
                this._appStateActions.updateState({ 'squareSelected': null });
                this._appStateActions.updateState({
                    'player.isMoving': false
                });
                this.unhighlightSquares();
            }

        }
    }

    private positionMatches(position1: Position, position2: Position): boolean {
        if (position1.row === position2.row && position1.column === position2.column) {
            return true;
        }
        return false;
    }

    public pieceMoved(originalSquare: Square, toMoveSquare: Square): void {
        this._pieceActions.move(originalSquare, toMoveSquare);
        this._appStateActions.updateState({ 'squareSelected': null });
        this._playerActions.switchTurns(originalSquare.piece);
        this._appStateActions.updateState({
            'player.isMoving': false
        });


    }
}
