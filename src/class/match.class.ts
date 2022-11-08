import {
  announceResult,
  Board,
  finalResult,
  human,
  initMatch,
  move,
  Player,
  printBoard,
  Result,
  togglePlayer,
} from "../../libs";
import { Peer } from "./peer.class";

export class Match {
  me: Player;
  currentBoard: Board;
  currentPlayer: Player;
  chosenMove: number[] | number | null = null;
  result: false | Result = false;

  constructor(peer: Peer, playerO?: Player) {
    this.currentBoard = initMatch();

    this.currentPlayer = Player.X;
    this.me = playerO ?? Player.X;

    console.clear();
    console.log("JOGO DA VELHA\n");
    console.log("Você é o jogador", this.me);
    console.log(`Jogador atual: ${this.currentPlayer}`);
    printBoard(this.currentBoard);

    this.play(peer);
  }

  opponentMove(play: any, peer: Peer) {
    this.currentBoard = move(this.currentBoard, this.currentPlayer, play);

    const result = this.finalCheck();

    if (!result) {
      console.log(`Jogador atual: ${this.currentPlayer}`);
      printBoard(this.currentBoard);

      this.play(peer);
    } else {
      printBoard(this.currentBoard);
    }
  }

  play(peer: Peer) {
    if (this.me === this.currentPlayer) {
      this.chosenMove = human(this.currentBoard);

      if (this.chosenMove) {
        this.currentBoard = move(
          this.currentBoard,
          this.currentPlayer,
          this.chosenMove
        );

        peer.onData(this.chosenMove);
      }

      const result = this.finalCheck();

      if (!result) {
        printBoard(this.currentBoard);
      }

      return;
    }
  }

  private finalCheck() {
    this.result = finalResult(this.currentBoard);

    if (this.result) {
      printBoard(this.currentBoard);
      announceResult(this.result);

      return this.result;
    } else {
      this.currentPlayer = togglePlayer(this.currentPlayer);
    }
  }
}
