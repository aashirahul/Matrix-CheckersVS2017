import { Position } from './position';


export class Square {
    id: number;
    position: Position;
    isSelected: boolean;
    hasPiece: boolean;
    validMove: boolean;
}
