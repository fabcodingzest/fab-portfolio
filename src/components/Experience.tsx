import styles from "./Experience.module.css";

type Group = { heading?: string; points: string[] };
type Job = { company: string; role: string; dates: string; place: string; summary?: string; groups: Group[] };

/*
  Boraami facts come from the Boraami repos and docs in ~/Documents/Boraami.
  Commit shares are non-merge commits across all branches (Oct 2026):
  app ~74%, admin dashboard 100%, backend ~85% since June 2025 (none before).
*/
const JOBS: Job[] = [
  {
    company: "Boraami LLC",
    role: "Co-founder, Frontend Lead",
    dates: "Nov 2022 – Present",
    place: "Remote, international team",
    summary:
      "Founding team from Nov 2022 (product concept, design direction, team coordination), and frontend lead since Jan 2024, when the codebase started. The case study above has the details.",
    groups: [
      {
        points: [
          "Set up the React Native app (Expo, Tamagui), wrote about three quarters of its commits, and ship it to the App Store and Google Play with EAS.",
          "Main backend developer since mid-2025 (Node.js, Express, MongoDB): moderation, notifications, the admission quiz and image uploads.",
          "Built the React admin dashboard (TypeScript, Vite, shadcn/ui, Cloudflare Workers) that moderators use to review applicants, reports and users.",
          "Lead a team of 4 frontend developers across time zones: hiring, code reviews, a shared component library with light and dark themes, and, more recently, specs and API contracts.",
          "Helped run the organisation beyond code: company registration, store accounts and the App Store transfer.",
        ],
      },
    ],
  },
  {
    company: "Wayfareoworld Advent Pvt Ltd",
    role: "Frontend Developer (Contract)",
    dates: "Dec 2021 – May 2022",
    place: "Delhi, India",
    groups: [
      {
        points: [
          "Built responsive web apps for a healthcare platform: patient portal, appointment booking and payment workflows integrated with third-party APIs.",
          "Managed state with Redux and integrated REST APIs in an agile team with design and backend developers.",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="label">
          My experience
        </h2>
        <ol className={styles.list}>
          {JOBS.map((j) => (
            <li key={j.company} className={styles.job}>
              <p className={styles.company}>{j.company}</p>
              <h3 className={styles.role}>{j.role}</h3>
              <p className={styles.when}>
                {j.dates}, {j.place}
              </p>
              {j.summary && <p className={styles.summary}>{j.summary}</p>}
              <div className={styles.groups}>
                {j.groups.map((g, i) => (
                  <div key={g.heading ?? i} className={styles.group}>
                    {g.heading && <h4>{g.heading}</h4>}
                    <ul>
                      {g.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
