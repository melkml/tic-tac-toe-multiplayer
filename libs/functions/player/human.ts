import {Board, write} from "../../index";
import {generatePossibleMoves} from "./generate-possible-moves.function";

export const human = (estadoAtual: Board): number => {
    let move: string | null = null;
    let moveInNumber: number = -1;

    while (!move) {
        console.log("Digite a posição desejada ou 's' para sair: ");
        move = write();

        if(move === 's') {
            console.log("Saindo...");
            process.exit();
        }

        if(!move) continue;

        moveInNumber = parseInt(move);
        const canMove = [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(moveInNumber);

        if (!canMove) {
            console.log("Posição inválida");
            move = null;
        }
    }

    const freePositions = generatePossibleMoves(estadoAtual);

    const convertPosition: Record<number, number[]> = {
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

    const [reqRow, reqColumn] = convertPosition[moveInNumber];

    for (const position of freePositions) {
        const [freeRow, freeColumn] = position as number[];
        if (reqRow === freeRow && reqColumn === freeColumn) {
            return moveInNumber;
        }
    }

    return -1;
}
