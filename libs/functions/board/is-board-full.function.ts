import {Board} from "../../types";
import {SIZE_COLUM, SIZE_ROW} from "../../consts";

export const isBoardFull = (board: Board): boolean => {
    let hasNine = 0;

    for (let row = 0; row < SIZE_ROW; row++) {
        for (let column = 0; column < SIZE_COLUM; column++) {
            if (board[row][column] != " ") {
                hasNine++;
            }
        }
    }

    return hasNine == 9;
}