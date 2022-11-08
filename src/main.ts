import { Peer } from "./class";

require("dotenv").config();

if (!process.env.PORT) {
  throw Error("Variável de ambiente PORT não informada");
}
const port = process.env.PORT;

const peer = new Peer(port);

process.argv
  .slice(2)
  .forEach((anotherPeerAddress) => peer.connectTo(anotherPeerAddress));
