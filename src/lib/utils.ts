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
  if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
    return "০";
  }
  const str = typeof value === "string" ? value : value.toString();
  return str
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

export function getTodayBanglaDate(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
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

    // Fallback: Compute date in Asia/Dhaka (+6 UTC offset)
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const dhakaDate = new Date(utc + 6 * 3600000);

    const dayName = days[dhakaDate.getDay()];
    const dateNum = toBanglaNumber(dhakaDate.getDate());
    const monthName = months[dhakaDate.getMonth()];
    const yearNum = toBanglaNumber(dhakaDate.getFullYear());

    return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
  }
}
