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
  chosenMove: number;
  result: false | Result = false;

  constructor(peer: Peer, playerO?: Player) {
    this.currentBoard = initMatch();
    this.chosenMove = -1;
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
    if (play.toString() === "0") {
      console.log("Seu oponente saiu da partida.");
      process.exit();
    }

    this.currentBoard = move(this.currentBoard, this.currentPlayer, play);

    const result = this.finalCheck();

    if (result) {
      peer.connection.forEach((socket) => socket.end());
      process.exit();
    }

    console.clear();
    console.log(`Jogador atual: ${this.currentPlayer}`);
    printBoard(this.currentBoard);

    this.play(peer);
  }

  play(peer: Peer) {
    if (this.me === this.currentPlayer) {
      this.chosenMove = human(this.currentBoard);

      if (!this.chosenMove) {
        console.log("Saindo...");
        peer.sendMove(this.chosenMove);
        process.exit();
      }

      this.currentBoard = move(
        this.currentBoard,
        this.currentPlayer,
        this.chosenMove
      );

      peer.sendMove(this.chosenMove);

      const result = this.finalCheck();

      if (result) {
        process.exit();
      }

      console.clear();
      printBoard(this.currentBoard);
      console.log("Aguarde sua vez...");

      return;
    }

    console.log("Aguarde sua vez...");
  }

  private finalCheck() {
    this.result = finalResult(this.currentBoard);

    if (this.result) {
      console.clear();
      printBoard(this.currentBoard);
      announceResult(this.result);

      return this.result;
    }

    this.currentPlayer = togglePlayer(this.currentPlayer);
  }
}
