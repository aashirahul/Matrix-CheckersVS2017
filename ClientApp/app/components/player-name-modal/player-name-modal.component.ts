import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateActions } from '../../actionHandlers/appState.actions';

@Component({
    selector: 'app-player-name-modal',
    templateUrl: './player-name-modal.component.html',
    styleUrls: ['./player-name-modal.component.css']
})
export class PlayerNameModalComponent implements OnInit {
    public playerName: string;

    @Output()
    updatedPlayerName: EventEmitter<any> = new EventEmitter();

    constructor(
        private _appStateActions: AppStateActions,
    ) { }

    ngOnInit() {
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
