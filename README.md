# 🛒 বাজার দর (BazarDor)

নিত্যপ্রয়োজনীয় দ্রব্যাদির বাজার দর এক নজরে যাচাই এবং বিভিন্ন বাজারের মধ্যে মূল্য তুলনা করার একটি আধুনিক ও নির্ভরযোগ্য প্ল্যাটফর্ম। এই অ্যাপ্লিকেশনের মাধ্যমে সাধারণ ক্রেতারা প্রতিদিনের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সঠিক বাজার দর জানতে পারবেন।

---

## 🔗 গুরুত্বপূর্ণ লিংকসমূহ

- **লাইভ ওয়েবসাইট (Live URL):** [https://bazar-dor-perseus11.vercel.app/](https://bazar-dor-perseus11.vercel.app/)
- **গিটহাব রিপোজিটরি (GitHub Repository):** [https://github.com/mahfuzhasan2700/Bazar-Dor](https://github.com/mahfuzhasan2700/Bazar-Dor)

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

- **ফ্রেমওয়ার্ক:** [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **প্রোগ্রামিং ল্যাঙ্গুয়েজ:** [TypeScript](https://www.typescriptlang.org/)
- **স্টাইলিং:** [Tailwind CSS v4](https://tailwindcss.com/) ও [DaisyUI](https://daisyui.com/)
- **অথেনটিকেশন:** [BetterAuth](https://better-auth.com/) (Email/Password, Google OAuth, GitHub OAuth)
- **ডাটাবেজ:** [MongoDB Atlas](https://www.mongodb.com/atlas) (BetterAuth MongoDB Adapter)
- **টুলস ও নোটিফিকেশন:** `react-hot-toast`, `lucide-react`
- **ডিপ্লয়মেন্ট:** [Vercel](https://vercel.com/)

---

## ✨ প্রধান বৈশিষ্ট্যসমূহ (Key Features)

1. **রিয়েল-টাইম প্রাইস স্ক্রোলার (Price Ticker):**
   - প্রতিটা পণ্যের নাম, আজকের দর ও শতকরা পরিবর্তন নিয়ে স্বয়ংক্রিয়ভাবে স্ক্রোল হওয়া একটি মারকুই বার, যাতে মাউস নিলে স্ক্রোল সাময়িকভাবে থেমে থাকে।

2. **দৈনিক দর ওঠানামার বিশ্লেষণ (Risers & Fallers):**
   - হোম পেজে শীর্ষ ৬টি মূল্যবৃদ্ধিকৃত পণ্য (▲ আজ দাম বেড়েছে) এবং শীর্ষ ৬টি মূল্যহ্রাসকৃত পণ্য (▼ আজ দাম কমেছে) আলাদা সেকশনে প্রদর্শিত হয়।

3. **ক্যাটাগরিভিত্তিক ফিল্টারিং ও সঠিক বাংলা সংখ্যাভিত্তিক সর্টিং (Challenge C1):**
   - চাল, ডাল, তেল, সবজি ইত্যাদি ক্যাটাগরিভিত্তিক পণ্য দেখার সুবিধা এবং 'ডিফল্ট', 'দাম: কম থেকে বেশি', 'দাম: বেশি থেকে কম' অনুযায়ী সংখ্যাগত মানভিত্তিক সর্টিং।

4. **সুরক্ষিত প্রোডাক্ট বিস্তারিত পেজ (Protected Product Details):**
   - কেবল লগইন করা ব্যবহারকারীরা প্রতিটি পণ্যের বিস্তারিত, গড়, সর্বনিম্ন ও সর্বোচ্চ দর এবং দেশের বিভিন্ন বাজারের তুলনামূলক তালিকা দেখতে পারেন।

5. **প্রোফাইল ব্যবস্থাপনা ও তথ্য আপডেট (Challenge C3):**
   - ব্যবহারকারী তার প্রোফাইল তথ্য দেখতে পারেন এবং BetterAuth এর `updateUser` API ব্যবহার করে প্রোফাইলের নাম সরাসরি আপডেট করতে পারেন।

6. **রেসপন্সিভ ডিজাইন ও কাস্টম ৪০৪ পেজ:**
   - মোবাইল, ট্যাবলেট এবং ডেস্কটপ সব ডিভাইসে সম্পূর্ণ রেসপন্সিভ লেআউট এবং ভুল লিংকের ক্ষেত্রে ব্যবহারকারী-বান্ধব ৪০৪ পেজ ও লোডিং স্কেলিটন।

---

## 🏆 চ্যালেঞ্জসমূহ (Challenge Requirements)

- **C1 - সর্টিং ড্রপডাউন:** ক্যাটাগরি পেজে বাংলা অঙ্কে প্রদর্শিত দামকে সঠিক সংখ্যাগত মানে রূপান্তর করে নিখুঁতভাবে সর্ট করার ব্যবস্থা।
- **C2 - গিটহাব README:** প্রকল্পের নাম, বর্ণনা, ব্যবহৃত প্রযুক্তি এবং ৫টি প্রধান ফিচারের বিস্তারিত উপস্থাপন।
- **C3 - তথ্য আপডেট সুবিধা:** প্রোফাইল পেজে "তথ্য আপডেট করুন" বাটনে ক্লিক করে ব্যবহারকারীর নাম পরিবর্তনের কার্যকর ফিচার।

---

## 💻 লোকাল মেশিনে চালানোর নিয়ম (Local Setup)

১. রিপোজিটরি ক্লোন করুন:
```bash
git clone https://github.com/mahfuzhasan2700/Bazar-Dor.git
cd Bazar-Dor/bazar-dor
```

২. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

৩. পরিবেশ ভ্যারিয়েবল (`.env.local`) কনফিগার করুন:
```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bazardor?retryWrites=true&w=majority
MONGODB_DB_NAME=bazardor

# BetterAuth
BETTER_AUTH_SECRET=your_random_secret_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

৪. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) এ প্রবেশ করুন।
