import { askAi } from "../../ai/askAi.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON body." }),
    };
  }

  const result = await askAi(body.messages);

  return {
    statusCode: result.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      result.ok ? { answer: result.answer } : { error: result.error }
    ),
  };
}
