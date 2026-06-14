import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Heart, Pause, Play, MapPin, Calendar as CalendarIcon, Send } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
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
      { name: "description", content: "Bizning to'yimizga taklif etamiz — 15 Avgust 2025" },
    ],
  }),
  component: WeddingPage,
});

const WEDDING_DATE = new Date("2026-09-09T18:00:00+05:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
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

function WeddingPage() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
      />
      <Petals />

      {/* Music toggle */}
      {opened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
          className="fixed right-4 top-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-card/80 text-lg text-mocha shadow-[var(--shadow-soft)] backdrop-blur transition hover:scale-105"
        >
          <span aria-hidden>{playing ? "⏸" : "🎵"}</span>
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
          <p className="text-sm uppercase tracking-[0.5em] text-gold-light/90">Taklifnoma</p>
          <h1 className="font-serif text-5xl italic text-cream sm:text-6xl">Jasur &amp; Nilufar</h1>
          <button
            type="button"
            onClick={handleOpen}
            className="group relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] text-mocha animate-glow"
          >
            <Heart className="h-14 w-14 fill-mocha/90 stroke-mocha animate-heartbeat" />
          </button>
          <p className="max-w-xs font-serif text-lg italic text-cream/95">
            Yurakchani bosib taklifnomani oching
          </p>
        </div>
      </section>

      {/* HERO */}
      <Hero />

      {/* INVITATION */}
      <Invitation />

      {/* SCHEDULE */}
      <Schedule />

      {/* CALENDAR */}
      <CalendarSection />

      {/* LOCATION */}
      <Location />

      {/* GALLERY */}
      <Gallery />

      {/* RSVP */}
      <Rsvp />

      {/* CLOSING */}
      <Closing />
    </main>
  );
}

