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
  // something must go here but what
  console.log(req.body);
  res.send("got a POST request");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
