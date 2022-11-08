import {
    announceResult,
    Board,
    finalResult,
    firstPlayer,
    human,
    initMatch,
    move,
    Player,
    printBoard,
    Result,
    togglePlayer
} from "../libs";

let currentPlayer: Player = firstPlayer();
let chosenMove: number[] | number | null;
let result: false | Result = false;

let currentBoard: Board = initMatch();

console.log("JOGO DA VELHA\n\n");

while (!result) {
        console.log(`Jogador atual: ${currentPlayer}`);
        printBoard(currentBoard);
        chosenMove = human(currentBoard);

        if (chosenMove) {
            currentBoard = move(currentBoard, currentPlayer, chosenMove);
        } else {
            console.log("Posição está ocupada.");
            continue;
        }

    result = finalResult(currentBoard);

    currentPlayer = togglePlayer(currentPlayer);
}

if (result !== Result.TIE) {
    printBoard(currentBoard);
}

announceResult(result);