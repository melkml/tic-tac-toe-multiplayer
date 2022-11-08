import {Board, Square} from "../../types";
import {Player} from "../../types";
import {SIZE_COLUM, SIZE_ROW} from "../../consts";
import {clone} from "./move.function";

export const generatePossibleMoves = (
    board: Board,
    currentPlayer?: Player
): Board[] | number[][] => {
    const freePositions: number[][] = [];
    const boardsPossible: Board[] = [];

    //Verificando posições livres no nó
    for (let row = 0; row < SIZE_ROW; row++) {
        for (let column = 0; column < SIZE_COLUM; column++) {
            if (board[row][column] === Square.EMPTY) {
                freePositions.push([row, column]);
            }
        }
    }

    if (currentPlayer) {
        for (const posicao of freePositions) {
            const [linha, coluna] = posicao;
            let boardGenerate = clone(board);

            boardGenerate[linha][coluna] = currentPlayer === Player.O? Square.O : Square.X;
            boardsPossible.push(boardGenerate);
        }

        return boardsPossible;
    }

    return freePositions;
}