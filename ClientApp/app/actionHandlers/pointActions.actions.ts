import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Point } from '../models/point';
import { DISPLAY_POINTS, ADD_POINTS } from '../stores/point.store';

@Injectable()
export class PointActions {
    private pieces: Array<Point>;

    constructor(
        private _store: Store<any>,
    ) { }

    public addPoint(currentPlayer: string): void {
        this._store.dispatch({
            type: ADD_POINTS,
            player: currentPlayer
        });
    }
}


