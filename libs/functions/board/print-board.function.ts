import { Board, Square } from "../../index";
import { SIZE_COLUM, SIZE_ROW } from "../../consts";

export const printBoard = (board: Board) => {
  const positions: Square[] = [];

  for (let row = 0; row < SIZE_ROW; row++) {
    for (let column = 0; column < SIZE_COLUM; column++) {
      positions.push(board[row][column]);
    }
  }

  console.log(`     |     |     `);
  console.log(`  ${positions[0]}  |  ${positions[1]}  |  ${positions[2]}  `);
  console.log(`_____|_____|_____`);
  console.log(`     |     |     `);
  console.log(`  ${positions[3]}  |  ${positions[4]}  |  ${positions[5]}  `);
  console.log(`_____|_____|_____`);
  console.log(`     |     |     `);
  console.log(`  ${positions[6]}  |  ${positions[7]}  |  ${positions[8]}  `);
  console.log(`     |     |     `);
};
