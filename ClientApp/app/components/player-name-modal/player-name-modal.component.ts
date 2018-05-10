import { Component, OnInit, Input } from '@angular/core';
import { AppStateActions } from '../../actionHandlers/appState.actions';

@Component({
  selector: 'app-player-name-modal',
  templateUrl: './player-name-modal.component.html',
  styleUrls: ['./player-name-modal.component.css']
})
export class PlayerNameModalComponent implements OnInit {

  
 

  constructor(
    private _appStateActions: AppStateActions,
  
  ) { }

  ngOnInit() {
   
  }


  close() {
    this._appStateActions.updateState({ 'showAlbumModal': false });
  }



}
