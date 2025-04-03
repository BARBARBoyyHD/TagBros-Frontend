import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-react";
import { ClerkPubKey } from "./config/ClerkPubKey";
import App from "./App";
import "./index.css";

const PUBLISHABLE_KEY = ClerkPubKey;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <App />
      </ClerkLoaded>
    </ClerkProvider>
  </React.StrictMode>
);
