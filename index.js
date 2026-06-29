const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

server.get("/", (_req, res) => {
  res.json({ message: "PawCare API is running" });
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(port, "0.0.0.0", () => {
  console.log(`PawCare API running on port ${port}`);
});
