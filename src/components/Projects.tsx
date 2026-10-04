import Image from "next/image";
import styles from "./Projects.module.css";

/*
  Projects list. Add more entries here; mark unfinished ones with wip: true.
  github and demo links open in a new tab.
*/
type Project = {
  name: string;
  summary: string;
  tech: string[];
  github?: string;
  demo?: string;
  wip?: boolean;
  /** screenshot in public/projects, 1847 x 851 */
  image?: { src: string; alt: string };
};

const PROJECTS: Project[] = [
  {
    name: "React Movie Library",
    summary:
      "Movie discovery app with search, categories and recommendations using the TMDB API. State managed with Context API and useReducer.",
    tech: ["React", "Tailwind CSS", "TMDB API"],
    github: "https://github.com/fabcodingzest/React-Movie-Library",
    demo: "https://movielibriz.netlify.app",
    image: { src: "/projects/movie-library.png", alt: "React Movie Library showing popular movies with genre navigation" },
  },
  {
    name: "TradeByte",
    summary:
      "Second-highest contributor in the GirlScript Uplift open-source program, in a team of 6. Built Google OAuth, user profiles, dashboards, email notifications and Razorpay payments.",
    tech: ["Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/fabcodingzest/TradeByte",
    demo: "https://tradebyte.onrender.com",
    image: { src: "/projects/tradebyte.png", alt: "TradeByte landing page with its trending stocks dashboard" },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <h2 id="projects-title" className="label">
          Selected projects
        </h2>
        <ol className={styles.list}>
          {PROJECTS.map((p, i) => (
            <li key={p.name} className={styles.item}>
              {p.image && (
                <a
                  className={styles.shot}
                  href={p.demo ?? p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image src={p.image.src} alt="" width={1847} height={851} sizes="(min-width: 900px) 560px, 100vw" />
                </a>
              )}
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}.</span>
              <div className={styles.text}>
                <h3>
                  <span className={styles.name}>{p.name}</span>
                  {p.wip && <span className={styles.wip}>In progress</span>}
                </h3>
                <p className={styles.summary}>{p.summary}</p>
                <p className={styles.tech}>{p.tech.join(", ")}</p>
                {(p.github || p.demo) && (
                  <p className={styles.links}>
                    {p.demo && (
                      <a className="link" href={p.demo} target="_blank" rel="noopener noreferrer" data-track="project_demo" data-label={p.name}>
                        Live demo<span className="visually-hidden"> of {p.name} (opens in a new tab)</span>
                      </a>
                    )}
                    {p.github && (
                      <a className="link" href={p.github} target="_blank" rel="noopener noreferrer" data-track="project_github" data-label={p.name}>
                        GitHub<span className="visually-hidden"> repository for {p.name} (opens in a new tab)</span>
                      </a>
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
