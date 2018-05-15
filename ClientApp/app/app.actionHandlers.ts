import { AppStartUpActions } from './actionHandlers/appStartUp.actions';
import { PieceActions } from './actionHandlers/pieceActions.actions';
import { GameBoardActions } from './actionHandlers/gameBoardActions.actions';
import { PlayerActions } from './actionHandlers/playerActions.actions';
import { AppStateActions } from './actionHandlers/appState.actions';



export const APP_ACTION_HANDLERS = [
    AppStartUpActions,
    AppStateActions,
    GameBoardActions,
    PieceActions,
    PlayerActions
];
