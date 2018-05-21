import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../models/game-piece';
import { Store } from '@ngrx/store';
import { Square } from '../../models/gameBoard';
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

  constructor(
      private _store: Store<any>,
      private _pieceActions: PieceActions,
      private _gameBoardActions: GameBoardActions,
      private _appStateActions: AppStateActions
  ) { }

  public ngOnInit() {
  
  }

    public clickHandler() {
        //TODO: check if piece belongs to current player
        if (this.piece) {
            let selectedPiece = this._pieceActions.pieceClicked(this.piece);
            this._gameBoardActions.squareClicked(this.square, selectedPiece);
        } else {
            let selectedPiece = this._appStateActions.getSelectedPiece();
            this._gameBoardActions.squareClicked(this.square, selectedPiece);
        }
    }

}
