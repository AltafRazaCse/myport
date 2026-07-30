import { useEffect, useRef, useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { MdClose, MdArrowUpward } from "react-icons/md";
import "./styles/AskAI.css";
import ai from "../content/ai.json";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ai.suggestions;

const GREETING: Msg = {
  role: "assistant",
  content: ai.greeting,
};

const AskAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            data.error ||
            "Hmm, something went wrong. Try again or email altafraza84276@gmail.com.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the AI service. Please email altafraza84276@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`askai-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask AI about Altaf"
        data-cursor="disable"
      >
        <span className="askai-fab-icon">
          <HiSparkles />
        </span>
        <span className="askai-fab-label">{ai.fabLabel}</span>
      </button>

      <div className={`askai-panel ${open ? "is-open" : ""}`} role="dialog" aria-label="Ask AI about Altaf">
        <div className="askai-head">
          <div className="askai-head-title">
            <span className="askai-dot" />
            <div>
              <strong>{ai.title}</strong>
              <small>{ai.subtitle}</small>
            </div>
          </div>
          <button
            className="askai-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            data-cursor="disable"
          >
            <MdClose />
          </button>
        </div>

        <div className="askai-messages" ref={scrollRef} data-lenis-prevent>
          {messages.map((m, i) => (
            <div key={i} className={`askai-msg askai-msg-${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="askai-msg askai-msg-assistant askai-typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="askai-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                data-cursor="disable"
                className="askai-chip"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className="askai-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ai.placeholder}
            aria-label="Type your question"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            data-cursor="disable"
          >
            <MdArrowUpward />
          </button>
        </form>
      </div>
    </>
  );
};

export default AskAI;
