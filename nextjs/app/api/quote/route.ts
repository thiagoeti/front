// Route Handler: the public quote endpoint the Client Component calls to refresh. A GET handler is not cached, so every
// call prices a new quote.
import { quoteUsdBrl } from "@/lib/quote_fx";

export function GET() {
  return Response.json(quoteUsdBrl(), { headers: { "cache-control": "no-store" } });
}
