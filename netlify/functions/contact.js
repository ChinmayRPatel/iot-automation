// Netlify Function: POST /api/contact
// Emails the contact form to RECEIVER_EMAIL using Gmail + App Password.
// Set GMAIL_USER, GMAIL_APP_PASSWORD and RECEIVER_EMAIL in
// Netlify → Site configuration → Environment variables.
const nodemailer = require("nodemailer");

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reply = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { ok: false, error: "Method not allowed" });

  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return reply(400, { ok: false, error: "Invalid request" });
  }

  const name = String(data.name || "").trim().slice(0, 100);
  const email = String(data.email || "").trim().slice(0, 150);
  const projectType = String(data.projectType || "").trim().slice(0, 60);
  const message = String(data.message || "").trim().slice(0, 2000);

  const errors = {};
  if (!name) errors.name = "Name is required";
  if (!isEmail(email)) errors.email = "A valid email is required";
  if (!message) errors.message = "Please describe your project";
  if (Object.keys(errors).length) return reply(400, { ok: false, errors });

  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  const to = process.env.RECEIVER_EMAIL || user;
  if (!user || !pass) return reply(500, { ok: false, error: "Email is not configured on the server yet." });

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType || "-"],
    ["Message", message],
    ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];

  try {
    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
    });
    await mailer.sendMail({
      from: `"IoT Automation Website" <${user}>`,
      to,
      replyTo: email,
      subject: `New enquiry from ${name} (${projectType || "General"})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2 style="font-family:Arial,sans-serif;color:#6d5dfc">New website enquiry</h2>
        <table cellpadding="8" style="font-family:Arial,sans-serif;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border:1px solid #ddd;font-weight:bold;background:#f6f6fb">${k}</td>` +
              `<td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
          )
          .join("")}</table>`,
    });
    return reply(201, { ok: true, message: `Thanks ${name}! Your message has been sent. We'll reply soon.` });
  } catch (err) {
    console.error("Email failed:", err.message);
    return reply(500, { ok: false, error: "Could not send your message right now. Please try again later." });
  }
};
