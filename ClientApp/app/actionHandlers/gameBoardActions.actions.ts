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
        console.log(availableJumps);
        const updatedsquares = squares.map((square) => {
            for (var i = 0; i < availableJumps.length; i++) {
                if (square.position.row === availableJumps[i].row &&
                    square.position.column === availableJumps[i].column) {
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

    public squareSelected(position: Position): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === position.row && square.position.column === position.column) {
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
                console.log("hi");
            } else {
                alert("Must select a Piece");
                this._appStateActions.updateState({ 'squareSelected': null });
            }
        } else {
            console.log("lo");
            let toMoveSquare = square;
            let originalSquare = this._pieceHelper.getOriginalSquare();
            if (!toMoveSquare.piece) {
                console.log("yo");
                if (this._moveHelper.isAJump(originalSquare.piece, originalSquare.position, square.position)) {
                    let skippedPosition: any;
                    skippedPosition = this._skippedPositionHelper.findSkippedPosition(originalSquare.piece, originalSquare.position, square.position);
                    this._pieceActions.move(originalSquare, toMoveSquare);
                    this._pieceActions.jump(skippedPosition);
                    this._appStateActions.updateState({ 'squareSelected': null });
                    this._playerActions.switchTurns(originalSquare.piece);
                    this._appStateActions.updateState({
                        'player.isMoving': false
                    });
                    this._playerActions.addPoint(originalSquare.piece);
                }
                else if (this._moveHelper.isValidMove(originalSquare.piece, originalSquare.position, toMoveSquare.position)) {
                    this._pieceActions.move(originalSquare, toMoveSquare);
                    this._appStateActions.updateState({ 'squareSelected': null });
                    this._playerActions.switchTurns(originalSquare.piece);
                    this._appStateActions.updateState({
                        'player.isMoving': false
                    });

                } else {
                    alert("Cannot make this move");
                }
            }

        }
    }

    private positionMatches(position1: Position, position2: Position): boolean {
        if (position1.row === position2.row && position1.column === position2.column) {
            return true;
        }
        return false;
    }

    public pieceMoved(selectedPiece: Piece, newPosition: Position, originalPosition: Position): void {

      

    }

    public pieceJumped(selectedPiece: Piece, selectedPiecePosition: Position, originalPosition: Position, skippedPosition: Position): void {
        this.pieceMoved(selectedPiece, selectedPiecePosition, originalPosition);

        
    }
}
