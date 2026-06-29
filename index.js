import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const packagePath = require.resolve("json-server/package.json");
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const binEntry =
  typeof packageJson.bin === "string"
    ? packageJson.bin
    : packageJson.bin?.["json-server"];

if (!binEntry) {
  throw new Error("Unable to find json-server executable.");
}

const port = process.env.PORT || "3000";
const binPath = join(dirname(packagePath), binEntry);

const server = spawn(
  process.execPath,
  [binPath, "db.json", "--host", "0.0.0.0", "--port", port],
  {
    stdio: "inherit",
  },
);

server.on("exit", (code) => {
  process.exit(code ?? 0);
});
