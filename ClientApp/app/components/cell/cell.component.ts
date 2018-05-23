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
    public subSquares: any;

    constructor(
        private _store: Store<any>,
        private _pieceActions: PieceActions,
        private _gameBoardActions: GameBoardActions,
        private _appStateActions: AppStateActions
    ) { }

    public ngOnInit() {
        this.squaresSubscription = this._store.select('squares').subscribe((squares) => this.squares = squares);
        this.subSquares = this.setGameBoard();
        console.log(this.subSquares);
    }

    public setGameBoard(): Array<any> | undefined {
        var sqrt = Math.sqrt(this.squares.length);
        var subSquares = [];
        for (var i = 0; i < 7; i++) {
            for (var i = 0; i < sqrt; i++) {
                subSquares.push(this.squares.slice(i * sqrt));
            }
            return subSquares;
        }
    }

    public squareSelected(): void {

        //if (this.piece) {
        //    this._appStateActions.setOriginalPosition(this.piece.position.row, this.piece.position.column);
        //    let selectedPiece = this._pieceActions.pieceClicked(this.piece);
        //    //let originalPosition = this._appStateActions.getOriginalPosition();
        //    //this._gameBoardActions.squareClicked(this.square, selectedPiece, originalPosition);
        //} else {
        //    let selectedPiece = this._appStateActions.getSelectedPiece();
        //    //let originalPosition = this._appStateActions.getOriginalPosition();
        //    //this._gameBoardActions.squareClicked(this.square, selectedPiece, originalPosition);
        //}
        //let originalPosition = this._appStateActions.getOriginalPosition();
        //this._gameBoardActions.squareClicked(this.square, selectedPiece, originalPosition);
        this._gameBoardActions.squareClicked(this.square);
    }

}
