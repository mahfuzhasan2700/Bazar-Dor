const banglaDigits: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBanglaNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return "০";
  }
  const formatted = typeof value === "number" ? Math.round(value * 10) / 10 : value;
  return formatted
    .toString()
    .split("")
    .map((char) => banglaDigits[char] || char)
    .join("");
}

export function formatBanglaUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return unit ? `প্রতি ${unit}` : "প্রতি কেজি";
  }
}

export function getTodayBanglaDate(): string {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const dateNum = toBanglaNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearNum = toBanglaNumber(now.getFullYear());

  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}
