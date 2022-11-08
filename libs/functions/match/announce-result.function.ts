import {Result} from "../../types";


export const announceResult = (result: Result) => {
    const winner: Record<Result, string> = {
        [Result.X_WIN]: "X win!",
        [Result.O_WIN]: "O win!",
        [Result.TIE]: "Tie!.",
    };
    console.log(winner[result]);
}