<div align="center">

# 🛒 বাজার দর (BazarDor)
### আধুনিক ও নির্ভরযোগ্য নিত্যপ্রয়োজনীয় পণ্যের বাজার দর ট্র্যাকিং প্ল্যাটফর্ম
**Daily Commodity Market Price Tracker & Comparison Web Application**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Authentication-10B981?style=for-the-badge&logo=auth0)](https://better-auth.com/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify)](https://bazar-d0r.netlify.app/)

<p align="center">
  <a href="https://bazar-d0r.netlify.app/"><strong>🌐 ভিজিট করুন লাইভ ডেমো (Live Demo) »</strong></a>
  <br />
  <a href="#-মুখ্য-সুবিধাসমূহ-key-features">প্রধান সুবিধাসমূহ</a> •
  <a href="#-চ্যালেঞ্জ-বাস্তবায়ন-challenge-requirements">চ্যালেঞ্জ সমাধান</a> •
  <a href="#-টেক-স্ট্যাক-tech-stack">প্রযুক্তি তালিকা</a> •
  <a href="#-লোকাল-সেটআপ-local-setup">রান করার নিয়ম</a>
</p>

---

</div>

## 📌 পরিচিতি (Overview)

**বাজার দর (BazarDor)** হলো একটি আধুনিক, দ্রুতগতির এবং রেসপনসিভ বাজার দর মনিটরিং অ্যাপ্লিকেশন। নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, শাকসবজি, মাছ, মাংস, ডিম-দুধ ও মশলা) ওঠানামা করা বাজার দরের তথ্য সাধারণ ভোক্তার কাছে স্বচ্ছ ও সহজবোধ্যভাবে পৌঁছে দেওয়াই এই প্ল্যাটফর্মের মূল লক্ষ্য।

ভোক্তারা এখানে প্রতিটি পণ্যের বিভাগ ও বাজারভিত্তিক (কারওয়ান বাজার, নিউ মার্কেট, মিরপুর ইত্যাদি) সর্বনিম্ন, গড় এবং সর্বোচ্চ দর পর্যবেক্ষণ করতে পারেন এবং সঠিক বাজার বিশ্লেষণের মাধ্যমে সাশ্রয়ী সিদ্ধান্ত নিতে পারেন।

---

## 🌐 গুরুত্বপূর্ণ লিংক (Quick Links)

