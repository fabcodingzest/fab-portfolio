import Link from "next/link";
import Phone from "./Phone";
import Projects from "./Projects";
import StoreLinks from "./StoreLinks";
import { LEAD, STATS, STEPS } from "./boraami";
import styles from "./CaseStudy.module.css";

/* Home page Work section: the Boraami card (the full case study lives at /work/boraami), then other projects. */
export default function CaseStudy() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <p className="label">Work</p>
        <h2 id="work-title" className="h2">
          Things I&rsquo;ve built
        </h2>

        <article className={styles.featured} aria-labelledby="boraami-title">
          <div className={styles.featuredText}>
            <p className={styles.badge}>Featured · Live on both app stores</p>
            <h3 id="boraami-title" className={styles.featuredTitle}>
              Boraami
            </h3>
            <p className={styles.featuredLead}>{LEAD}</p>
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
              <Link href="/work/boraami" className="button" data-track="case_study_open">
                Read the case study
                <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
              <p className={styles.hint}>5 features, frontend and backend · about 4 min</p>
              <StoreLinks />
            </div>
          </div>
          <div className={styles.featuredPhone}>
            <Phone sizes="(min-width: 960px) 240px, 50vw" screens={[STEPS[0].screen]} />
          </div>
        </article>

        <Projects />
      </div>
    </section>
  );
}
