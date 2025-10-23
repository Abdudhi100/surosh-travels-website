// src/server.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// === Initialize Supabase ===
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const app = new Hono();

// === Middleware ===
app.use("*", logger());
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// === Routes ===
app.get("/make-server-330fd21f/health", (c) => c.json({ status: "ok" }));

// Contact form
app.post("/make-server-330fd21f/contact", async (c) => {
  try {
    const { name, email, phone, service, message } = await c.req.json();
    if (!name || !email || !phone || !service || !message)
      return c.json({ error: "All fields are required" }, 400);

    const contactId = `contact:${Date.now()}`;
    const contactData = {
      id: contactId,
      name,
      email,
      phone,
      service,
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    };

    await kv.set(contactId, contactData);
    return c.json({ success: true, id: contactId });
  } catch (error) {
    console.error("Error submitting contact:", error);
    return c.json({ error: "Failed to submit form" }, 500);
  }
});

// === Example: Signup ===
app.post("/make-server-330fd21f/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    if (!email || !password || !name)
      return c.json({ error: "All fields required" }, 400);

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (error) return c.json({ error: error.message }, 400);
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

export default app;
