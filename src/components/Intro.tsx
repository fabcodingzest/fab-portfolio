import HeroBackground from "./HeroBackground";
import HeroVisual from "./HeroVisual";
import styles from "./Intro.module.css";

export const APP_STORE = "https://apps.apple.com/in/app/boraami/id6749337745";
export const PLAY_STORE = "https://play.google.com/store/apps/details?id=app.boraami.mobile";

const BRING = [
  {
    title: "Ship end to end",
    body: "Web, mobile and backend. I took Boraami from its first commit to both app stores, and built its admin dashboard and much of its backend along the way.",
  },
  {
    title: "Own what others skip",
    body: "Releases, store reviews, crash fixes and security housekeeping: the unglamorous work that keeps an app running for real people.",
  },
  {
    title: "Make teams faster",
    body: "Code reviews, test scripts and, as the team grew, short specs and API contracts, so teammates can work in parallel instead of waiting on me.",
  },
];

export default function Intro() {
  return (
    <>
      <header id="top" className={styles.hero}>
        <HeroBackground />
        <div className={`container ${styles.grid}`}>
          <div>
            <h1 className={styles.title}>
              <span className={styles.mask}>
                <span className={`${styles.word} ${styles.accent}`}>Frontend</span>
              </span>
              <span className={styles.mask}>
                <span className={styles.word}>Engineer</span>
              </span>
            </h1>
            <p className={styles.lead}>
              I&rsquo;m <strong>Fabeha</strong>, a frontend engineer in Delhi. I build web and cross-platform mobile apps
              with React and React Native. Most recently I co-founded{" "}
              <a className="link" href="#work">
                Boraami
              </a>
              , a social app for the BTS fan community, and lead its app with a small remote team.
            </p>
            <div className={styles.actions}>
              <a className="button" href="#contact">
                Let&rsquo;s talk
              </a>
              <p className={styles.status}>Open to full-time roles</p>
            </div>
          </div>

          <div className={styles.device}>
            <HeroVisual />
          </div>
        </div>
      </header>

      <section id="about" className="section" aria-labelledby="about-title">
        <div className="container">
          <h2 id="about-title" className="label">
            What I bring
          </h2>
          <ul className={styles.bring}>
            {BRING.map((b) => (
              <li key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
          <div className={styles.about}>
            <p className={styles.aboutName}>This is me.</p>
            <div className={styles.aboutText}>
              <p>
                Frontend engineer with 3+ years of experience, starting in React on the web and moving into React
                Native. At Boraami, which I co-founded, I lead the frontend with a small international team, working on the mobile app, the admin dashboard and, more recently, the Node.js
                backend.
              </p>
              <p>Before that, I built React web apps for a healthcare platform.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
