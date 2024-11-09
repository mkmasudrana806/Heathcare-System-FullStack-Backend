import { Server } from "http";
import app from "./app";
const port = 5000;

async function main() {
  // connect the server
  const server: Server = app.listen(port, () => {
    console.log("Server listening on port: ", port);
  });
}

main();
