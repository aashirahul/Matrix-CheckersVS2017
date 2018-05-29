import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../models/game-piece';
import { Store } from '@ngrx/store';
import { Square } from '../../models/square';
import { PieceActions } from '../../actionHandlers/pieceActions.actions';
import { GameBoardActions } from '../../actionHandlers/gameBoardActions.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as Constants from '../../constants/constants';

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
    @Input()
    square: Square;

    @Input()
    piece: Piece;
    private squaresSubscription: any;
    private appStateSubscription: any;
    public squares: Array<Square>;
    public rows: Array<number>;
    public pieceColorRed: String = Constants.ColorForFirstPlayer;
    public pieceColorBlack: String = Constants.ColorForSecondPlayer;

    constructor(
        private _store: Store<any>,
        private _pieceActions: PieceActions,
        private _gameBoardActions: GameBoardActions,
        private _appStateActions: AppStateActions
    ) { }

    public ngOnInit() {
        this.squaresSubscription = this._store.select('squares').subscribe((squares) => this.squares = squares);
        this.rows = Array.from({ length: Constants.NumberOfRowsRequired }, (v, i) => i);
    }

    public getSquaresOnRow(row: number): Array<Square> {
        let rowSquares: Array<Square> = [];
        this.squares.forEach((square) => {
            if (square.position.row == row) {
                rowSquares.push(square);
            }
        });

        return rowSquares;
    }

    public squareSelected(square: Square): void {
        this._gameBoardActions.squareClicked(square);
    }

}
