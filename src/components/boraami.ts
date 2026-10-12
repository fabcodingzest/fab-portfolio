/*
  Boraami facts shared by the home page card and the /work/boraami case study.
  Facts come from the Boraami feature docs, backend release notes and Fab's own account;
  keep them in sync with CONTENT.md.
*/

export const APP_STORE = "https://apps.apple.com/in/app/boraami/id6749337745";
export const PLAY_STORE = "https://play.google.com/store/apps/details?id=app.boraami.mobile";

export const STATS = [
  { value: "2,000+", label: "downloads" },
  { value: "99.7%", label: "crash-free users" },
  { value: "2,400+", label: "membership applications" },
];

export const LEAD =
  "A social app for the BTS fan community, where members post, reply and follow each other. I co-founded it and lead the app: I set it up from the first line of code, led a team of 4 developers, and run its backend.";

export const PROBLEM =
  "ARMY is one of the biggest fandoms in the world, and big open platforms tend to fill up with spam and trolls. Boraami is a calm, friendly space built for genuine fans, with the app, its moderation and its backend designed around keeping it that way.";

export const ROLE = [
  "Co-founder since Nov 2022: product concept, design direction and team coordination.",
  "Set up the React Native app from its first commit in Jan 2024 and wrote about three quarters of its commits.",
  "Led a team of 4 developers, and the main backend developer since mid-2025.",
];

export const TEAM = "Multinational, across 5+ countries";

export const STACK = "React Native, Expo, Tamagui, Redux Toolkit, Socket.IO, Node.js, Express, MongoDB";

export const TIMELINE = [
  { date: "Nov 2022", label: "Co-founded Boraami" },
  { date: "Jan 2024", label: "First commit" },
  { date: "Mid-2025", label: "Took over the backend" },
  { date: "15 Jun 2026", label: "Public launch" },
];

// The moderators' side of the steps below. Commit share from git (Oct 2026): 100% of the dashboard.
export const DASHBOARD = {
  body: "A gated, moderated community needs a place for moderators to work. I built the React admin dashboard on my own: moderators use it to review membership applicants, including the borderline quiz results, handle reports, and manage users and suspensions.",
  stack: ["TypeScript", "React", "Vite", "shadcn/ui", "Cloudflare Workers"],
};

// Each step pairs what the app does (frontend) with what makes it work (backend).
export const STEPS = [
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
export const LEARNED = [
  {
    title: "Learning whatever the project needs",
    body: "Boraami is where I learned mobile development, building on my React web experience. When the backend needed someone, I learned Node.js and MongoDB on the job and took it over. In 2026 I also brought Claude Code into my workflow to move faster before launch.",
  },
  {
    title: "Taking things all the way to done",
    body: "Beyond features, I took care of what keeps an app alive: EAS builds and store reviews, moving the App Store listing to the company account, and rotating credentials across services. On the business side, I proposed forming Boraami LLC and set it up with my co-founder.",
  },
  {
    title: "Bringing in process as we grew",
    body: "We started as a multinational team across 5+ countries, focused on shipping. As the app and team grew, I introduced specs and API contracts before each feature, so teammates could build against mocks while I built the backend, and review guides so everyone checks for the same things. I also hire and review pull requests.",
  },
  {
    title: "Working across teams and time zones",
    body: "Our team spans several continents and time zones. I work closely with design, product and moderators, meeting whenever we need to align, and write step-by-step device test scripts so teammates can verify a release on their own phones.",
  },
];
