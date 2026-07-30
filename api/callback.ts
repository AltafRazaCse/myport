import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = req.query.code as string | undefined;

  if (!clientId || !clientSecret) {
    return html(res, renderScript("error", { error: "OAuth env vars missing." }));
  }
  if (!code) {
    return html(res, renderScript("error", { error: "Missing ?code from GitHub." }));
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      return html(res, renderScript("success", { token: data.access_token, provider: "github" }));
    }
    return html(res, renderScript("error", { error: data.error || "No access token returned." }));
  } catch (err) {
    return html(res, renderScript("error", { error: String(err) }));
  }
}

function html(res: VercelResponse, body: string) {
  res.status(200).setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "no-store");
  res.send(body);
}

function renderScript(status: string, content: Record<string, unknown>) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  return `<!doctype html><html><head><meta charset="utf-8" /></head><body><script>(function(){function receiveMessage(e){window.opener.postMessage(${JSON.stringify(message)}, e.origin);window.removeEventListener("message",receiveMessage,false);}window.addEventListener("message",receiveMessage,false);window.opener.postMessage("authorizing:github","*");})();</script><p>Completing sign-in… you can close this window.</p></body></html>`;
}
