import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { Toaster } from "@/components/ui/sonner.tsx";
import Router from "@/router";

const queryClient = new QueryClient();

export const BASE_URL =
  process.env.NODE_ENV === "development" ? "/" : "/gw-assignment";

async function enableMocking() {
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  const { worker } = await import("./mock");
  const serviceWorkerUrl =
    BASE_URL + BASE_URL.endsWith("/")
      ? "mockServiceWorker.js"
      : "/mockServiceWorker.js";

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: serviceWorkerUrl,
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
});
