import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Helper } from '../../helpers/helper';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import * as fromappstate from '../../stores/appState.store';

@Component({
    selector: 'app-new-game-modal',
    templateUrl: './new-game-modal.component.html',
    styleUrls: ['./new-game-modal.component.css']
})
export class NewGameModalComponent implements OnInit {
  

    constructor(
        private _helper: Helper,
        private _appStateActions: AppStateActions,
           ) { }

    ngOnInit() {
        
    }

}
