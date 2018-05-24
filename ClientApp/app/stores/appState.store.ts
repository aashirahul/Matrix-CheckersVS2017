import { Action, ActionReducer } from '@ngrx/store';
import * as Constants from '../constants/constants';
import { Position } from '../models/position';
import { Square } from '../models/square';

export interface State {
    'player.isMoving': boolean;
    'pieceSelected.Id': number;
    'showPlayerNameModal': boolean;
    'showNewGameModal': boolean;
    'player.nameBeingUpdated': string;
    'currentlyPlayingColor': string;
    'currentPlayerIndex': number;
    'squareSelected': Square | null;
 }

const initialAppState: State = {
    'player.isMoving': false,
    'pieceSelected.Id': NaN,
    'showPlayerNameModal': false,
    'player.nameBeingUpdated': "",
    'showNewGameModal': true,
    'currentlyPlayingColor': Constants.ColorForFirstPlayer,
    'currentPlayerIndex': 0,
    'squareSelected': null
    };

export const UPDATE_APP_STATE = 'UPDATE_APP_STATE';

export class UpdateAppStateAction implements Action {
    readonly type = UPDATE_APP_STATE;
    public payload: any;
}

export type Actions = UpdateAppStateAction;

// Reducer
export function appState(state: State = initialAppState, action: Actions): State {
    switch (action.type) {
        case UPDATE_APP_STATE:
            const newState: any = Object.assign({}, state);
            Object.keys(action.payload).map((prop) => {
                // only update known properties, to catch errors
                if (prop in state) {
                    const newValue = action.payload[prop];
                    newState[prop] = newValue;
                } else {
                    console.error(`invalid property [${prop}] passed into AppState-reducer`);
                }
            });
            return newState;


        default:
            return state;

    }
}