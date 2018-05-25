import { Position } from './position';
import { Piece } from './game-piece';


export class Square {
    id: number;
    position: Position;
    color: string;
    isSelected: boolean;
    piece: Piece;
    validMove: boolean;
}
