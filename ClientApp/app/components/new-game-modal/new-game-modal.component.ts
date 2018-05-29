import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Helper } from '../../helpers/helper';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { AppStartUpActions } from '../../actionHandlers/appStartUp.actions';
import * as fromappstate from '../../stores/appState.store';

@Component({
    selector: 'app-new-game-modal',
    templateUrl: './new-game-modal.component.html',
    styleUrls: ['./new-game-modal.component.css']
})
export class NewGameModalComponent implements OnInit {

    public appStateSubscription: any;
    public displayText: any


    constructor(
        private _store: Store<any>,
        private _helper: Helper,
        private _appStartUpActions: AppStartUpActions,
        private _appStateActions: AppStateActions,
    ) { }

    ngOnInit() {
        this.appStateSubscription = this._store.select('appState').
            subscribe((appState) => {
                this.displayText = appState[`textForNewGameModal`];
            });
    }

    public startNewGame(): void {
        this._appStateActions.updateState({ 'showNewGameModal': false });
        //this._appStartUpActions.initializeGame();
        this._appStateActions.initializeSquares();
    }


}
