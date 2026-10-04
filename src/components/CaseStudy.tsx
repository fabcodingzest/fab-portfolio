"use client";

import { useEffect, useRef, useState } from "react";
import Phone from "./Phone";
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
    frontend: "I tuned the timeline for long scrolling: memoized rows, a tuned render window, infinite scroll cached per feed tab, and smaller, cached images. Likes and reposts update instantly and roll back if the request fails, and a normalized post store means one tap updates every screen that shows that post.",
    backend: "The feed fetches every reposted or quoted original in one query instead of one per post, and a like race condition is fixed. Images upload straight from the app to Cloudflare R2 through short-lived pre-signed URLs, so image bytes never pass through our server.",
  },
  {
    screen: { src: "/screens/boraline-2.png", alt: "Timeline with an unread notification badge" },
    title: "Notifications that stay correct",
    frontend: "Live updates over Socket.IO, with REST reconciliation on reconnect and a periodic refetch so missed events can't leave the unread count wrong.",
    backend: "I rewrote the notification system: grouped by type, target and time window, an unread-count endpoint, push via Expo (FCM/APNs), and broadcasts streamed in batches over the socket.",
  },
  {
    screen: { src: "/screens/quiz.jpeg", alt: "Admission quiz question asking what year BTS debuted, with a countdown timer" },
    title: "A gated community, so fans can feel safe",
    why: "ARMY is one of the biggest fandoms in the world, and big open platforms tend to fill up with spam, trolls and people who are there to stir things up. We wanted Boraami to feel like a calm, friendly space for genuine fans, so joining starts with a short quiz only a real fan would enjoy.",
    frontend: "Sign-up includes a timed quiz about BTS, one question at a time with a countdown, built into the app's onboarding.",
    backend: "Questions are sampled by category and scored automatically: clear cases are approved or rejected, borderline ones go to moderators, and invites and results go out by email. It has processed 2,400+ applications.",
  },
  {
    screen: { src: "/screens/profile.png", alt: "A member profile with its posts" },
    title: "Trust and safety the app stores require",
    frontend: "Blocking, reporting, a profanity filter, a 13+ age gate, and clear states in the app when content comes from a suspended or blocked member.",
    backend: "A suspension system with banned usernames and time-limited suspensions. Blocked and suspended users are filtered out of every feed, search and notification. Account deletion runs in a transaction that also fixes reply, quote and repost counts on other people's posts.",
  },
  {
    screen: { src: "/screens/search.png", alt: "Search results with an image post" },
    title: "From about 95% to 99.7% crash-free users",
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

export default function CaseStudy() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const phoneRef = useRef<HTMLDivElement | null>(null);

  // Motion 2 of 3: the last step whose top has crossed a trigger line picks the screen.
  // Desktop: the line is mid-viewport. Phones: the device is pinned at the top, so the
  // line sits just below it (measured live), where the text is actually being read.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const desktop = window.matchMedia("(min-width: 960px)").matches;
      const phoneBottom = phoneRef.current?.getBoundingClientRect().bottom ?? 0;
      // phones: halfway down the readable area under the pinned device
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
  }, []);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <p className="label">Selected work</p>
        <h2 id="work-title" className="h2">
          Boraami
        </h2>
        <p className="intro-text">
          A community-driven social app for the BTS fan community, live on the{" "}
          <a className="link" href={APP_STORE}>
            App Store
          </a>{" "}
          and{" "}
          <a className="link" href={PLAY_STORE}>
            Google Play
          </a>
          . I&rsquo;ve been on the founding team since November 2022 and have led the mobile app since its first commit
          in January 2024.
        </p>
        <dl className={styles.meta}>
          <div>
            <dt>Role</dt>
            <dd>Co-founder, Frontend Lead (React Native)</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>4 frontend developers, remote and international</dd>
          </div>
          <div>
            <dt>So far</dt>
            <dd>2,000+ downloads, 1,700+ registered users, about 350 monthly active users, 99.7% crash-free users</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>React Native, Expo, Tamagui, Redux Toolkit, Socket.IO, Node.js</dd>
          </div>
        </dl>

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
                <h3>{s.title}</h3>
                {"why" in s && <p className={styles.why}>{s.why}</p>}
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
          <h3 className={styles.learnedTitle}>What Boraami taught me</h3>
          <ul>
            {LEARNED.map((l) => (
              <li key={l.title}>
                <h4>{l.title}</h4>
                <p>{l.body}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
