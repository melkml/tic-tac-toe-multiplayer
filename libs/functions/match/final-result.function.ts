import {Board, Result} from "../../types";
import {isBoardFull} from "../board";
import {SIZE_COLUM, SIZE_ROW} from "../../consts";

export const finalResult = (board: Board): false | Result => {

    let result: false | Result;

    result = checkHorizontal(board);
    result = result ? result : checkVertical(board);
    result = result ? result : checkDiagonal(board);

    // Condição de empate
    if (isBoardFull(board) && !result) {
        return Result.TIE;
    }

    return result ?? false;
}

const checkHorizontal = (board: Board): false | Result => {

    for (let row = 0; row < SIZE_ROW; row++) {
        let hasThreeX = 0;
        let hasThreeO = 0;

        for (let coluna = 0; coluna < 3; coluna++) {
            if (board[row][coluna] === "x") {
                hasThreeX++;
            }

            if (board[row][coluna] === "o") {
                hasThreeO++;
            }

            if (hasThreeX === 3) {
                return Result.X_WIN;
            }

            if (hasThreeO === 3) {
                return Result.O_WIN;;
            }
        }
    }

    return false;
}

const checkVertical = (board: Board): false | Result => {
    for (let column = 0; column < SIZE_COLUM; column++) {
        let hasThreeX = 0;
        let hasThreeO = 0;

        for (let linha = 0; linha < 3; linha++) {
            if (board[linha][column] == "x") {
                hasThreeX++;
            } else if (board[linha][column] == "o") {
                hasThreeO++;
            }
        }

        if (hasThreeX === 3) {
            return Result.X_WIN;
        }

        if (hasThreeO === 3) {
            return Result.O_WIN;
        }
    }

    return false;
}

const checkDiagonal = (board: Board): false | Result => {
    let hasThreeO = 0;
    let hasThreeX = 0;

    //Diagonal esquerda
    for (let linha_coluna = 0; linha_coluna < 3; linha_coluna++) {
        if (board[linha_coluna][linha_coluna] === "x") {
            hasThreeX++;
        } else if (board[linha_coluna][linha_coluna] === "o") {
            hasThreeO++;
        }
    }

    if (hasThreeX === 3) {
        return Result.X_WIN;
    }

    if (hasThreeO === 3) {
        return Result.O_WIN;
    }

    //Diagonal direita
    hasThreeO = 0;
    hasThreeX = 0;
    let coluna = 2;
    for (let linha = 0; linha < 3; linha++) {
        if (board[linha][coluna] === "x") {
            hasThreeX++;
        } else if (board[linha][coluna] === "o") {
            hasThreeO++;
        }

        coluna--;
    }

    if (hasThreeX === 3) {
        return Result.X_WIN;
    }

    if (hasThreeO === 3) {
        return Result.O_WIN;
    }

    return false;
}