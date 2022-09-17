import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fsPromises from "fs/promises";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server(server is running)");
});

app.get("/jobData", async (req: Request, res: Response) => {
  const dbPath = path.join(__dirname, "../", "db.txt");
  const data = await fsPromises.readFile(dbPath, "utf8");
  res.json(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
