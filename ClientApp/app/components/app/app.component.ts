import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStartUpActions } from '../../actionHandlers/appStartUp.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as fromappstate from '../../stores/appState.store';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public showNewGameModal: boolean;
    public appStateSubscription: any;

    constructor(
        private _store: Store<any>,
        private _appStartUpActions: AppStartUpActions,
        private _appStateActions: AppStateActions

    ) { }

    public ngOnInit() {
        this.appStateSubscription = this._store.select('appState').
            subscribe((appState) => {
                this.showNewGameModal = appState[`showNewGameModal`];
            });

        this._appStartUpActions.initializeGame();
        this._appStartUpActions.initializePlayers();
    }

    public ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
    }
}
