import {Player} from "../../types";

export const togglePlayer = (currentPlayer: Player) => {
    return currentPlayer === Player.X ? Player.O : Player.X;
}