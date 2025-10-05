import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_URL =
  "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base";

app.post("/analyze", async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to analyze text" });
  }
});

let trueCount = 0;
let falseCount = 0;

app.post("/feedback", (req: Request, res: Response) => {
  const { correct } = req.body;

  if (typeof correct !== "boolean") {
    return res.status(400).json({ error: "correct must be true or false" });
  }

  if (correct) {
    trueCount++;
  } else {
    falseCount++;
  }

  res.json({
    message: "Feedback received",
    accuracy:
      trueCount + falseCount > 0
        ? Math.round((trueCount / (trueCount + falseCount)) * 100)
        : 100,
  });
});

app.get("/accuracy", (req: Request, res: Response) => {
  res.json({
    accuracy:
      trueCount + falseCount > 0
        ? Math.round((trueCount / (trueCount + falseCount)) * 100)
        : 100,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
