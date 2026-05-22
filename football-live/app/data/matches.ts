import { League } from "../types";

export const matchesData: League[] = [
  {
    name: "دوري أبطال أوروبا",
    matches: [
      {
        id: 1,
        homeTeam: "ريال مدريد",
        awayTeam: "بايرن ميونخ",
        homeScore: 2,
        awayScore: 1,
        time: "21:00",
        status: "live",
        league: "دوري أبطال أوروبا",
        channel: "beIN Sports 1",
      },
      {
        id: 2,
        homeTeam: "باريس سان جيرمان",
        awayTeam: "مانشستر سيتي",
        time: "23:00",
        status: "upcoming",
        league: "دوري أبطال أوروبا",
        channel: "beIN Sports 2",
      },
    ],
  },
  {
    name: "الدوري الإنجليزي الممتاز",
    matches: [
      {
        id: 3,
        homeTeam: "ليفربول",
        awayTeam: "أرسنال",
        homeScore: 3,
        awayScore: 3,
        time: "18:30",
        status: "finished",
        league: "الدوري الإنجليزي الممتاز",
        channel: "beIN Sports 3",
      },
      {
        id: 4,
        homeTeam: "تشيلسي",
        awayTeam: "توتنهام",
        time: "21:00",
        status: "upcoming",
        league: "الدوري الإنجليزي الممتاز",
        channel: "beIN Sports 4",
      },
    ],
  },
  {
    name: "الدوري الإسباني",
    matches: [
      {
        id: 5,
        homeTeam: "برشلونة",
        awayTeam: "أتلتيكو مدريد",
        homeScore: 1,
        awayScore: 0,
        time: "20:00",
        status: "live",
        league: "الدوري الإسباني",
        channel: "beIN Sports 5",
      },
    ],
  },
  {
    name: "الدوري الإيطالي",
    matches: [
      {
        id: 6,
        homeTeam: "إنتر ميلان",
        awayTeam: "يوفنتوس",
        homeScore: 2,
        awayScore: 2,
        time: "17:00",
        status: "finished",
        league: "الدوري الإيطالي",
        channel: "beIN Sports 6",
      },
      {
        id: 7,
        homeTeam: "ميلان",
        awayTeam: "نابولي",
        time: "22:00",
        status: "upcoming",
        league: "الدوري الإيطالي",
        channel: "beIN Sports 7",
      },
    ],
  },
  {
    name: "الدوري السعودي",
    matches: [
      {
        id: 8,
        homeTeam: "الهلال",
        awayTeam: "النصر",
        homeScore: 0,
        awayScore: 0,
        time: "20:30",
        status: "live",
        league: "الدوري السعودي",
        channel: "SSC Sport 1",
      },
    ],
  },
];
