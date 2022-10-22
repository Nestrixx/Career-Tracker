import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fsPromises from "fs/promises";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/jobData", async (req: Request, res: Response) => {
  const dbPath = path.join(__dirname, "../", "db.txt");
  const data = await fsPromises.readFile(dbPath, "utf8");
  return res.json(JSON.parse(data));
});

app.post("/addJob", async (req: Request, res: Response) => {
  req.body.date = new Date();
  const dbPath = path.join(__dirname, "../", "db.txt");
  const oldDbText = await fsPromises.readFile(dbPath, "utf8");
  const newDbText = JSON.parse(oldDbText);
  newDbText.push(req.body);
  fsPromises.writeFile(dbPath, JSON.stringify(newDbText), "utf8");
  return res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
