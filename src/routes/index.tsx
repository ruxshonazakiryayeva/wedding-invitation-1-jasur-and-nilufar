import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent } from "react";
import { Heart, MapPin, Calendar as CalendarIcon, Send, ChevronDown, Music, ArrowLeft, Lock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const INVITATION_KEY = "golden_vows";
const ADMIN_PASSWORD = "goldenvows2026";
const MAIN_SITE_URL = "https://webinvite-six.vercel.app/";

type RsvpRow = {
  created_at: string;
  name: string;
  attendance: string;
  guests: number;
  comment: string;
};

import heroBg from "@/assets/hero-bg.jpg";
import floralFrame from "@/assets/floral-frame.png";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import { Petals } from "@/components/Petals";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jasur & Nilufar — To'y Taklifnomasi" },
      { name: "description", content: "Bizning to'yimizga taklif etamiz — 9 Sentyabr 2026" },
    ],
  }),
  component: WeddingPage,
});

const WEDDING_DATE = new Date("2026-09-09T18:00:00+05:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => target.getTime());
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const YT_VIDEO_ID = "f_un1rejAcw";
const LANGS = ["RU", "EN", "UZ", "ЎЗ"] as const;
type Lang = (typeof LANGS)[number];

/* ---------- i18n ---------- */
type Dict = {
  introTag: string;
  introCta: string;
  eyebrow: string;
  amp: string;
  cdDays: string;
  cdHours: string;
  cdMin: string;
  cdSec: string;
  invitationTitle: string;
  invitationGreeting: string;
  invitationBody: string;
  invitationSign: string;
  scheduleTitle: string;
  schedule: { time: string; title: string; desc: string }[];
  dateLabel: string;
  monthYear: string;
  weekdays: string[];
  locationLabel: string;
  hallTitle: string;
  hallName: string;
  address: string;
  galleryLabel: string;
  galleryTitle: string;
  rsvpLabel: string;
  rsvpTitle: string;
  rsvpHint: string;
  fName: string;
  fNamePh: string;
  fAttend: string;
  fAttendChoose: string;
  fAttendYes: string;
  fAttendNo: string;
  fGuests: string;
  fComment: string;
  fCommentPh: string;
  send: string;
  sending: string;
  ok: string;
  err: string;
  deadline: string;
  closingTranslation: string;
  closingRef: string;
  musicOn: string;
  musicOff: string;
};

const T: Record<Lang, Dict> = {
  UZ: {
    introTag: "Taklifnoma",
    introCta: "Yurakchani bosib taklifnomani oching",
    eyebrow: "To'y marosimi",
    amp: "va",
    cdDays: "Kun", cdHours: "Soat", cdMin: "Daqiqa", cdSec: "Soniya",
    invitationTitle: "Taklifnoma",
    invitationGreeting: "Aziz qarindoshlar va do'stlar!",
    invitationBody:
      "Quvonch ila sizni hayotimizdagi eng muhim kunlardan biri — to'y kunimizni biz bilan birga nishonlashga taklif qilamiz. Bu unutilmas lahzada yonimizda bo'lishingiz biz uchun katta sharafdir.",
    invitationSign: "— Jasur va Nilufar",
    scheduleTitle: "Kun dasturi",
    schedule: [
      { time: "19:00", title: "Mehmonlar yig'ilishi", desc: "Salomlashuv va xush kelibsiz koktyeli" },
      { time: "19:30", title: "Rasmiy qism", desc: "Nikoh marosimi va tabriklar" },
      { time: "20:00", title: "Asosiy dastur", desc: "Ziyofat, raqs va musiqa" },
      { time: "22:00", title: "Kechaning yakuni", desc: "Xotira uchun samimiy lahzalar" },
    ],
    dateLabel: "Sana",
    monthYear: "Sentyabr 2026",
    weekdays: ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"],
    locationLabel: "Manzil",
    hallTitle: "Bayram zali",
    hallName: "«Royal Palace»",
    address: "Toshkent sh., Mirzo Ulug'bek tumani, Amir Temur ko'chasi 1",
    galleryLabel: "Fotogalereya",
    galleryTitle: "Bizning lahzalar",
    rsvpLabel: "Tasdiqlash",
    rsvpTitle: "Anketa",
    rsvpHint: "Iltimos, ishtirokingizni tasdiqlang",
    fName: "To'liq ism", fNamePh: "Ismingiz",
    fAttend: "Ishtirok", fAttendChoose: "Tanlang…",
    fAttendYes: "Ha, kelaman", fAttendNo: "Kelolmayman",
    fGuests: "Mehmonlar soni",
    fComment: "Izoh", fCommentPh: "Tilaklaringiz…",
    send: "Yuborish", sending: "Yuborilmoqda…",
    ok: "💌 Rahmat! Sizni kutamiz.",
    err: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    deadline: "Javob — 10 Avgustgacha",
    closingTranslation: "Va U ularning qalblarini birlashtirdi",
    closingRef: "Al-Anfol · 63",
    musicOn: "Musiqani yoqish", musicOff: "Musiqani to'xtatish",
  },
  RU: {
    introTag: "Приглашение",
    introCta: "Нажмите на сердечко, чтобы открыть",
    eyebrow: "Свадебная церемония",
    amp: "и",
    cdDays: "Дней", cdHours: "Часов", cdMin: "Минут", cdSec: "Секунд",
    invitationTitle: "Приглашение",
    invitationGreeting: "Дорогие родные и друзья!",
    invitationBody:
      "С радостью приглашаем вас разделить с нами один из самых важных дней нашей жизни — день нашей свадьбы. Ваше присутствие в этот незабываемый момент станет для нас большой честью.",
    invitationSign: "— Жасур и Нилуфар",
    scheduleTitle: "Программа дня",
    schedule: [
      { time: "19:00", title: "Сбор гостей", desc: "Приветственный коктейль" },
      { time: "19:30", title: "Официальная часть", desc: "Церемония и поздравления" },
      { time: "20:00", title: "Основная программа", desc: "Банкет, танцы и музыка" },
      { time: "22:00", title: "Завершение вечера", desc: "Тёплые моменты на память" },
    ],
    dateLabel: "Дата",
    monthYear: "Сентябрь 2026",
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    locationLabel: "Место",
    hallTitle: "Банкетный зал",
    hallName: "«Royal Palace»",
    address: "г. Ташкент, Мирзо-Улугбекский р-н, ул. Амира Темура 1",
    galleryLabel: "Фотогалерея",
    galleryTitle: "Наши мгновения",
    rsvpLabel: "Подтверждение",
    rsvpTitle: "Анкета",
    rsvpHint: "Пожалуйста, подтвердите участие",
    fName: "Полное имя", fNamePh: "Ваше имя",
    fAttend: "Участие", fAttendChoose: "Выберите…",
    fAttendYes: "Да, приду", fAttendNo: "Не смогу",
    fGuests: "Кол-во гостей",
    fComment: "Комментарий", fCommentPh: "Ваши пожелания…",
    send: "Отправить", sending: "Отправка…",
    ok: "💌 Спасибо! Ждём вас.",
    err: "Произошла ошибка. Попробуйте снова.",
    deadline: "Ответ — до 10 августа",
    closingTranslation: "И Он соединил их сердца",
    closingRef: "Аль-Анфаль · 63",
    musicOn: "Включить музыку", musicOff: "Выключить музыку",
  },
  EN: {
    introTag: "Invitation",
    introCta: "Tap the heart to open the invitation",
    eyebrow: "The Wedding",
    amp: "&",
    cdDays: "Days", cdHours: "Hours", cdMin: "Minutes", cdSec: "Seconds",
    invitationTitle: "Invitation",
    invitationGreeting: "Dear family and friends!",
    invitationBody:
      "With great joy we invite you to share one of the most important days of our lives — our wedding day. Your presence at this unforgettable moment would be a true honour for us.",
    invitationSign: "— Jasur & Nilufar",
    scheduleTitle: "Programme",
    schedule: [
      { time: "19:00", title: "Guests gathering", desc: "Welcome cocktail" },
      { time: "19:30", title: "Official part", desc: "Ceremony and congratulations" },
      { time: "20:00", title: "Main programme", desc: "Banquet, dancing and music" },
      { time: "22:00", title: "Closing", desc: "Warm memories to remember" },
    ],
    dateLabel: "Date",
    monthYear: "September 2026",
    weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    locationLabel: "Venue",
    hallTitle: "Banquet hall",
    hallName: "“Royal Palace”",
    address: "Tashkent, Mirzo Ulugbek district, Amir Temur street 1",
    galleryLabel: "Gallery",
    galleryTitle: "Our moments",
    rsvpLabel: "RSVP",
    rsvpTitle: "Form",
    rsvpHint: "Please confirm your attendance",
    fName: "Full name", fNamePh: "Your name",
    fAttend: "Attendance", fAttendChoose: "Choose…",
    fAttendYes: "Yes, I will come", fAttendNo: "I can't make it",
    fGuests: "Number of guests",
    fComment: "Comment", fCommentPh: "Your wishes…",
    send: "Send", sending: "Sending…",
    ok: "💌 Thank you! We're waiting for you.",
    err: "Something went wrong. Please try again.",
    deadline: "Reply by August 10",
    closingTranslation: "And He united their hearts",
    closingRef: "Al-Anfal · 63",
    musicOn: "Play music", musicOff: "Pause music",
  },
  "ЎЗ": {
    introTag: "Таклифнома",
    introCta: "Юракчани босиб таклифномани очинг",
    eyebrow: "Тўй маросими",
    amp: "ва",
    cdDays: "Кун", cdHours: "Соат", cdMin: "Дақиқа", cdSec: "Сония",
    invitationTitle: "Таклифнома",
    invitationGreeting: "Азиз қариндошлар ва дўстлар!",
    invitationBody:
      "Қувонч ила сизни ҳаётимиздаги энг муҳим кунлардан бири — тўй кунимизни биз билан бирга нишонлашга таклиф қиламиз. Бу унутилмас лаҳзада ёнимизда бўлишингиз биз учун катта шарафдир.",
    invitationSign: "— Жасур ва Нилуфар",
    scheduleTitle: "Кун дастури",
    schedule: [
      { time: "19:00", title: "Меҳмонлар йиғилиши", desc: "Саломлашув ва хуш келибсиз коктейли" },
      { time: "19:30", title: "Расмий қисм", desc: "Никоҳ маросими ва табриклар" },
      { time: "20:00", title: "Асосий дастур", desc: "Зиёфат, рақс ва мусиқа" },
      { time: "22:00", title: "Кечанинг якуни", desc: "Хотира учун самимий лаҳзалар" },
    ],
    dateLabel: "Сана",
    monthYear: "Сентябрь 2026",
    weekdays: ["Ду", "Се", "Чо", "Па", "Жу", "Ша", "Я"],
    locationLabel: "Манзил",
    hallTitle: "Байрам зали",
    hallName: "«Royal Palace»",
    address: "Тошкент ш., Мирзо Улуғбек тумани, Амир Темур кўчаси 1",
    galleryLabel: "Фотогалерея",
    galleryTitle: "Бизнинг лаҳзалар",
    rsvpLabel: "Тасдиқлаш",
    rsvpTitle: "Анкета",
    rsvpHint: "Илтимос, иштирокингизни тасдиқланг",
    fName: "Тўлиқ исм", fNamePh: "Исмингиз",
    fAttend: "Иштирок", fAttendChoose: "Танланг…",
    fAttendYes: "Ҳа, келаман", fAttendNo: "Келолмайман",
    fGuests: "Меҳмонлар сони",
    fComment: "Изоҳ", fCommentPh: "Тилакларингиз…",
    send: "Юбориш", sending: "Юборилмоқда…",
    ok: "💌 Раҳмат! Сизни кутамиз.",
    err: "Хатолик юз берди. Қайта уриниб кўринг.",
    deadline: "Жавоб — 10 Августгача",
    closingTranslation: "Ва У уларнинг қалбларини бирлаштирди",
    closingRef: "Ал-Анфол · 63",
    musicOn: "Мусиқани ёқиш", musicOff: "Мусиқани тўхтатиш",
  },
};

const LangCtx = createContext<Dict>(T.UZ);
const useT = () => useContext(LangCtx);

function WeddingPage() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lang, setLang] = useState<Lang>("UZ");
  const [adminOverlay, setAdminOverlay] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [adminDash, setAdminDash] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [visitsToday, setVisitsToday] = useState(0);
  const [visitsTotal, setVisitsTotal] = useState(0);
  const ytRef = useRef<HTMLIFrameElement | null>(null);
  const t = T[lang];

  // Visit counter (Supabase — shared across devices, tagged per invitation)
  useEffect(() => {
    if (sessionStorage.getItem("gv_counted")) return;
    sessionStorage.setItem("gv_counted", "1");
    supabase
      .from("invitation_visits")
      .insert({ invitation: INVITATION_KEY })
      .then(({ error }) => {
        if (error) console.error("[visits] insert error", error);
      });
  }, []);

  const fetchStats = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const [{ count: total }, { count: day }] = await Promise.all([
      supabase
        .from("invitation_visits")
        .select("*", { count: "exact", head: true })
        .eq("invitation", INVITATION_KEY),
      supabase
        .from("invitation_visits")
        .select("*", { count: "exact", head: true })
        .eq("invitation", INVITATION_KEY)
        .gte("created_at", `${today}T00:00:00Z`),
    ]);
    setVisitsTotal(total || 0);
    setVisitsToday(day || 0);
  };

  const loadRsvps = async () => {
    const { data, error } = await supabase
      .from("invitation_rsvp")
      .select("*")
      .eq("invitation", INVITATION_KEY)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[rsvp] load error", error);
      setRsvps([]);
      return;
    }
    setRsvps((data as RsvpRow[]) || []);
  };

  const tryAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setAdminOverlay(false);
      setAdminErr(false);
      loadRsvps();
      fetchStats();
      setAdminDash(true);
    } else {
      setAdminErr(true);
    }
  };

  const ytCommand = (func: "playVideo" | "pauseVideo" | "setVolume", args: unknown[] = []) => {
    ytRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  const handleOpen = () => {
    setOpened(true);
    ytCommand("setVolume", [40]);
    ytCommand("playVideo");
    setPlaying(true);
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const toggleMusic = () => {
    if (playing) {
      ytCommand("pauseVideo");
      setPlaying(false);
    } else {
      ytCommand("playVideo");
      setPlaying(true);
    }
  };

  return (
    <LangCtx.Provider value={t}>
      <main className="relative min-h-screen overflow-x-hidden">
        <iframe
          ref={ytRef}
          title="Background music"
          aria-hidden
          tabIndex={-1}
          src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          allow="autoplay; encrypted-media"
          className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px opacity-0"
        />
        <Petals />

        <a href={MAIN_SITE_URL} className="btn-back" title="WebInvite bosh sahifasi">
          <ArrowLeft className="h-4 w-4" /> WebInvite.uz
        </a>

        {opened && <LangSwitcher lang={lang} setLang={setLang} />}

        {opened && (
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={playing ? t.musicOff : t.musicOn}
            className={`fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] text-mocha shadow-[var(--shadow-gold)] transition hover:scale-105 ${playing ? "animate-[spin_6s_linear_infinite]" : ""}`}
          >
            <Music className="h-5 w-5" />
          </button>
        )}

        {/* INTRO */}
        <section
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
            opened ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(40,25,15,0.55), rgba(40,25,15,0.65)), url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center gap-10 px-6 text-center text-cream animate-fade-up">
            <p className="text-sm uppercase tracking-[0.5em] text-gold-light/90">{t.introTag}</p>
            <h1 className="font-serif text-5xl italic text-cream sm:text-6xl">Jasur &amp; Nilufar</h1>
            <button
              type="button"
              onClick={handleOpen}
              className="group relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] text-mocha animate-glow"
            >
              <Heart className="h-14 w-14 fill-mocha/90 stroke-mocha animate-heartbeat" />
            </button>
            <p className="max-w-xs font-serif text-lg italic text-cream/95">{t.introCta}</p>
          </div>
        </section>

        <Hero />
        <Invitation />
        <Schedule />
        <CalendarSection />
        <Location />
        <Gallery />
        <Rsvp />
        <Closing />

        <button
          type="button"
          className="admin-key"
          style={{ position: "fixed", bottom: 8, left: 8, zIndex: 50 }}
          title="Admin"
          onClick={() => {
            setAdminOverlay(true);
            setAdminPass("");
            setAdminErr(false);
          }}
        >
          <Lock className="h-4 w-4" />
        </button>

        {adminOverlay && (
          <div
            className="admin-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) setAdminOverlay(false);
            }}
          >
            <div className="admin-box">
              <h3>Admin kirish</h3>
              <p>Bu bo'lim faqat sayt egasi uchun.</p>
              <input
                type="password"
                placeholder="Parol"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryAdminLogin()}
                autoFocus
              />
              {adminErr && <p className="admin-err">Parol noto'g'ri.</p>}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="btn-back"
                  style={{ position: "static", flex: 1, justifyContent: "center" }}
                  onClick={tryAdminLogin}
                >
                  Kirish
                </button>
                <button
                  type="button"
                  className="btn-back"
                  style={{ position: "static", flex: 1, justifyContent: "center", opacity: 0.7 }}
                  onClick={() => setAdminOverlay(false)}
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        )}

        {adminDash && (
          <div className="admin-dash">
            <div className="admin-dash-inner">
              <div className="admin-dash-head">
                <h2>Golden Vows · Admin</h2>
                <button
                  type="button"
                  className="btn-back"
                  style={{ position: "static" }}
                  onClick={() => setAdminDash(false)}
                >
                  Chiqish
                </button>
              </div>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <b>{visitsToday}</b>
                  <span>Bugun saytga kirganlar</span>
                </div>
                <div className="admin-stat-card">
                  <b>{visitsTotal}</b>
                  <span>Jami tashriflar</span>
                </div>
                <div className="admin-stat-card">
                  <b>{rsvps.length}</b>
                  <span>Jami RSVP javoblari</span>
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 19, marginBottom: 14, color: "var(--mocha)" }}>
                RSVP javoblari
              </h3>
              {rsvps.length === 0 ? (
                <p className="admin-note">Hozircha javob yo'q.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sana</th>
                      <th>Ism</th>
                      <th>Ishtirok</th>
                      <th>Mehmonlar</th>
                      <th>Izoh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps
                      .slice()
                      .reverse()
                      .map((r, i) => (
                        <tr key={i}>
                          <td>{new Date(r.created_at).toLocaleDateString("uz-UZ")}</td>
                          <td>{r.name}</td>
                          <td>{r.attendance}</td>
                          <td>{r.guests}</td>
                          <td>{r.comment}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </LangCtx.Provider>
  );
}

function Hero() {
  const t = useT();
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const cells = [
    { label: t.cdDays, value: days },
    { label: t.cdHours, value: hours },
    { label: t.cdMin, value: minutes },
    { label: t.cdSec, value: seconds },
  ];
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 text-center"
      style={{ background: "var(--gradient-cream)" }}
    >
      <img
        src={floralFrame}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-90 mix-blend-multiply"
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.6em] text-gold sm:text-xs">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-6 font-serif text-6xl leading-[1.05] text-mocha sm:text-7xl md:text-8xl">
            <span className="text-gold-gradient italic">Jasur</span>
            <span className="mx-2 text-mocha/60 italic">{t.amp}</span>
            <br className="sm:hidden" />
            <span className="text-gold-gradient italic">Nilufar</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 text-xl tracking-[0.4em] text-mocha/70 sm:text-2xl">09 · 09 · 2026</p>
        </Reveal>
        <Reveal delay={450}>
          <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
            {cells.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-gold/25 bg-card/70 px-3 py-5 shadow-[var(--shadow-soft)] backdrop-blur-sm"
              >
                <div className="font-serif text-4xl font-semibold tabular-nums text-mocha sm:text-5xl">
                  {String(c.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-mocha/55 sm:text-xs">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={650}>
          <a
            href="#taklifnoma"
            aria-label="scroll"
            className="mt-12 inline-grid h-10 w-10 place-items-center rounded-full text-gold animate-[heartbeat_2s_ease-in-out_infinite]"
          >
            <ChevronDown className="h-7 w-7" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Invitation() {
  const t = useT();
  return (
    <section id="taklifnoma" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-4xl text-gold sm:text-5xl">{t.invitationTitle}</h2>
          <div className="mt-4 text-gold">✦</div>
          <p className="mt-8 font-serif text-2xl italic text-mocha sm:text-3xl">
            {t.invitationGreeting}
          </p>
          <p className="mt-6 font-serif text-lg italic leading-relaxed text-mocha/80 sm:text-xl">
            {t.invitationBody}
          </p>
          <p className="mt-8 font-serif text-base italic text-gold">{t.invitationSign}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Schedule() {
  const t = useT();
  return (
    <section className="bg-[color:var(--cream)] px-6 py-24">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <h2 className="font-serif text-4xl text-gold sm:text-5xl">{t.scheduleTitle}</h2>
          <div className="mt-4 text-gold">✦</div>
        </Reveal>
        <div className="relative mt-14 pl-10 sm:pl-14">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent sm:left-5" />
          <ul className="space-y-10">
            {t.schedule.map((it, i) => (
              <Reveal as="li" key={it.time} delay={i * 100}>
                <div className="relative">
                  <span className="absolute -left-[34px] top-2 grid h-3 w-3 place-items-center rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_15%,transparent)] sm:-left-[42px]" />
                  <p className="font-serif text-lg tracking-widest text-gold sm:text-xl">{it.time}</p>
                  <h3 className="mt-2 font-serif text-2xl text-mocha sm:text-3xl">{it.title}</h3>
                  <p className="mt-1 text-sm italic text-mocha/60 sm:text-base">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CalendarSection() {
  const t = useT();
  const firstDayOffset = 1;
  const daysInMonth = 30;
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">{t.dateLabel}</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">{t.monthYear}</h2>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-12 rounded-2xl border border-gold/30 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="grid grid-cols-7 gap-2 text-xs uppercase tracking-widest text-mocha/55">
              {t.weekdays.map((d, i) => (
                <div key={i} className="py-2">{d}</div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {cells.map((d, i) => {
                const isWedding = d === 9;
                return (
                  <div
                    key={i}
                    className={`relative grid aspect-square place-items-center rounded-full font-serif text-base sm:text-lg ${
                      d == null
                        ? ""
                        : isWedding
                          ? "bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] font-semibold text-mocha shadow-[var(--shadow-gold)]"
                          : "text-mocha/75 hover:bg-secondary/60"
                    }`}
                  >
                    {d ?? ""}
                    {isWedding && <Heart className="absolute -top-1 right-0 h-3 w-3 fill-mocha text-mocha" />}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Location() {
  const t = useT();
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.address)}`;
  const ymaps = `https://yandex.com/maps/?text=${encodeURIComponent(t.address)}`;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(t.address)}&output=embed`;
  return (
    <section className="bg-[color:var(--cream)] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">{t.locationLabel}</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">{t.hallTitle}</h2>
          <p className="mt-4 font-serif text-2xl italic text-gold">{t.hallName}</p>
          <p className="mt-2 text-mocha/70">{t.address}</p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/30 shadow-[var(--shadow-soft)]">
            <iframe
              title="Map"
              src={embed}
              className="h-72 w-full sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={gmaps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card px-6 py-3 text-mocha transition hover:bg-secondary"
            >
              <MapPin className="h-4 w-4" /> Google Maps
            </a>
            <a
              href={ymaps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] px-6 py-3 text-mocha shadow-[var(--shadow-gold)] transition hover:brightness-105"
            >
              <MapPin className="h-4 w-4" /> Yandex Maps
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const t = useT();
  const photos = [g1, g3, g2, g6, g4, g5];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">{t.galleryLabel}</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">{t.galleryTitle}</h2>
        </Reveal>
        <div className="mt-12 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {photos.map((src, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="overflow-hidden rounded-xl border border-gold/20 shadow-[var(--shadow-soft)]">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rsvp() {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      attendance: String(fd.get("attendance") ?? ""),
      guests: Number(fd.get("guests") ?? 1),
      comment: String(fd.get("comment") ?? ""),
    };
    setStatus("sending");
    const { error } = await supabase
      .from("invitation_rsvp")
      .insert({ invitation: INVITATION_KEY, ...payload });
    if (!error) {
      setStatus("ok");
      form.reset();
    } else {
      console.error("[rsvp] insert error", error);
      setStatus("err");
    }
  };

  return (
    <section className="bg-[color:var(--cream)] px-6 py-24">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">{t.rsvpLabel}</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">{t.rsvpTitle}</h2>
          <p className="mt-4 text-mocha/70">{t.rsvpHint}</p>
        </Reveal>
        <Reveal delay={150}>
          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-gold/30 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <Field label={t.fName}>
              <input
                required
                name="name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
                placeholder={t.fNamePh}
              />
            </Field>
            <Field label={t.fAttend}>
              <select
                required
                name="attendance"
                defaultValue=""
                className="w-full rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
              >
                <option value="" disabled>{t.fAttendChoose}</option>
                <option value={t.fAttendYes}>{t.fAttendYes}</option>
                <option value={t.fAttendNo}>{t.fAttendNo}</option>
              </select>
            </Field>
            <Field label={t.fGuests}>
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                name="guests"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
            </Field>
            <Field label={t.fComment}>
              <textarea
                name="comment"
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
                placeholder={t.fCommentPh}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] px-6 py-4 font-serif text-lg tracking-wider text-mocha shadow-[var(--shadow-gold)] transition hover:brightness-105 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === "sending" ? t.sending : t.send}
            </button>

            {status === "ok" && (
              <p className="text-center text-sm text-mocha/75">{t.ok}</p>
            )}
            {status === "err" && (
              <p className="text-center text-sm text-destructive">{t.err}</p>
            )}
          </form>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex items-center justify-center gap-2 text-mocha/60">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm tracking-widest uppercase">{t.deadline}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-mocha/60">{label}</span>
      {children}
    </label>
  );
}

function Closing() {
  const t = useT();
  return (
    <section
      className="relative px-6 py-32 text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(245,235,220,0.85), rgba(245,235,220,0.95)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p
            className="text-gold-gradient text-5xl leading-tight sm:text-6xl"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: "'Amiri','Cormorant Garamond',serif" }}
          >
            وَأَلَّفَ بَيْنَ قُلُوبِهِمْ
          </p>
          <p className="mt-8 font-serif text-2xl italic text-mocha sm:text-3xl">
            {t.closingTranslation}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.4em] text-mocha/60">
            {t.closingRef}
          </p>
          <div className="mt-12 flex justify-center">
            <Heart className="h-8 w-8 fill-gold text-gold animate-heartbeat" />
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-mocha/60">
            Jasur &amp; Nilufar · 09.09.2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-gold/30 bg-card/85 px-1.5 py-1 shadow-[var(--shadow-soft)] backdrop-blur">
        {LANGS.map((l) => {
          const active = lang === l;
          return (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`grid h-8 min-w-8 place-items-center rounded-full px-3 text-xs font-medium tracking-widest transition ${
                active
                  ? "bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] text-mocha shadow-[var(--shadow-gold)]"
                  : "text-mocha/70 hover:text-mocha"
              }`}
              aria-pressed={active}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
