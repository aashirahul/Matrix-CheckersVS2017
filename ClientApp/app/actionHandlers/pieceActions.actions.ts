import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Helper } from '../helpers/helper';
import { PieceHelper } from '../helpers/pieceHelper';

import { Piece } from '../models/game-piece';
import { LOAD_PIECES } from '../stores/pieces.store';
import { Position } from '../models/position';
import { Square } from '../models/square';
import { AppStateActions } from './appState.actions';

@Injectable()
export class PieceActions {
    private pieces: Array<Piece>;

    constructor(
        private _store: Store<any>,
        private _helper: Helper,
        private _pieceHelper: PieceHelper,
        private _appStateActions: AppStateActions
    ) { }

    public move(originalSquare: Square, square: Square): void {
        let updatedPieces;
        if (!square.piece) {
            let selectedPiece: any;
            selectedPiece = originalSquare.piece;
            const pieces = this._pieceHelper.getPieces();
            updatedPieces = pieces.map((piece) => {
                if (piece.position.row === selectedPiece.position.row && piece.position.column === selectedPiece.position.column) {
                    selectedPiece.position.row = square.position.row;
                    selectedPiece.position.column = square.position.column;
                    if (this._pieceHelper.checkIfPieceSelectedCanBeKing(selectedPiece, square.position.row)) {
                        selectedPiece.isKing = true;
                    } 
                }
                return piece;
            });
        }
        this._store.dispatch({
            type: LOAD_PIECES,
            payload: updatedPieces,

        });
        this._appStateActions.initializeSquares();
    }

    public jump(skipped: Position): void {
        let updatedPieces;
        const pieces = this._pieceHelper.getPieces();
        updatedPieces = pieces.map((piece) => {
            if (piece.position.row === skipped.row && piece.position.column === skipped.column) {
                piece.color = 'null';
                piece.position.row = null;
                piece.position.column = null;
            }
            return piece;
        });
        this._store.dispatch({
            type: LOAD_PIECES,
            payload: updatedPieces,
        });
        this._appStateActions.initializeSquares();
    }
}
