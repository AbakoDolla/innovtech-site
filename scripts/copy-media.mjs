import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "media");
const destination = path.join(root, "client", "public", "media");

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true, force: true });
console.log("Local media copied to client/public/media");
