import {Board, Player} from "../../types";
import {SIZE_COLUM, SIZE_ROW} from "../../consts";
import {isBoardFull} from "../board";

export const checkTurn = (board: Board): Player => {
    let countX = 0;
    let countO = 0;

    for (let row = 0; row < SIZE_ROW; row++) {
        for (let column = 0; column < SIZE_COLUM; column++) {
            if (board[row][column] == "x") {
                countX++;
            }

            if (board[row][column] == "o") {
                countO++;
            }
        }
    }
    
    return countX > countO && !isBoardFull(board)? Player.O : Player.X;
}