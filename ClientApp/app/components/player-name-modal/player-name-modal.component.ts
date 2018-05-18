import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Helper } from '../../helpers/helper';
import { PlayerHelper } from '../../helpers/playerHelper';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as fromappstate from '../../stores/appState.store';

@Component({
    selector: 'app-player-name-modal',
    templateUrl: './player-name-modal.component.html',
    styleUrls: ['./player-name-modal.component.css']
})
export class PlayerNameModalComponent implements OnInit {
    public playerName: string;
    public playerColorToBeEdited: string;
  
    @Output()
    updatedPlayerName: EventEmitter<any> = new EventEmitter();

    constructor(
        private _helper: Helper,
        private _appStateActions: AppStateActions,
        private _playerHelper: PlayerHelper,
           ) { }

    ngOnInit() {
        this.playerColorToBeEdited = this._playerHelper.getPlayerNameBeingUpdated();
    }

    private addPlayerName(name: any): void {
        this.updatedPlayerName.emit(name);
        this._appStateActions.updateState({ 'showPlayerNameModal': false });
    }

    private close(): void {
        this._appStateActions.updateState({ 'showPlayerNameModal': false });
    }

    private deleteName(): void {
        this.playerName = "";
    }
}
