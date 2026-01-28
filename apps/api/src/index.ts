import { buildServer } from "./server";

const server = buildServer();
const port = Number(process.env.PORT ?? 3001);

server.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`API listening on ${address}`);
});
