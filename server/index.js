import "dotenv/config"; // loads settings from server/.env
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const MESSAGES_FILE = path.join(__dirname, "data", "messages.json");
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "100kb" }));

// ---------- Helpers ----------
async function readMessages() {
  try {
    return JSON.parse(await fs.readFile(MESSAGES_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function saveMessage(message) {
  const messages = await readMessages();
  messages.push(message);
  await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ---------- Email (Gmail + App Password) ----------
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || GMAIL_USER;

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  connectionTimeout: 15000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function sendEnquiryEmail(entry) {
  const rows = [
    ["Name", entry.name],
    ["Email", entry.email],
    ["Project type", entry.projectType || "-"],
    ["Message", entry.message],
    ["Received", new Date(entry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];

  await mailer.sendMail({
    from: `"IoT Automation Website" <${GMAIL_USER}>`,
    to: RECEIVER_EMAIL,
    replyTo: entry.email, // press "Reply" in Gmail to answer the visitor
    subject: `New enquiry from ${entry.name} (${entry.projectType || "General"})`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `
      <h2 style="font-family:Arial,sans-serif;color:#6d5dfc">New website enquiry</h2>
      <table cellpadding="8" style="font-family:Arial,sans-serif;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="border:1px solid #ddd;font-weight:bold;background:#f6f6fb">${k}</td>
              <td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`
          )
          .join("")}
      </table>`,
  });
}

// ---------- API routes ----------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Contact / project enquiry form
app.post("/api/contact", async (req, res) => {
  const { name = "", email = "", projectType = "", message = "" } = req.body || {};

  const errors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!isEmail(email.trim())) errors.email = "A valid email is required";
  if (!message.trim()) errors.message = "Please describe your project";

  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors });
  }

  const entry = {
    id: Date.now().toString(36),
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 150),
    projectType: projectType.trim().slice(0, 60),
    message: message.trim().slice(0, 2000),
    createdAt: new Date().toISOString(),
  };

  // Keep a local copy (best effort)
  saveMessage(entry).catch((err) => console.error("Could not save message:", err.message));

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("❌ GMAIL_USER / GMAIL_APP_PASSWORD missing in server/.env");
    return res.status(500).json({ ok: false, error: "Email is not configured on the server yet." });
  }

  try {
    await sendEnquiryEmail(entry);
    console.log(`📩 Enquiry from ${entry.name} <${entry.email}> emailed to ${RECEIVER_EMAIL}`);
    res.status(201).json({ ok: true, message: `Thanks ${entry.name}! Your message has been sent. We'll reply soon.` });
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    res.status(500).json({ ok: false, error: "Could not send your message right now. Please try again later." });
  }
});

// ---------- Serve React build in production ----------
app.use(express.static(CLIENT_DIST));
app.get("*", async (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  try {
    await fs.access(path.join(CLIENT_DIST, "index.html"));
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  } catch {
    res.status(404).send("Frontend not built yet. Run: npm run build");
  }
});

app.listen(PORT, () => {
  console.log(`✅ IoT Automation server running on http://localhost:${PORT}`);
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn("⚠️  Email not configured: copy server/.env.example to server/.env and fill it in.");
  } else {
    mailer
      .verify()
      .then(() => console.log(`📧 Gmail connected as ${GMAIL_USER}; enquiries go to ${RECEIVER_EMAIL}`))
      .catch((err) => console.error("❌ Gmail login failed:", err.message));
  }
});
