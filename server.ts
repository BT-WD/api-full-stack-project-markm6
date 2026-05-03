import express, { Request, Response } from "express";
import pkg from 'express';

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

type ProxyRequestBody = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
};

app.post(
  "/api/fetch",
  async (req: Request<{}, {}, ProxyRequestBody>, res: Response) => {
    try {
      const { url, method = "GET", headers, body } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      return res.status(response.status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Proxy request failed" });
    }
  }
);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});