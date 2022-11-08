import { Socket } from "net";
import { Player } from "../../libs";
import { Match } from "./match.class";
import net from "node:net";

export class Peer {
  port: any;
  connection: Socket[];

  constructor(port: any) {
    this.port = port;
    this.connection = [];

    const server = net.createServer((socket: any) =>
      this.onSocketConnected(socket)
    );

    server.listen(port, () =>
      console.log("Aguardando algum jogador se conectar...")
    );
  }

  connectTo(address: any) {
    if (address.split(":").length !== 2) {
      throw Error("O endereço do outro peer deve ser composto por host:port ");
    }

    const [host, port] = address.split(":");
    const socket: Socket = net.createConnection({ port, host }, () =>
      this.onSocketConnected(socket, Player.O)
    );
  }

  onSocketConnected(socket: Socket, playerO?: Player) {
    this.connection.push(socket);

    const match = new Match(this, playerO ?? undefined);

    socket.on("data", (data) => match.opponentMove(data, this));
  }

  onData(data: any) {
    this.connection.forEach((socket) => socket.write(data.toString()));
  }
}
