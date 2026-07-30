import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { askMehdi } from "./ai/askMehdi.mjs";

// Local dev proxy so the AI widget works under `npm run dev` without exposing
// the API key to the browser. In production the same /api/ask path is handled
// by the Netlify function (see netlify.toml).
function askAiDevPlugin(): Plugin {
  return {
    name: "ask-ai-dev",
    configureServer(server) {
      server.middlewares.use("/api/ask", (req, res, next) => {
        if (req.method !== "POST") return next();
        let raw = "";
        req.on("data", (chunk: Buffer) => (raw += chunk));
        req.on("end", async () => {
          let body: { messages?: unknown } = {};
          try {
            body = JSON.parse(raw || "{}");
          } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ error: "Invalid JSON body." }));
          }
          const result = await askMehdi(
            (body as { messages?: unknown }).messages
          );
          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify(
              result.ok ? { answer: result.answer } : { error: result.error }
            )
          );
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env vars (no prefix) into process.env so the dev handler can read
  // GROQ_API_KEY. Guard each assignment — setting process.env.X = undefined
  // coerces to the string "undefined" (which is truthy) and breaks the guard.
  const env = loadEnv(mode, process.cwd(), "");
  if (!process.env.GROQ_API_KEY && env.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = env.GROQ_API_KEY;
  }
  if (!process.env.GROQ_MODEL && env.GROQ_MODEL) {
    process.env.GROQ_MODEL = env.GROQ_MODEL;
  }

  return {
    plugins: [react(), askAiDevPlugin()],
  };
});
