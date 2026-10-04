"use client";

import { useEffect, useRef, useState } from "react";
import { siApple, siGoogleplay } from "simple-icons";
import Phone from "./Phone";
import Projects from "./Projects";
import { APP_STORE, PLAY_STORE } from "./Intro";
import styles from "./CaseStudy.module.css";

/*
  Each step pairs what the app does (frontend) with what makes it work (backend).
  Facts come from the Boraami feature docs and backend release notes.
*/
const STEPS = [
  {
    screen: { src: "/screens/boraline.png", alt: "Boraline, the Boraami timeline, with liked and reposted posts" },
    title: "Boraline: a feed that stays fast and consistent",
    plain: "The main feed scrolls smoothly, and a like or repost shows up instantly on every screen of the app.",
    frontend: "I tuned the timeline for long scrolling: memoized rows, a tuned render window, infinite scroll cached per feed tab, and smaller, cached images. Likes and reposts update instantly and roll back if the request fails, and a normalized post store means one tap updates every screen that shows that post.",
    backend: "The feed fetches every reposted or quoted original in one query instead of one per post, and a like race condition is fixed. Images upload straight from the app to Cloudflare R2 through short-lived pre-signed URLs, so image bytes never pass through our server.",
  },
  {
    screen: { src: "/screens/boraline-2.png", alt: "Timeline with an unread notification badge" },
    title: "Notifications that stay correct",
    plain: "Notifications arrive straight away, and the unread count stays right even after a weak or dropped connection.",
    frontend: "Live updates over Socket.IO, with REST reconciliation on reconnect and a periodic refetch so missed events can't leave the unread count wrong.",
    backend: "I rewrote the notification system: grouped by type, target and time window, an unread-count endpoint, push via Expo (FCM/APNs), and broadcasts streamed in batches over the socket.",
  },
  {
    screen: { src: "/screens/quiz.jpeg", alt: "Admission quiz question asking what year BTS debuted, with a countdown timer" },
    title: "A gated community, so fans can feel safe",
    plain: "ARMY is one of the biggest fandoms in the world, and big open platforms tend to fill up with spam, trolls and people who are there to stir things up. We wanted Boraami to feel like a calm, friendly space for genuine fans, so joining starts with a short quiz only a real fan would enjoy.",
    frontend: "Sign-up includes a timed quiz about BTS, one question at a time with a countdown, built into the app's onboarding.",
    backend: "Questions are sampled by category and scored automatically: clear cases are approved or rejected, borderline ones go to moderators, and invites and results go out by email. It has processed 2,400+ applications.",
  },
  {
    screen: { src: "/screens/profile.png", alt: "A member profile with its posts" },
    title: "Trust and safety the app stores require",
    plain: "Members can block and report others and moderators can suspend accounts, which the App Store and Google Play require for apps with user posts.",
    frontend: "Blocking, reporting, a profanity filter, a 13+ age gate, and clear states in the app when content comes from a suspended or blocked member.",
    backend: "A suspension system with banned usernames and time-limited suspensions. Blocked and suspended users are filtered out of every feed, search and notification. Account deletion runs in a transaction that also fixes reply, quote and repost counts on other people's posts.",
  },
  {
    screen: { src: "/screens/search.png", alt: "Search results with an image post" },
    title: "From about 95% to 99.7% crash-free users",
    plain: "The app now almost never crashes: 99.7% of users have a crash-free experience, up from about 95%.",
    frontend: "Fixed Android out-of-memory crashes on lower-end phones by virtualizing the GIF picker and serving smaller feed images, measured in Sentry.",
    backend: "Server and scheduled-job errors report to Sentry, email failures never block the action behind them, and every paginated endpoint caps page size so no request can scan the whole database.",
  },
];

// From Fab's own account, backed by the Boraami repos and docs (specs, review guides,
// device test scripts, release and credential runbooks).
const LEARNED = [
  {
    title: "Learning whatever the project needs",
    body: "Boraami is where I learned mobile development, building on my React web experience. When the backend needed someone, I learned Node.js and MongoDB on the job and took it over. In 2026 I also brought Claude Code into my workflow to move faster before launch.",
  },
  {
    title: "Taking things all the way to done",
    body: "Beyond features, I took care of what keeps an app alive: EAS builds and store reviews, moving the App Store listing to the company account, rotating credentials across services, and helping register the company.",
  },
  {
    title: "Bringing in process as we grew",
    body: "We started as a small team focused on shipping. As the app and team grew, I started writing a short spec and API contract before a feature, so teammates could build against mocks while I built the backend, plus review guides so everyone checks for the same things. I also help hire and review pull requests.",
  },
  {
    title: "Working across teams and time zones",
    body: "Our team spans several continents, so most of our collaboration is written. I work with designers, product and moderators, and write step-by-step device test scripts so teammates can verify a release on their own phones.",
  },
];

