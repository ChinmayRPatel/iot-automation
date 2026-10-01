# IoT Automation — AI + IoT Solutions Website

A simple, modern website for an AI + IoT company that builds hardware + software solutions for businesses and personal projects.

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express (contact form API)

## Project structure

```
iot-automation/
├── package.json          # Root scripts (run both apps together)
├── client/               # React frontend
│   ├── index.html
│   ├── vite.config.js    # Forwards /api to the Node server in development
│   ├── public/favicon.svg
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css     # All styles (colors at the top in :root)
│       ├── data/content.js   # ALL website text — edit here
│       ├── hooks/useReveal.js
│       └── components/
│           ├── Navbar.jsx  Hero.jsx  Services.jsx  HowItWorks.jsx
│           ├── Solutions.jsx  TechStack.jsx  CtaBanner.jsx
│           ├── Faq.jsx  Contact.jsx  Footer.jsx
│           └── Logo.jsx  SectionHead.jsx
└── server/               # Node.js backend
    ├── index.js          # Express API + serves the React build
    ├── .env.example
    └── data/             # Contact messages are saved here (messages.json)
```

## Requirements

- [Node.js](https://nodejs.org) 18 or newer

## Email setup (contact form → Gmail)

The contact form is emailed by the Node.js server using Gmail + an App Password.

1. Turn on 2-Step Verification for the Gmail account that will send the emails.
2. Create an App Password at https://myaccount.google.com/apppasswords
3. Copy `server/.env.example` to `server/.env` and fill in:
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   RECEIVER_EMAIL=contact.iot.automation@gmail.com
   ```
4. Restart the server. You should see `📧 Gmail connected as ...`.

`server/.env` is in `.gitignore` — never upload it to GitHub.

## Run in development

```bash
npm run install:all   # installs root, server and client packages
npm run dev           # starts server (port 5000) + React (port 5173)
```

Open **http://localhost:5173**.

## Run in production

```bash
npm run build   # builds React into client/dist
npm start       # Node serves the website + API on http://localhost:5000
```

## API

| Method | Route          | Description                                  |
|--------|----------------|----------------------------------------------|
| GET    | `/api/health`  | Check the server is running                  |
| POST   | `/api/contact` | Email a project enquiry (`name`, `email`, `projectType`, `message`) |

Messages are saved to `server/data/messages.json` (this file is ignored by git).

## Customize

- **Text & company name:** `client/src/data/content.js`
- **Colors:** variables at the top of `client/src/index.css`
- **Logo:** `client/public/favicon.svg`

## Deploy free on Netlify

`netlify.toml` is ready. The React site is served as static files and the contact form
runs as a Netlify Function (`netlify/functions/contact.js`).

1. Push the project to GitHub (without `server/.env`).
2. netlify.com → **Add new project → Import an existing project → GitHub** → pick the repo.
3. **Site configuration → Environment variables**: add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `RECEIVER_EMAIL`.
4. **Deploys → Trigger deploy**.
5. **Domain management → Add a domain** → `iot-automation.co.in`, then set the nameservers shown by Netlify at your domain registrar.

## SEO

- Title, description, Open Graph, local (Ahmedabad) and JSON-LD business data: `client/index.html`
- `client/public/robots.txt`, `sitemap.xml`, `og-image.png`, `site.webmanifest`
- After going live, submit `https://iot-automation.co.in/sitemap.xml` in Google Search Console.

## Deploy (other hosts)

Deploy it as one Node.js app on [Render](https://render.com) or [Railway](https://railway.app):

- **Build command:** `npm run install:all && npm run build`
- **Start command:** `npm start`

## License

MIT
"# iot-automation" 
