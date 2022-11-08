import {Board, Square} from "../../types";

export const initMatch = (): Board => {
    const board: Board = [] ;

    for (let time = 0; time < 3; time++) {
        board.push([Square.EMPTY, Square.EMPTY, Square.EMPTY]);
    }

    return board;
}