import {
  siAndroid,
  siApple,
  siAppstore,
  siCloudflareworkers,
  siExpo,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siGoogleplay,
  siJavascript,
  siMongodb,
  siMui,
  siNodedotjs,
  siReact,
  siRedux,
  siSentry,
  siShadcnui,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from "simple-icons";
import styles from "./Skills.module.css";

type Skill = { name: string; icon?: SimpleIcon };

const GROUPS: { name: string; items: Skill[] }[] = [
  {
    name: "Mobile",
    items: [
      { name: "React Native", icon: siReact },
      { name: "Expo", icon: siExpo },
      { name: "Expo Router", icon: siExpo },
      { name: "Tamagui" },
      { name: "EAS Build", icon: siExpo },
      { name: "iOS", icon: siApple },
      { name: "Android", icon: siAndroid },
      { name: "App Store", icon: siAppstore },
      { name: "Google Play", icon: siGoogleplay },
      { name: "FCM", icon: siFirebase },
      { name: "APNs", icon: siApple },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
      { name: "React", icon: siReact },
      { name: "Redux Toolkit", icon: siRedux },
      { name: "RTK Query", icon: siRedux },
      { name: "Vite", icon: siVite },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "shadcn/ui", icon: siShadcnui },
      { name: "Material UI", icon: siMui },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
      { name: "MongoDB", icon: siMongodb },
      { name: "REST APIs" },
      { name: "Socket.IO", icon: siSocketdotio },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Sentry", icon: siSentry },
      { name: "Amplitude" },
      { name: "Cloudflare Workers", icon: siCloudflareworkers },
    ],
  },
];

/** Brand colour, unless it's too dark to see on the charcoal background. */
function iconColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.3 ? "var(--fg)" : `#${hex}`;
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <h2 id="skills-title" className="label">
          My stack
        </h2>
        <dl className={styles.groups}>
          {GROUPS.map((g) => (
            <div key={g.name} className={styles.group}>
              <dt>{g.name}</dt>
              <dd>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.name}>
                      {s.icon && (
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill={iconColor(s.icon.hex)}>
                          <path d={s.icon.path} />
                        </svg>
                      )}
                      {s.name}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
