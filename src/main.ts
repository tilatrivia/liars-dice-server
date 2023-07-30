import { Server } from "../node_modules/socket.io/dist/index";
import ClientToServerEvents from "./server/client-to-server-events";
import ServerToClientEvents from "./server/server-to-client-events";
import InterServerEvents from "./server/inter-server-events";
import SocketData from "./server/socket-data";
import onHello from "./socket/on-hello";

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>();

io.on("connection", (socket) => {
    socket.emit("noArg");
    socket.emit("basicEmit", 1, "2", Buffer.from([3]));
    socket.emit("withAck", "4", (e) => {
        // e is inferred as number
    });

    socket.on("hello", onHello);
});

console.log("Socket.io listening on Port 8080...");
io.listen(8080);