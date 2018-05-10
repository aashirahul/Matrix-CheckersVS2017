import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Player } from '../models/player';
import { GET_PLAYERS } from '../stores/players.store';

@Injectable()
export class PointActions {
    private pieces: Array<Player >;

    constructor(
        private _store: Store<any>,
    ) { }

   

    }

  
