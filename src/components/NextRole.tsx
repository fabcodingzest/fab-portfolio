import styles from "./NextRole.module.css";

const ITEMS = [
  {
    title: "Roles",
    body: "Frontend roles with React and TypeScript, React Native and mobile roles, or full-stack roles that lean frontend, like my work at Boraami.",
  },
  {
    title: "Team",
    body: "A product team that ships to real users, where I can own features from the interface to the API and keep learning from people more experienced than me.",
  },
  {
    title: "Where",
    body: "Remote, or hybrid and on-site in Delhi NCR or Bangalore. I'm also open to roles abroad that offer visa sponsorship.",
  },
  {
    title: "How I work with AI",
    body: "I use AI tools like Claude Code every day to explore unfamiliar code, draft tests and reviews, and move faster, and I check everything they produce. Next, I'd like to work on a team that builds AI-powered features into real products, and learn that side properly.",
  },
];

export default function NextRole() {
  return (
    <section id="next" className="section" aria-labelledby="next-title">
      <div className="container">
        <p className="label">What I&rsquo;m looking for</p>
        <h2 id="next-title" className="h2">
          My next role
        </h2>
        <dl className={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.title} className={styles.item}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
