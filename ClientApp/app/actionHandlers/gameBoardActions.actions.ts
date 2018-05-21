import { HttpErrorResponse, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';

import { MoveHelper } from '../helpers/moveHelper';
import { PieceHelper } from '../helpers/pieceHelper';
import { SkippedPositionHelper } from '../helpers/skippedPositionHelper';
import { Square } from '../models/gameBoard';
import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import * as Constants from '../constants/constants';
import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { LOAD_SQUARES } from '../stores/gameBoard.store';
import { pieces } from '../stores/pieces.store';
import { PieceActions } from './pieceActions.actions';
import { PlayerActions } from './playerActions.actions';

@Injectable()
export class GameBoardActions {

    private pieces: Array<Square>;

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _helper: Helper,
        private _moveHelper: MoveHelper,
        private _pieceHelper: PieceHelper,
        private _pieceActions: PieceActions,
        private _playerActions: PlayerActions,
        private _skippedPositionHelper: SkippedPositionHelper
    ) { }

    public availableMoves(position: Position, pieceSelected: Piece) {
        let color = pieceSelected.color;
        const movesReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/squares/moves`, {
            params: new HttpParams().set("row", `${position.row}`).set("col", `${position.column}`).set("color", color)
        });
        this._api.callingApiService(movesReq)
            .subscribe(
            (moves) => {
                let availablesMoves: any = [];
                availablesMoves = moves;
                const squares = this._helper.getSquares();
                const updatedsquares = squares.map((square) => {
                    for (var i = 0; i < availablesMoves.length; i++) {
                        if (square.position.row === availablesMoves[i].row && square.position.column === availablesMoves[i].column) {
                            square.validMove = true;
                        }
                    }
                    return square;
                });
                this._store.dispatch({
                    type: LOAD_SQUARES,
                    payload: updatedsquares
                });
            },
            (err) => {
                this._store.dispatch({
                    type: LOAD_SQUARES,
                    payload: []
                });
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

    public updateSquareHasPiece(position: any): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === position.row && square.position.column === position.column) {
                square.hasPiece = true;
            }
            return square;
        });
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: updatedSquares
        });
    }

    public updateSquareHasNoPiece(position: any): void {
        let updatedSquares;
        const squares = this._helper.getSquares();
        updatedSquares = squares.map((square) => {
            if (square.position.row === position.row && square.position.column === position.column) {
                square.hasPiece = false;
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

    public squareClicked(square: Square, selectedPiece: Piece, originalPosition: Position): void {
        if (this._pieceHelper.checkIfPieceCurrentPlayingColor(selectedPiece)) {
            if (selectedPiece == null) {
                throw "Must select a piece first";
            } else if (this.positionMatches(square.position, selectedPiece.position)) {
                this.unhighlightSquares();
                this.availableMoves(square.position, selectedPiece);
            } else {
                if (this._moveHelper.isValidMove(selectedPiece, selectedPiece.position, square.position)) {
                    this._pieceActions.move(selectedPiece.position, square.position);
                    if (this._moveHelper.checkIfMoveCompleted(selectedPiece, selectedPiece.position, square.position.row, square.position.column)) {
                        this.pieceMoved(selectedPiece, selectedPiece.position, originalPosition);
                    }
                } else if (this._moveHelper.isAJump(selectedPiece, selectedPiece.position, square.position)) {
                    let skippedPosition: any;
                    skippedPosition = this._skippedPositionHelper.findSkippedPosition(selectedPiece, selectedPiece.position, square.position);
                    this._pieceActions.move(selectedPiece.position, square.position);
                    this._pieceActions.jump(skippedPosition);
                    if (this._moveHelper.checkIfJumpCompleted(selectedPiece, selectedPiece.position, square.position, skippedPosition)) {
                        this.pieceMoved(selectedPiece,selectedPiece.position, originalPosition);
                        this.pieceSkipped(skippedPosition);
                    }
                }
                else {
                    throw "Cannot move to this square";
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

    public pieceMoved(selectedPiece:Piece, newPosition: Position, originalPosition: Position): void {
        this.updateSquareHasPiece(newPosition);
        this.updateSquareHasNoPiece(originalPosition);
        this._playerActions.switchTurns(selectedPiece);
        this.unhighlightSquares();
    }

    public pieceSkipped(skippedPosition: Position): void {
        this.updateSquareHasNoPiece(skippedPosition);
    }
}
