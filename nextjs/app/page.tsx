// Server Component: the first quote is priced on the server for each request and arrives in the HTML, with no fetch
// from the browser. connection() keeps Next from prerendering it at build time into a frozen quote.
import { connection } from "next/server";
import { quoteUsdBrl } from "@/lib/quote_fx";
import QuoteBoard from "./quote_board";

export default async function Page() {
  await connection();
  const initialQuote = quoteUsdBrl();

  return (
    <main
      className="min-h-screen p-6
                 flex items-center justify-center
                 bg-slate-900">
      <section
        className="w-full max-w-2xl p-8
                   text-center bg-slate-800 border border-slate-700 rounded-lg">
        <h1 className="mb-6 text-xl font-semibold text-slate-100">Cotação do dólar para remessa</h1>
        <QuoteBoard initialQuote={initialQuote} />
      </section>
    </main>
  );
}
