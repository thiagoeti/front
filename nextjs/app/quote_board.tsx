// Client Component: the only code that becomes JavaScript in the browser. It starts with the quote the server rendered
// and replaces it through the Route Handler on click, without reloading the page.
"use client";

import { useState } from "react";
import { rateFormat, type QuoteFx } from "@/lib/quote_fx";

export default function QuoteBoard({ initialQuote }: { initialQuote: QuoteFx }) {
  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function quoteRefresh() {
    setLoading(true);
    try {
      const response = await fetch("/api/quote", { cache: "no-store" });
      if (!response.ok) throw new Error(`quote answered ${response.status}`);
      setQuote((await response.json()) as QuoteFx);
      setFailed(false);
    } catch {
      // The last good quote stays on screen, flagged — a remittance is never priced with a blank rate.
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <p
        data-testid="quote"
        className="p-5
                   font-mono text-sm leading-relaxed text-left text-green-300 bg-slate-950 border-l-4 border-blue-400 rounded-sm">
        USD 1,00 = {rateFormat(quote.rate)}
      </p>
      <p data-testid="quoted-at" className="mt-3 font-mono text-xs text-slate-400">
        cotado em <time dateTime={quote.quotedAt}>{quote.quotedAt}</time>
      </p>
      {failed && (
        <p role="alert" className="mt-3 text-sm text-amber-300">
          Cotação indisponível: mostrando a última válida.
        </p>
      )}
      <button
        type="button"
        onClick={quoteRefresh}
        disabled={loading}
        className="mt-6 px-6 py-2
                   text-sm text-slate-100 bg-slate-700 border border-slate-600 rounded-sm
                   transition-colors
                   hover:bg-slate-600 hover:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
        {loading ? "Cotando..." : "Atualizar cotação"}
      </button>
    </>
  );
}
