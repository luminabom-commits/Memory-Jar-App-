# 🫙 Memory Jars — App Documentation

**Created by:** @luminabom  
**Portfolio:** [instagram.com/luminabom.portfolio](https://instagram.com/luminabom.portfolio)  
**Version:** 2.0.0

---

## Overview

Memory Jars is a multi-file web application for preserving photos, notes and stories inside beautifully designed virtual jars. It runs entirely in the browser — no server or internet connection required after the initial font load.

---

## File Structure

```
memoryjars/
├── index.html       ← Main app shell & UI
├── styles.css       ← All responsive styles (iPad / Tablet / Desktop)
├── app.js           ← State, i18n, shared constants (ES module)
├── auth.js          ← User registration, login, PIN hashing (ES module)
├── db.js            ← IndexedDB database layer (ES module)
├── schema.json      ← Data schema documentation
└── README.md        ← This file
```

---

## How to Run

### Option A — Direct (simplest)
1. Put all files in the **same folder**.
2. Open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge).
3. That's it. No build step, no npm, no server.

> **Note:** Because the app uses ES modules (`type="module"`), you **cannot** open `index.html` via `file://` in some browsers due to CORS restrictions. Use Option B if that happens.

### Option B — Local development server (recommended)
```bash
# Python (built into macOS/Linux)
cd memoryjars
python3 -m http.server 8080
# Then open: http://localhost:8080

# Node.js
npx serve memoryjars
# or
npx http-server memoryjars
```

### Option C — VS Code
Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.

---

## User Accounts & PIN System

### Guest Access
- Anyone can browse the **12 Showcase jars** without an account.
- Guests cannot add, edit, or delete jars.

### Creating an Account
1. Click **Create Account** in the header or sidebar.
2. Choose a **username** (2–32 characters; letters, numbers, `_`, `.`, or Thai characters).
3. Enter a **6-digit PIN** (numbers only, e.g. `123456`).
4. Confirm the PIN and submit.

### Security Notes
- PINs are **never stored in plain text** — they are hashed using SHA-256 via the Web Crypto API before storage.
- Sessions last **24 hours** and are stored in IndexedDB. Logging out clears the session immediately.
- All data is stored locally in your browser's IndexedDB — it never leaves your device.

---

## Data Storage

| Store | Contents |
|-------|----------|
| `users` | Registered accounts (username, PIN hash, avatar colour, settings) |
| `categories` | Shelf categories (per user + global showcase) |
| `jars` | Jar containers (name, colour, icon, note, creator tags, etc.) |
| `memories` | Individual notes and photos inside jars |
| `sessions` | Active login session (expires after 24 hours) |

Data is stored in **IndexedDB** (`MemoryJarsDB`, version 2). This is persistent storage — it survives page refreshes and browser restarts, unless the user clears their browser data.

### Schema Reference
See `schema.json` for the full documented data schema.

---

## Features

### For Guests
- Browse all 12 showcase jars across 7 categories
- Read memories inside each jar
- Full lightbox for photos
- 5-language support (EN, ไทย, 中文, 日本語, 한국어)
- Search across jars and memories

### For Registered Users (everything above, plus)
- **Create unlimited jars** with custom colours, icons, names, hover notes and creator tags
- **Add memories** — notes (with mood, date, tags) and photos (multiple upload, with caption)
- **Edit jars** — rename, recolour, move category, update notes
- **Delete jars** and individual memories
- **Manage categories** — add, rename, delete shelves
- **Sort** jars: A–Z, Z–A, Newest, Oldest
- **Export** data as JSON (full backup) or CSV (spreadsheet-friendly)
- **Import** from a previously exported JSON file
- **Duplicate** jars (right-click context menu)
- **Settings persistence** — language and sort mode are saved per account

---

## Responsive Design

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 768px | Single column, no sidebar, compact jars |
| iPad | 768–1023px | Sidebar (220px) + main content |
| Tablet | 1024–1279px | Sidebar (260px) + wider main |
| Desktop | 1280px+ | Sidebar (280px) + full main, larger jars |

---

## Language Support

| Code | Language | Character Set |
|------|----------|---------------|
| `en` | English | Latin |
| `th` | Thai (ภาษาไทย) | Thai script (U+0E00–U+0E7F) |
| `zh` | Chinese (中文) | CJK |
| `ja` | Japanese (日本語) | CJK + Kana |
| `ko` | Korean (한국어) | Hangul |

Font stack: **Playfair Display** (headings, serif elegance) + **Lato** (body) + **Sarabun** (Thai fallback, full Thai glyph coverage).

---

## Export Format (JSON)

```json
{
  "export_version": "2.0",
  "exported_at": "2025-03-22T10:00:00.000Z",
  "exported_by": "yourusername",
  "categories": [
    { "id": 5, "name": "Travel", "owner_id": 3, "sort_order": 0, "created_at": "..." }
  ],
  "jars": [
    { "id": "uuid", "name": "Summer 2024", "color": "amber", "icon": "🌊", ... }
  ],
  "memories": [
    { "id": "uuid", "jar_id": "uuid", "type": "note", "text": "...", "date": "2024-07-14", "mood": "😊", "tags": ["beach"] }
  ]
}
```

---

## Creator

This application was created by **Lumina Bom** and published as part of a design and development portfolio.

- **Instagram (personal):** [@luminabom](https://instagram.com/luminabom)
- **Instagram (portfolio):** [luminabom.portfolio](https://instagram.com/luminabom.portfolio)

> *"This account is used to publish my work as a portfolio."*

---

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome  | 90+ | Full support |
| Safari  | 15+ | Full support (incl. iOS/iPadOS) |
| Firefox | 88+ | Full support |
| Edge    | 90+ | Full support |

Requires: **ES Modules**, **IndexedDB**, **Web Crypto API**, **FileReader API**, **CSS Grid**.

---

## Privacy

All data is stored **locally in your browser**. Nothing is sent to any server. Clearing browser site data will erase all jars, memories, and accounts. Export your data regularly as a backup.

---

*Memory Jars v2.0 — © @luminabom | luminabom.portfolio*