const STATS = [
  { value: "2,000+", label: "downloads" },
  { value: "99.7%", label: "crash-free users" },
  { value: "2,400+", label: "membership applications" },
];

export default function CaseStudy() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  // Motion 2 of 3: the last step whose top has crossed a trigger line picks the screen.
  // Desktop: the line is mid-viewport. Phones: the device is pinned at the top, so the
  // line sits halfway down the readable area under it. Only runs while the walkthrough is open.
  useEffect(() => {
    if (!open) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const desktop = window.matchMedia("(min-width: 960px)").matches;
      const phoneBottom = phoneRef.current?.getBoundingClientRect().bottom ?? 0;
      const line = desktop ? window.innerHeight * 0.5 : phoneBottom + (window.innerHeight - phoneBottom) * 0.5;
      let next = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  function toggle() {
    const next = !open;
    setOpen(next);
    // opening: move to the walkthrough; closing: back to the card so the reader isn't lost
    requestAnimationFrame(() => (next ? detailsRef.current : cardRef.current)?.scrollIntoView({ block: "start" }));
  }

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <p className="label">Work</p>
        <h2 id="work-title" className="h2">
          Things I&rsquo;ve built
        </h2>

        <article className={styles.featured} ref={cardRef} aria-labelledby="boraami-title">
          <div className={styles.featuredText}>
            <p className={styles.badge}>Featured · Live on both app stores</p>
            <h3 id="boraami-title" className={styles.featuredTitle}>
              Boraami
            </h3>
            <p className={styles.featuredLead}>
              A social app for the BTS fan community, where members post, reply and follow each other. I co-founded it
              and lead the app: I set it up from the first line of code, led a team of 4 developers, and run its backend.
            </p>
            <dl className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.since}>Since public launch on 15 June 2026</p>
            <p className={styles.metaLine}>
              <span>Co-founder, Frontend Lead</span>
              <span>Nov 2022 – present</span>
              <span>React Native, Expo, Node.js, MongoDB</span>
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="boraami-details"
                data-track="case_study_toggle"
                data-label={open ? "close" : "open"}
              >
                {open ? "Close the case study" : "Read the case study"}
                <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <p className={styles.hint}>5 features, frontend and backend · about 3 min</p>
              <div className={styles.stores}>
                <a className={`${styles.store} press`} href={APP_STORE} data-track="store_click" data-label="app_store" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={siApple.path} />
                  </svg>
                  App Store
                </a>
                <a className={`${styles.store} press`} href={PLAY_STORE} data-track="store_click" data-label="google_play" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={siGoogleplay.path} />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>
          <div className={styles.featuredPhone}>
            <Phone sizes="(min-width: 960px) 240px, 50vw" screens={[STEPS[0].screen]} />
          </div>
        </article>

        <div id="boraami-details" ref={detailsRef} className={styles.details} hidden={!open}>
          {open && (
            <>
              <div className={styles.stage}>
                <div className={styles.phoneWrap} ref={phoneRef}>
                  <Phone className={styles.phone} sizes="(min-width: 960px) 300px, 42vw" screens={STEPS.map((s) => s.screen)} active={active} />
                </div>
                <ol className={styles.steps}>
                  {STEPS.map((s, i) => (
                    <li
                      key={s.title}
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      data-index={i}
                      data-active={i === active}
                      className={styles.step}
                    >
                      {/* phones: each step shows its own screenshot instead of a pinned phone */}
                      <div className={styles.stepPhone}>
                        <Phone sizes="56vw" screens={[s.screen]} />
                      </div>
                      <h4>{s.title}</h4>
                      <p className={styles.plain}>{s.plain}</p>
                      <dl className={styles.split}>
                        <div>
                          <dt>Frontend</dt>
                          <dd>{s.frontend}</dd>
                        </div>
                        <div>
                          <dt>Backend</dt>
                          <dd>{s.backend}</dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.learned}>
                <h4 className={styles.learnedTitle}>What Boraami taught me</h4>
                <ul>
                  {LEARNED.map((l) => (
                    <li key={l.title}>
                      <h5>{l.title}</h5>
                      <p>{l.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <Projects />
      </div>
    </section>
  );
}
