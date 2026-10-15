// Entry: one shadcn Button confirming a PIX transfer.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="p-6 bg-background text-foreground">
      <Button>Confirmar PIX de R$ 1.250,00</Button>
    </main>
  </StrictMode>,
);
