import "dotenv/config";
import express from "express";
import cors from "cors";
import contentRoutes from "./routes/contentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { connectDb } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDb();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/content", contentRoutes);
app.use("/api", contactRoutes);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
