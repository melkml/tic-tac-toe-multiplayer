import {Player} from "../../types";

export const firstPlayer = (): Player => {
    return Math.random() < 0.5? Player.X : Player.O;
}