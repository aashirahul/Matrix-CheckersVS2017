import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../models/game-piece';
import { Store } from '@ngrx/store';
import { Square } from '../../models/square';
import { PieceActions } from '../../actionHandlers/pieceActions.actions';
import { GameBoardActions } from '../../actionHandlers/gameBoardActions.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';

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
    public squares: Array<Square>;
    //public subSquares: Array<Square>;

    constructor(
        private _store: Store<any>,
        private _pieceActions: PieceActions,
        private _gameBoardActions: GameBoardActions,
        private _appStateActions: AppStateActions
    ) { }

    public ngOnInit() {
        this.squaresSubscription = this._store.select('squares').subscribe((squares) => this.squares = squares);
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
