import { Position } from './position';

export class Piece {
    id: number;
    row: number;
    col: number;
    color: string;
    isKing: boolean;
    position: Position;
}
