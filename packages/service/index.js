import express, { json, urlencoded } from "express";
import cors from "cors";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/sqlite-client/client.ts";

const adapter = new PrismaBetterSqlite3({ url: "file:./database/dev.db" });

console.log({ adapter });

const prisma = new PrismaClient({ adapter });

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/add", async (req, res) => {
  const data = await prisma.user.create({
    data: {
      nickname: `用户${new Array(8).fill("").map(() => Math.floor(Math.random() * 10))}`,
      phoneNumber: "166****8888",
      balance: 100,
      email: "******@gmail.com",
    },
  });

  console.log({ data });
});

app.listen(3000, () => {
  console.log(`Server started on port 3000!`);
});
