import {Board, Square} from "../../types";
import {Player} from "../../types";
import {SIZE_COLUM, SIZE_ROW} from "../../consts";

export const clone = (board: Board) => {
    let clone: Board = [[]];

    for (let i = 0; i < board.length; i++) {
        clone[i] = board[i].slice(0)
    }

    return clone;
}

export const move = (
    board: Board,
    currentPlayer: Player,
    position: number,
) => {
    let nextBoard: Board = clone(board);

    const convercaoPosicao: Record<number, number[]> = {
        1: [0, 0],
        2: [0, 1],
        3: [0, 2],
        4: [1, 0],
        5: [1, 1],
        6: [1, 2],
        7: [2, 0],
        8: [2, 1],
        9: [2, 2],
    };

    const [proxLinha, proxColuna] = convercaoPosicao[position];

    for (let row = 0; row < SIZE_ROW; row++) {
        for (let column = 0; column < SIZE_COLUM; column++) {
            if (proxLinha === row && proxColuna === column) {
                nextBoard[row][column] = currentPlayer === Player.O? Square.O : Square.X;
            }
        }
    }

    return nextBoard;
}