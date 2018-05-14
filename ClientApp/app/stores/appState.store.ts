import { Action, ActionReducer } from '@ngrx/store';
import * as Constants from '../constants/constants';

export interface State {
    'player.isMoving': boolean;
    'pieceSelected.Id': number;
    'showPlayerNameModal': boolean;
    'player.nameBeingUpdated': string;
}

const initialAppState: State = {
    'player.isMoving': false,
    'pieceSelected.Id': NaN,
    'showPlayerNameModal': false,
    'player.nameBeingUpdated': ""
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