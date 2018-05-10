import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { pieces } from './stores/pieces.store';
import { squares } from './stores/gameBoard.store';
import { players } from './stores/players.store';
import { points } from './stores/point.store';
import { appState } from './stores/appState.store';

export const APP_STORES = {
    pieces,
    squares,
    points,
    players,
    appState
};