| বিবরণ | লিংক |
| :--- | :--- |
| 🚀 **লাইভ ডিপ্লয়মেন্ট (Live Website)** | [https://bazar-d0r.netlify.app/](https://bazar-d0r.netlify.app/) |
| 💻 **গিটহাব রিপোজিটরি (GitHub Repository)** | [https://github.com/mahfuzhasan2700/Bazar-Dor](https://github.com/mahfuzhasan2700/Bazar-Dor) |
| 🔌 **API ডেটা সোর্স (Primary Base URL)** | `https://api.api-store.workers.dev/api/bazardor` |
| 🔄 **API ডেটা সোর্স (Fallback Base URL)** | `https://api.abcz.workers.dev/api/bazardor` |

---

## 🚀 মুখ্য সুবিধাসমূহ (Key Features)

### 1. 🔴 লাইভ প্রাইস টিকার মারকুই (Live Infinite Marquee Ticker)
* হেডারের ঠিক নিচে একটি অবিরাম চলমান টিকার স্ট্রিপে বিভিন্ন নিত্যপণ্যের সর্বশেষ দাম ও পরিবর্তন প্রদর্শিত হয় (`[আইকন] [নাম] আজকের দাম [টাকা]/[একক] [▲/▼ %]`)।
* মাউস হোভার করলে টিকার স্বয়ংক্রিয়ভাবে থেমে যায় যাতে ব্যবহারকারী সহজে তথ্য পড়তে পারেন।

### 2. 📈 শীর্ষ দর বৃদ্ধি ও হ্রাস সেকশন (Daily Risers & Fallers)
* **“আজ দাম বেড়েছে ▲”**: গতকালের তুলনায় সবচেয়ে বেশি দাম বাড়া শীর্ষ ৬টি পণ্য পজিটিভ গ্রিন ব্যাজসহ প্রদর্শিত।
* **“আজ দাম কমেছে ▼”**: গত ২৪ ঘণ্টায় সবচেয়ে বেশি দাম কমা শীর্ষ ৬টি পণ্য নেগেটিভ রেড ব্যাজসহ প্রদর্শিত।

### 3. 📊 বাজারভিত্তিক বিস্তারিত দরদাম ও পরিসংখ্যান (Market Breakdown & Analytics)
* পণ্যের বিস্তারিত পেজে রয়েছে **সর্বনিম্ন দাম**, **গড় দাম** এবং **সর্বোচ্চ দাম**-এর ৩টি পৃথক পরিসংখ্যান কার্ড (কোন বাজারে সবচেয়ে সস্তা তাও স্পষ্ট উল্লেখ রয়েছে)।
* ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেটসহ বিভিন্ন বিভাগের পাইকারি ও খুচরা বাজারের একটি সম্পূর্ণ তুলনামূলক তালিকা।

### 4. 🏷️ ক্যাটাগরি ব্রাউজিং ও বাংলা সংখ্যা নিউমেরিক সর্টিং (**Challenge C1**)
* চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মশলার দ্রুত নেভিগেশন।
* বাংলা সংখ্যার জন্য কার্যকর নিউমেরিক সর্টিং ড্রপডাউন:
  * `ডিফল্ট (Default)`
  * `দাম: কম থেকে বেশি (Price: Low to High)`
  * `দাম: বেশি থেকে কম (Price: High to Low)`
* কাস্টম স্কেলিটন লোডার এবং কোনো ডেটা না থাকলে ফ্রেন্ডলি ৪০৪ এম্পটি স্টেট।

### 5. 🔐 সুরক্ষিত অথেনটিকেশন ও প্রোফাইল আপডেট (**Challenge C3**)
* **BetterAuth** চালিত সুরক্ষিত ক্রেডেনশিয়াল (ইমেইল/পাসওয়ার্ড) ও ওঅথ (Google ও GitHub) লগইন ব্যবস্থা।
* প্রটেক্টেড রাউট গার্ড: লগইন ছাড়া পণ্যের বিস্তারিত দেখা নিষিদ্ধ এবং স্বয়ংক্রিয়ভাবে টোস্ট নোটিফিকেশনসহ লগইন পেজে রিডাইরেক্ট।
* **প্রোফাইল আপডেট ফিচার**: ব্যবহারকারী প্রোফাইল থেকে যেকোনো সময় নিজের নাম আপডেট করতে পারেন (BetterAuth `updateUser` এপিআই সমর্থিত)।

### 6. 📱 নিখুঁত রেসপনসিভনেস ও বাংলা টাইপোগ্রাফি
* মোবাইল, ট্যাবলেট ও ডেস্কটপ সব ডিভাইসে অ্যাডাপ্টিভ গ্রিড লেআউট।
* আধুনিক বাংলা ফন্ট **হিন্দ শিলিগুড়ি (Hind Siliguri)** ব্যবহার করে প্রিমিয়াম ভিজ্যুয়াল প্রেজেন্টেশন।

---

## 🏆 চ্যালেঞ্জ বাস্তবায়ন (Challenge Requirements Coverage)

| কোড | চ্যালেঞ্জ বিবরণ | বাস্তবায়ন বিবরণ | স্ট্যাটাস |
| :---: | :--- | :--- | :---: |
| **C1** | **সর্টিং কন্ট্রোল (Sort Dropdown)** | ক্যাটাগরি পেজে `ডিফল্ট`, `দাম: কম থেকে বেশি` এবং `দাম: বেশি থেকে কম` সর্টিং যুক্ত করা হয়েছে, যা বাংলা ডিজিটের নিউমেরিক মানের ওপর ভিত্তি করে নিখুঁতভাবে সর্ট করে। | ✅ সম্পন্ন |
| **C2** | **প্রফেশনাল README** | প্রজেক্টের নাম, বর্ণনা, ব্যবহৃত প্রযুক্তি, লাইভ লিংক এবং ৫টি মূল ফিচার সমৃদ্ধ আন্তর্জাতিক মানের ডকুমেন্টেশন। | ✅ সম্পন্ন |
| **C3** | **প্রোফাইল ইনফরমেশন আপডেট** | `/profile` এবং ডেডিকেটেড `/profile/update` রুটে ইউজারের নাম পরিবর্তনের ফর্ম যুক্ত করা হয়েছে যা BetterAuth ইন্টিগ্রেটেড। | ✅ সম্পন্ন |

---

## 🛠️ প্রযুক্তি তালিকা (Tech Stack)

```
┌─────────────────────────────────────────────────────────────┐
│                       ARCHITECTURE                          │
├─────────────────┬───────────────────────────────────────────┤
│ Frontend Core   │ Next.js 16 (App Router) + React 19        │
│ Language        │ TypeScript 5                              │
│ Styling         │ Tailwind CSS v4                           │
│ Authentication  │ BetterAuth + Better-SQLite3 / Storage     │
│ Icons & Visuals │ Lucide React + DiceBear Avatars           │
│ Notifications   │ React Hot Toast                           │
│ Deployment      │ Netlify (CI/CD Pipeline)                  │
└─────────────────┴───────────────────────────────────────────┘
```

---

## 📂 ফোল্ডার স্ট্রাকচার (Project Structure)

```bash
bazar-dor/
├── public/                     # স্ট্যাটিক অ্যাসেটস ও ইমেজ (লোগো, হিরো ব্যানার)
│   ├── bazar-hero.png
│   └── logo-icon.png
├── src/
│   ├── app/                    # Next.js অ্যাপ রাউটার পেজসমূহ
│   │   ├── api/auth/[...all]/  # BetterAuth এপিআই রুট হ্যান্ডলার
│   │   ├── categories/[slug]/  # ক্যাটাগরি পেজ (সর্টিং ও ফিল্টারিং সহ)
│   │   ├── product/[id]/       # প্রটেক্টেড প্রোডাক্ট ডিটেইলস পেজ
│   │   ├── profile/            # ইউজার প্রোফাইল ও আপডেট রুট (C3)
│   │   │   └── update/         # ডেডিকেটেড ইনফরমেশন আপডেট পেজ
│   │   ├── signin/             # ইউজার সাইন ইন পেজ
│   │   ├── signup/             # ইউজার সাইন আপ পেজ
│   │   ├── globals.css         # গ্লোবাল স্টাইল ও মারকুই অ্যানিমেশন
│   │   ├── layout.tsx          # রুট লেআউট ও ফন্ট কনফিগারেশন
│   │   ├── not-found.tsx       # কাস্টম ৪০৪ এরর পেজ
│   │   └── page.tsx            # হোম পেজ (হিরো, রাইজার্স, ফলার্স, অল প্রোডাক্টস)
│   ├── components/             # রিইউজেবল ইউআই কম্পোনেন্টসমূহ
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── Navbar.tsx
│   │   ├── PriceTicker.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductSkeleton.tsx
│   ├── context/                # অথেনটিকেশন স্টেট প্রোভাইডার
│   │   └── AuthContext.tsx
│   ├── lib/                    # কোর ইউটিলিটিস ও এপিআই লেয়ার
│   │   ├── api.ts              # রেসিলিয়েন্ট ফেচিং ও ফলব্যাক হ্যান্ডলিং
│   │   ├── auth-client.ts      # BetterAuth রিঅ্যাক্ট ক্লায়েন্ট
│   │   ├── auth.ts             # BetterAuth সার্ভার কনফিগারেশন
│   │   └── utils.ts            # বাংলা সংখ্যা, একক ও তারিখ রূপান্তর
│   └── types/                  # টাইপস্ক্রিপ্ট টাইপ ডেফিনিশন
│       └── index.ts
├── netlify.toml                # Netlify ডিপ্লয়মেন্ট কনফিগারেশন
├── package.json
└── README.md
```

---

## 🔌 API রেফারেন্স (API Endpoints)

| মেথড | এন্ডপয়েন্ট | কাজ |
| :--- | :--- | :--- |
| `GET` | `/categories` | সকল পণ্যের ক্যাটাগরি তালিকা রিটার্ন করে |
| `GET` | `/categories/:slug` | নির্দিষ্ট ক্যাটাগরির বিস্তারিত তথ্য |
| `GET` | `/products` | সকল পণ্যের বাজার দর, ইতিহাস ও পরিবর্তন সংক্রান্ত তালিকা |
| `GET` | `/products?category=:slug` | ক্যাটাগরি অনুযায়ী ফিল্টারকৃত পণ্যের তালিকা |
| `GET` | `/products/:id` | নির্দিষ্ট পণ্যের বিস্তারিত ও সকল বাজারের দরতালিকা |

---

## 💻 লোকাল সেটআপ (Local Setup & Development)

### ১. পূর্বশর্ত (Prerequisites)
* Node.js version 18.18+ অথবা 20+
* npm, yarn, অথবা pnpm প্যাকেজ ম্যানেজার

### ২. রিপোজিটরি ক্লোন করুন
```bash
git clone https://github.com/mahfuzhasan2700/Bazar-Dor.git
cd Bazar-Dor
```

### ৩. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
npm install
```

### ৪. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ
প্রজেক্ট রুটে একটি `.env.local` ফাইল তৈরি করুন:
```env
BETTER_AUTH_SECRET=bazardor_super_secret_key_phero_b14_a7
BETTER_AUTH_URL=http://localhost:3000
```

### ৫. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে ভিজিট করুন: [http://localhost:3000](http://localhost:3000)

### ৬. প্রোডাকশন বিল্ড তৈরি করুন
```bash
npm run build
npm run start
```

---

## 👥 অ্যাসাইনমেন্ট সাবমিশন তথ্য (Assignment Details)

* **কোর্স:** Programming Hero Batch 14
* **অ্যাসাইনমেন্ট:** Assignment 07 — বাজার দর (BazarDor)
* **লাইভ লিংক:** [https://bazar-d0r.netlify.app/](https://bazar-d0r.netlify.app/)
* **গিটহাব রিপোজিটরি:** [https://github.com/mahfuzhasan2700/Bazar-Dor](https://github.com/mahfuzhasan2700/Bazar-Dor)

---

<div align="center">
  <p>তৈরি করা হয়েছে ❤️ এবং একাগ্রতার সাথে | সর্বস্বত্ব সংরক্ষিত ২০২৬</p>
</div>
