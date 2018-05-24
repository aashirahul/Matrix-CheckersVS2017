import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import { Player } from '../models/player';
import { Square } from '../models/square';
import * as Constants from '../constants/constants';
import { PlayerActions } from '../actionHandlers/playerActions.actions';



@Injectable()
export class PieceHelper {

    public skippedPosition: Position;

    constructor(
        private _store: Store<any>,

    ) { }

    public checkIfSquareHasPiece(square: Square): boolean {
        if (square.piece) {
            return true;
        }
        return false;
    }

    public getOriginalSquare(): Square {
        let originalSquare: any;
        this._store.select('appState').subscribe((appState) => {
            originalSquare = appState[`squareSelected`];
        });
        return originalSquare;
    }


    public getPieceToBeUpdated(id: number): any {
        const pieces = this.getPieces();
        let updatedPiece: any;
        return pieces.find((piece) =>
            (piece.id === id));
    }

    public getPieces(): Array<any> {
        let allPieces: Array<Piece> = [];
        this._store.select('pieces').subscribe((pieces) => allPieces = pieces);
        return allPieces;
    }

    public checkIfPieceCurrentPlayingColor(piece: Piece): boolean {
        let currentlyPlayingColor: string = '';
        this._store.select('appState').subscribe((appState) => {
            currentlyPlayingColor = appState[`currentlyPlayingColor`];
        });
        if (piece.color === currentlyPlayingColor) {
            return true;
        }
        return false;
    }

    public checkIfPieceSelectedCanBeKing(piece: Piece, row: number): boolean {
        if (piece.color === Constants.ColorForFirstPlayer && row === 7) {
            return true;
        } else if (piece.color === Constants.ColorForSecondPlayer && row === 0) {
            return true;
        }
        return false;
    }
}

