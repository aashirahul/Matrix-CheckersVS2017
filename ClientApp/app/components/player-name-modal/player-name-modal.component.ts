import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import { PlayerActions } from '../../actionHandlers/playerActions.actions';
import * as fromappstate from '../../stores/appState.store';

@Component({
    selector: 'app-player-name-modal',
    templateUrl: './player-name-modal.component.html',
    styleUrls: ['./player-name-modal.component.css']
})
export class PlayerNameModalComponent implements OnInit {
    public playerName: string;
    public playerColorToBeEdited: string;
    private appStateSubscription: any;

    @Output()
    updatedPlayerName: EventEmitter<any> = new EventEmitter();

    constructor(
        private _store: Store<any>,
        private _appStateActions: AppStateActions,
        private _playerActions: PlayerActions
    ) { }

    ngOnInit() {
        this.appStateSubscription = this._store.select('appState').
            subscribe((as) => {
            this.playerColorToBeEdited = as[`player.nameBeingUpdated`];
        });
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
