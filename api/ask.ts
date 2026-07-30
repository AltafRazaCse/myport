import { askMehdi } from "../ai/askMehdi.mjs";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const body = req.body || {};
  const result = await askMehdi(body.messages);
  res.status(result.status).json(result.ok ? { answer: result.answer } : { error: result.error });
}
