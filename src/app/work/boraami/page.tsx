import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import BoraamiWalkthrough from "@/components/BoraamiWalkthrough";
import StoreLinks from "@/components/StoreLinks";
import { DASHBOARD, LEAD, LEARNED, PROBLEM, ROLE, STACK, STATS, TEAM, TIMELINE } from "@/components/boraami";
import card from "@/components/CaseStudy.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Boraami case study · Fab, Frontend Engineer",
  description:
    "How I built Boraami, a social app for the BTS fan community, from its first commit to the App Store and Google Play: the feed, notifications, a gated community, trust and safety, and 99.7% crash-free users.",
};

export default function BoraamiPage() {
  return (
    <>
      <Nav />
      <main>
        <article className={`section ${styles.page}`} aria-labelledby="boraami-title">
          <div className="container">
            <Link href="/#work" className={styles.back} data-track="case_study_back" data-label="top">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" />
              </svg>
              Back to work
            </Link>

            {/* header: same facts as the home page card */}
            <header className={styles.header}>
              <p className={card.badge}>Case study · Live on both app stores</p>
              <h1 id="boraami-title" className={styles.title}>
                Boraami
              </h1>
              <p className={card.featuredLead}>{LEAD}</p>
              <dl className={card.stats}>
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className={card.since}>Since public launch on 15 June 2026</p>
              <div className={styles.stores}>
                <StoreLinks />
              </div>
            </header>

            {/* context: the problem, my part in it, and how long it took */}
            <section className={styles.context} aria-labelledby="context-title">
              <h2 id="context-title" className={styles.sectionTitle}>
                The problem
              </h2>
              <p className={styles.problem}>{PROBLEM}</p>

              <dl className={styles.facts}>
                <div>
                  <dt>My role</dt>
                  <dd>
                    <p>Co-founder, Frontend Lead</p>
                    <ul>
                      {ROLE.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{TEAM}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{STACK}</dd>
                </div>
              </dl>

              <ol className={styles.timeline} aria-label="Timeline">
                {TIMELINE.map((t) => (
                  <li key={t.date}>
                    <span className={styles.date}>{t.date}</span>
                    <span>{t.label}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.built} aria-labelledby="built-title">
              <h2 id="built-title" className={styles.sectionTitle}>
                What I built
              </h2>
              <p className={styles.builtLead}>Five features, each with what the app does and what makes it work behind the scenes.</p>
              <BoraamiWalkthrough />
            </section>

            {/* the moderators' side of the gated community and trust and safety steps */}
            <section className={styles.dashboard} aria-labelledby="dashboard-title">
              <p className={styles.kicker}>Also built</p>
              <h2 id="dashboard-title">The moderation dashboard</h2>
              <p>{DASHBOARD.body}</p>
              <ul className={styles.chips} aria-label="Dashboard stack">
                {DASHBOARD.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <section className={styles.learned} aria-labelledby="learned-title">
              <h2 id="learned-title" className={styles.learnedTitle}>
                What Boraami taught me
              </h2>
              <ul>
                {LEARNED.map((l) => (
                  <li key={l.title}>
                    <h3>{l.title}</h3>
                    <p>{l.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <nav className={styles.end} aria-label="Next">
              <Link href="/#work" className="button secondary" data-track="case_study_back" data-label="bottom">
                Back to all work
              </Link>
              <Link href="/#contact" className="button" data-track="case_study_contact">
                Get in touch
              </Link>
            </nav>
          </div>
        </article>
      </main>
    </>
  );
}
