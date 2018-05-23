import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Constants from '../constants/constants';
import { UPDATE_APP_STATE } from '../stores/appState.store';
import { Piece } from '../models/game-piece';
import { Player } from '../models/player';
import { Square } from '../models/square';
import { Position } from '../models/position';
import { LOAD_SQUARES } from '../stores/gameBoard.store';
import { PieceHelper } from '../helpers/pieceHelper';


@Injectable()
export class AppStateActions {
    //private selectedPiece: any;
    //public originalPosition: Position;

    constructor(
        private _store: Store<any>,
        private _pieceHelper: PieceHelper
    ) { }

    public initializeSquares(): void {
        let squares: Array<Square> = [];
        let pieces = this._pieceHelper.getPieces();
        let reqPiece: any;
        let squareColor: string = "";
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let position: Position = {
                    row: row,
                    column: col
                };
                if (row % 2 === 0 && col % 2 === 0 || row % 2 != 0 && col % 2 != 0) {
                    squareColor = "lightblue";
                }
                if (row % 2 === 0 && col % 2 != 0) {
                    squareColor = "lightskyblue";
                }
                if (col % 2 === 0 && row % 2 != 0) {
                    squareColor = "lightskyblue";
                }
                let reqPiece = pieces.find((piece) => (piece.position.row === row && piece.position.column === col));
                let square: Square = {
                    id: (row * 8) + col,
                    position: position,
                    color: squareColor,
                    isSelected: false,
                    piece: reqPiece,
                    validMove: false
                };
                squares.push(square);
            }
        }
        this._store.dispatch({
            type: LOAD_SQUARES,
            payload: squares
        })
    }

    public updateState(stateChanges: object): void {
        this._store.dispatch(
            {
                type: UPDATE_APP_STATE,
                payload: stateChanges
            }
        );
    }

    public setOriginalPosition(row: any, col: any): void {
        //this.originalPosition = {
        //    row: row,
        //    column: col
        //};
    }

    //public getOriginalPosition(): Position {
    //    //return this.originalPosition;
    //}

    //public getSelectedPiece(): Piece {
    //    //return this.selectedPiece;
    //}

    public setSelectedPiece(selectedPiece: any): void {
        //this.selectedPiece = selectedPiece;
    }

}