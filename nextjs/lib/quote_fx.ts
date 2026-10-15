// The quote a remittance is priced with: the mid rate plus the bank's spread, stamped with the moment it was taken. It
// changes on every call, which is exactly why the page cannot be a build-time snapshot.
export type QuoteFx = { rate: number; quotedAt: string };

const MID_RATE = 5.42;
const SPREAD = 0.015;

export function quoteUsdBrl(now = new Date()): QuoteFx {
  const variation = (Math.random() - 0.5) * 0.08;
  const rate = (MID_RATE + variation) * (1 + SPREAD);
  return { rate: Math.round(rate * 10_000) / 10_000, quotedAt: now.toISOString() };
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 4 });
export const rateFormat = (rate: number) => brl.format(rate);
