<div align="center">

# 🛒 বাজার দর (BazarDor)
### Real-Time Commodity Price Intelligence & Market Analytics Platform
**নিত্যপ্রয়োজনীয় পণ্যের বাজার দর ট্র্যাকিং, বাজারভিত্তিক তুলনা ও স্বচ্ছ ভোক্তা সিদ্ধান্ত প্ল্যাটফর্ম**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-087EA4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-OAuth_2.0-10B981?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)
[![Netlify](https://img.shields.io/badge/Deployment-Netlify_CI/CD-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://bazar-d0r.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

<p align="center">
  <a href="https://bazar-d0r.netlify.app/"><strong>🌐 Launch Live Application »</strong></a>
  <br />
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-security--performance">Security</a> •
  <a href="#-api-reference">API Reference</a>
</p>

---

</div>

## 📌 Overview

**BazarDor (বাজার দর)** is a state-of-the-art web application engineered to solve price opacity and consumer friction in Bangladesh's daily commodity retail markets. By aggregating real-time price trends across major urban and regional marketplaces (e.g., Karwan Bazar, New Market, Mirpur-1, Shantinagar), BazarDor delivers actionable intelligence directly to everyday households and business buyers.

Built on the latest **Next.js 16 (App Router)** and **React 19** ecosystem, the platform features high-performance server/client hybrid rendering, localized Bengali numeral sorting algorithms, resilient dual-layer API caching, and robust authentication with **BetterAuth**.

---

## 🚀 Key Features

### 1. 🔴 Live Continuous Price Ticker
* High-visibility marquee ticker running along the top header displaying real-time commodity movements (`[Icon] [Commodity] [Current Price] [▲/▼ Delta %]`).
* Seamless hardware-accelerated CSS marquee with pause-on-hover interaction for friction-free reading.

### 2. 📈 Daily Market Dynamics (Risers & Fallers)
* **▲ Top Daily Risers (আজ দাম বেড়েছে):** Instant analytical breakdown of commodities with highest positive price spikes over the past 24 hours.
* **▼ Top Daily Fallers (আজ দাম কমেছে):** Curated view of items experiencing price drops, enabling budget-conscious consumers to capitalize on savings.

### 3. 📊 Deep Multi-Market Comparative Analytics
* **Statistical Distribution Cards:** Live computation of **Minimum Price**, **Average Market Price**, and **Maximum Price** across all active retail outlets.
* **Lowest Price Identifier:** Automatically flags the most cost-effective bazaar for each commodity.
* **Granular Market Breakdown Table:** Comparative inspection across major municipal markets (কারওয়ান বাজার, মিরপুর-১, শান্তিনগর, নিউ মার্কেট ইত্যাদি) complete with market types (পাইকারি/খুচরা) and location metadata.

### 4. 🏷️ Category Filtering with Bengali Numeric Sorting
* Fast multi-category navigation (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মশলা).
* **Native Numerical Sorting Engine:** Intelligent conversion and evaluation of Bengali numeral strings (`০-৯` to IEEE double-precision floats), enabling true numeric sorting:
  * `ডিফল্ট (Default Ordering)`
  * `দাম: কম থেকে বেশি (Price: Low to High)`
  * `দাম: বেশি থেকে কম (Price: High to Low)`
* Graceful empty states with search reset triggers and animated skeleton loading states.

### 5. 🔐 Enterprise Authentication & Profile Management
* **Powered by BetterAuth:** Hybrid authentication engine supporting:
  * Secure Email & Password signup/login with client and server input validation.
  * Direct OAuth 2.0 integration with **Google** and **GitHub**.
* **Protected Route Architecture:** Client-side route guards on commodity analytics and user profiles, redirecting unauthenticated users to `/signin` with context-aware callback handling.
* **Self-Service Profile Customization:** In-app profile editing allowing real-time name updates with immediate reflection across the application session.

### 6. 📱 Responsive Ergonomics & Typography
* Mobile-first responsive layout utilizing Tailwind CSS v4 variables and utility architecture.
* Full-fidelity Bengali typography utilizing **Hind Siliguri (হিন্দ শিলিগুড়ি)** for legibility and visual refinement.
* Friendly, branded Bengali **404 Not Found** page ensuring smooth error recovery.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT APPLICATION LAYER                        │
│                                                                        │
│   Next.js 16 (App Router)  │  React 19 Server & Client Components      │
│   Tailwind CSS v4 Engine   │  React Hot Toast  │  Lucide Icons         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION & STATE                          │
│                                                                        │
│   BetterAuth Core Engine   │  OAuth 2.0 Providers (Google & GitHub)    │
│   Secure HTTP-Only Cookies │  Dynamic In-Memory / SQLite Session Store │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         DATA & RESILIENCE LAYER                        │
│                                                                        │
│   Primary Edge API (Cloudflare Worker) ──► Failover Replica API        │
│   Number & Locale Transformation (Bangla Numerals, Currency & Dates)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.4.0](https://nextjs.org/) | App Router, Server Components, Turbopack Engine |
| **Library** | [React 19.3.0](https://react.dev/) | React Server Actions, Hooks, Suspense Boundaries |
| **Language** | [TypeScript 5.x](https://www.typescriptlang.org/) | End-to-end static typing and interfaces |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS tokens, utility-first design, fluid grid |
| **Auth Engine** | [BetterAuth](https://better-auth.com/) | Credentials, Google OAuth 2.0, GitHub OAuth 2.0 |
| **Database** | Better-SQLite3 | Embedded serverless-compatible data layer |
| **UI Components** | [Lucide React](https://lucide.dev/) | Consistent iconography suite |
| **Feedback** | [React Hot Toast](https://react-hot-toast.com/) | Accessible, non-blocking notification toasts |
| **Deployment** | [Netlify](https://www.netlify.com/) | Edge network, serverless functions, automated CI/CD |

---

## 📂 Project Structure

```bash
bazar-dor/
├── public/                       # Static public assets (logos, hero banner, favicon)
│   ├── bazar-hero.png
│   └── favicon.ico
├── src/
│   ├── app/                      # Next.js App Router root
│   │   ├── api/auth/[...all]/    # BetterAuth serverless API catch-all route
│   │   ├── categories/[slug]/    # Dynamic category listing & sorting
│   │   ├── product/[id]/         # Protected product analytics & bazaar tables
│   │   ├── profile/              # User account overview
│   │   │   └── update/           # In-app profile editor
│   │   ├── signin/               # Authentication entry point
│   │   ├── signup/               # New user onboarding
│   │   ├── globals.css           # Global typography & animation tokens
│   │   ├── layout.tsx            # Root application layout & toast providers
│   │   ├── not-found.tsx         # Branded Bengali 404 error page
│   │   └── page.tsx              # Landing page (Hero, Risers, Fallers, Grid)
│   ├── components/               # Modular UI building blocks
│   │   ├── Footer.tsx            # Application footer & metadata
│   │   ├── HeroBanner.tsx        # Promotional banner & search triggers
│   │   ├── Navbar.tsx            # Sticky navigation & auth state controls
│   │   ├── PriceTicker.tsx       # Live continuous marquee ticker
│   │   ├── ProductCard.tsx       # Reusable commodity card with price delta badges
│   │   └── ProductSkeleton.tsx   # Loading placeholders
│   ├── context/                  # React Context providers
│   │   └── AuthContext.tsx       # Global authentication state & action handlers
│   ├── lib/                      # Core utility libraries
│   │   ├── api.ts                # Fault-tolerant commodity data service
│   │   ├── auth-client.ts        # Client-side BetterAuth connector
│   │   ├── auth.ts               # Server-side BetterAuth setup & SQLite tables
│   │   └── utils.ts              # Bengali numeral & unit localization engine
│   └── types/                    # Shared TypeScript interfaces & types
│       └── index.ts
├── netlify.toml                  # Netlify deployment & environment config
├── next.config.ts                # Next.js bundler & HTTP security headers config
├── package.json
└── README.md
```

---

## 💻 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
* **Node.js**: `v20.x` or higher recommended
* **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/mahfuzhasan2700/Bazar-Dor.git
cd Bazar-Dor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```
Fill in the configuration parameters:
```env
# BetterAuth Configuration
BETTER_AUTH_SECRET=your_secure_random_key_here
BETTER_AUTH_URL=http://localhost:3000

# Optional: GitHub OAuth (https://github.com/settings/developers)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Optional: Google OAuth (https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Launch the Development Server
```bash
npm run dev
```
Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Performance

* **Zero Client Leaks:** No secret keys or OAuth secrets are prefixed with `NEXT_PUBLIC_`. All token verification and callback handshakes occur exclusively in server-side runtimes.
* **Comprehensive HTTP Security Headers:** Configured via `next.config.ts`:
  * `X-Frame-Options: SAMEORIGIN` (prevents clickjacking attacks)
  * `X-Content-Type-Options: nosniff` (mitigates MIME type confusion)
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  * `Strict-Transport-Security` (enforces HTTPS)
* **Resilient Dual-API Architecture:** The API client automatically retries failed requests against a secondary Cloudflare Workers replica, providing uninterrupted uptime during upstream network anomalies.
* **Protected Session Cookies:** Authentication cookies default to `HttpOnly`, `SameSite: Lax`, and mandatory `Secure` flags in production.

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/categories` | Retrieves all registered product categories |
| `GET` | `/categories/:slug` | Retrieves metadata for a specific category |
| `GET` | `/products` | Retrieves full commodity dataset with daily delta metrics |
| `GET` | `/products?category=:slug` | Filters commodity items by category identifier |
| `GET` | `/products/:id` | Returns commodity details including multi-bazaar pricing |
| `POST`| `/api/auth/sign-in/email` | BetterAuth email/password authentication |
| `POST`| `/api/auth/sign-in/social` | BetterAuth OAuth 2.0 handshake initialization |
| `GET` | `/api/auth/get-session` | Validates and returns active session data |

---

## 📄 License

This project is open-source and distributed under the terms of the [MIT License](https://opensource.org/licenses/MIT).

<br />

<div align="center">
  <sub>Developed with passion for consumer transparency • © 2026 BazarDor. All rights reserved.</sub>
</div>