function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const cells = [
    { label: "Kun", value: days },
    { label: "Soat", value: hours },
    { label: "Daqiqa", value: minutes },
    { label: "Soniya", value: seconds },
  ];
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 py-24 text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(245,235,220,0.7), rgba(245,235,220,0.85)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">To'y Taklifnomasi</span>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-8 font-serif text-6xl italic leading-none text-mocha sm:text-7xl md:text-8xl">
            Jasur
            <span className="mx-3 text-gold-gradient">&amp;</span>
            Nilufar
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-8 text-2xl tracking-[0.3em] text-mocha/70">09 · 09 · 2026</p>
          <p className="mt-2 text-sm uppercase tracking-[0.4em] text-mocha/60">9 Sentyabr 2026 · Chorshanba</p>
        </Reveal>
        <Reveal delay={450}>
          <div className="mx-auto mt-12 grid max-w-xl grid-cols-4 gap-3 sm:gap-6">
            {cells.map((c) => (
              <div
                key={c.label}
                className="rounded-lg border border-gold/30 bg-card/80 px-2 py-4 shadow-[var(--shadow-soft)] backdrop-blur"
              >
                <div className="text-gold-gradient text-3xl font-semibold tabular-nums sm:text-5xl">
                  {String(c.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-mocha/60 sm:text-xs">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Taklifnoma</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">
            Aziz mehmonlar
          </h2>
          <p className="mt-8 font-serif text-xl leading-relaxed text-mocha/80 sm:text-2xl">
            Sizni hayotimizdagi eng baxtli kun — nikoh to'yimizga taklif etamiz.
            Bizning baxtimizga sherik bo'lishingizdan mamnun bo'lamiz.
          </p>
          <p className="mt-10 font-serif text-lg italic text-gold">
            — Jasur va Nilufar
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Schedule() {
  const items = [
    { time: "19:00", title: "Mehmonlar yig'ilishi", desc: "Salomlashuv va xush kelibsiz koktyeli" },
    { time: "19:30", title: "Rasmiy qism", desc: "Nikoh marosimi va tabriklar" },
    { time: "20:00", title: "Asosiy dastur", desc: "Ziyofat, raqs va musiqa" },
    { time: "22:00", title: "Kechaning yakuni", desc: "Yodgorlik fotosessiya" },
  ];
  return (
    <section className="bg-[color:var(--cream)] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Kun Dasturi</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">Marosim tartibi</h2>
        </Reveal>
        <div className="mt-14 grid gap-6">
          {items.map((it, i) => (
            <Reveal key={it.time} delay={i * 100}>
              <div className="grid grid-cols-[auto_1fr] items-center gap-6 rounded-2xl border border-gold/25 bg-card px-6 py-5 shadow-[var(--shadow-soft)]">
                <div className="text-gold-gradient font-serif text-3xl font-semibold tabular-nums sm:text-4xl">
                  {it.time}
                </div>
                <div className="border-l border-gold/30 pl-6">
                  <h3 className="font-serif text-xl text-mocha sm:text-2xl">{it.title}</h3>
                  <p className="mt-1 text-sm text-mocha/65 sm:text-base">{it.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalendarSection() {
  // September 2026 — 1st is Tuesday (Mon=0 -> offset 1)
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
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Sana</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">Sentyabr 2026</h2>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-12 rounded-2xl border border-gold/30 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="grid grid-cols-7 gap-2 text-xs uppercase tracking-widest text-mocha/55">
              {["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"].map((d) => (
                <div key={d} className="py-2">{d}</div>
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
  const address = "Toshkent sh., Mirzo Ulug'bek tumani, Amir Temur ko'chasi 1";
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const ymaps = `https://yandex.com/maps/?text=${encodeURIComponent(address)}`;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <section className="bg-[color:var(--cream)] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Manzil</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">Bayram zali</h2>
          <p className="mt-4 font-serif text-2xl italic text-gold">«Royal Palace»</p>
          <p className="mt-2 text-mocha/70">{address}</p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/30 shadow-[var(--shadow-soft)]">
            <iframe
              title="Joylashuv"
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
  const photos = [g1, g3, g2, g6, g4, g5];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Fotogalereya</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">Bizning lahzalar</h2>
        </Reveal>
        <div className="mt-12 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {photos.map((src, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="overflow-hidden rounded-xl border border-gold/20 shadow-[var(--shadow-soft)]">
                <img
                  src={src}
                  alt={`Lahza ${i + 1}`}
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
    try {
      const res = await fetch("https://formspree.io/f/xpqekqwr", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else setStatus("err");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="bg-[color:var(--cream)] px-6 py-24">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <span className="divider-gold text-xs uppercase tracking-[0.4em]">Tasdiqlash</span>
          <h2 className="mt-6 font-serif text-4xl italic text-mocha sm:text-5xl">Anketa</h2>
          <p className="mt-4 text-mocha/70">Iltimos, ishtirokingizni tasdiqlang</p>
        </Reveal>
        <Reveal delay={150}>
          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-gold/30 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <Field label="To'liq ism">
              <input
                required
                name="name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
                placeholder="Ismingiz"
              />
            </Field>
            <Field label="Ishtirok">
              <select
                required
                name="attendance"
                defaultValue=""
                className="w-full rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
              >
                <option value="" disabled>Tanlang…</option>
                <option value="Ha, kelaman">Ha, kelaman</option>
                <option value="Kelolmayman">Kelolmayman</option>
              </select>
            </Field>
            <Field label="Mehmonlar soni">
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                name="guests"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
            </Field>
            <Field label="Izoh">
              <textarea
                name="comment"
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
                placeholder="Tilaklaringiz…"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[color:var(--gold-light)] to-[color:var(--gold)] px-6 py-4 font-serif text-lg tracking-wider text-mocha shadow-[var(--shadow-gold)] transition hover:brightness-105 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {status === "sending" ? "Yuborilmoqda…" : "Yuborish"}
            </button>

            {status === "ok" && (
              <p className="text-center text-sm text-mocha/75">Rahmat! Javobingiz qabul qilindi 💛</p>
            )}
            {status === "err" && (
              <p className="text-center text-sm text-destructive">Xatolik yuz berdi. Qayta urinib ko'ring.</p>
            )}
          </form>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex items-center justify-center gap-2 text-mocha/60">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm tracking-widest uppercase">Javob — 10 Avgustgacha</span>
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
            Va U ularning qalblarini birlashtirdi
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.4em] text-mocha/60">
            Al-Anfol · 63
          </p>
          <div className="mt-12 flex justify-center">
            <Heart className="h-8 w-8 fill-gold text-gold animate-heartbeat" />
          </div>
          <p className="mt-10 font-serif text-xl italic text-mocha/75">
            Jasur &amp; Nilufar — 15.08.2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
