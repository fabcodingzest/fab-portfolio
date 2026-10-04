# Portfolio content: Fabeha Rizvi (Fab)

Everything on the portfolio site, in one place. All of it is factual: from my resume, my Boraami repos and docs, and my own words. **Please use this text as-is and don't add numbers, percentages or claims that aren't here.**

**Tone:** humble and polite, proud of the work but not salesy. Boraami serves a fan community; it isn't "solving the world's problems". Keep the numbers in the Boraami section, not as big hero stats.

---

## 1. Basics

| Field | Value |
|---|---|
| Name | Fabeha Rizvi (goes by **Fab**) |
| Role | Frontend Engineer (React, React Native) |
| Location | Delhi, India |
| Email (public) | fabrizvi786@gmail.com |
| GitHub | https://github.com/fabcodingzest |
| LinkedIn | https://linkedin.com/in/fabcodingzest |
| Resume | `resume.pdf`, the **Frontend Developer (React, React Native)** resume, public copy with the phone number removed |
| Availability | Open to full-time roles |
| Phone | **Do not publish** |

**Page title:** Fab, Frontend Engineer
**Meta description:** Frontend engineer in Delhi building web and cross-platform mobile apps with React and React Native. Co-founder and frontend lead at Boraami, on the App Store and Google Play.

---

## 2. Navigation

Logo: **FR.** (the dot in the accent colour)
Links: About · Work · Experience · Stack · Projects · Contact
Right side: theme switch (light/dark) and a **Resume** button.

---

## 3. Hero

**Headline:** FRONTEND / ENGINEER (first line in the accent colour)

**Intro:**
> I'm **Fabeha**, a frontend engineer in Delhi. I build web and cross-platform mobile apps with React and React Native. Most recently I co-founded Boraami, a social app for the BTS fan community, and lead its app with a small remote team.

**Button:** Let's talk (scrolls to Contact)
**Status line:** Open to full-time roles
**Visual (all screen sizes, large):** a code-editor monitor (dark in both themes, red/yellow/green window dots, a stand underneath) that **cycles through five short files from across my stack**. Every 3.6s the code crossfades to the next file; the window title, a coloured language tag and the terminal line change with it. A small progress bar shows which file is on screen. Reduced motion: stays on the first file.

| File | Tag | Code | Terminal |
|---|---|---|---|
| `profile.ts` | TypeScript | `const fab = { role: "Frontend engineer", stack: ["React", "TS", "Node"], basedIn: "Delhi, India" };` | `➜ boraami git:(main) ✓` |
| `PostCard.tsx` | React Native | `<View style={styles.card}> <Avatar user={author} /> <Text>{post.body}</Text> <LikeButton optimistic /> </View>` | `➜ eas build --platform all` |
| `index.html` | HTML | `<main class="hello"> <h1>Hi, I'm Fab</h1> <p>I build for web</p> <p>and for mobile.</p> </main>` | `✓ served on localhost:3000` |
| `styles.css` | CSS | `.card { display: flex; gap: 12px; border-radius: 16px; color: #b48bff; }` | `✓ 0 problems, light + dark` |
| `server.js` | Node.js | `router.post("/posts", auth, async (req, res) => { const post = await save(req); res.status(201).json(post); });` | `✓ API listening on :8080` |

Each file is 5 lines with line numbers and syntax colours.

**Floating badges around the editor:**
- `</>` (accent colour, top-left): bounces
- **phone** icon (sky blue, right side): fades in and out on a loop
- **coffee cup** (orange, bottom-right): bounces

All of them pop in on load, and everything stays still with reduced motion.

> Avoid: "Hi, I'm…" openers and typing effects.

---

## 4. About

**Label:** What I bring
Three items in a row (stacked on phones), each with a big condensed title:

- **Ship end to end:** Web, mobile and backend. I took Boraami from its first commit to both app stores, and built its admin dashboard and much of its backend along the way.
- **Own what others skip:** Releases, store reviews, crash fixes and security housekeeping: the unglamorous work that keeps an app running for real people.
- **Make teams faster:** Code reviews, test scripts and, as the team grew, short specs and API contracts, so teammates can work in parallel instead of waiting on me.

**This is me.**
> Frontend engineer with 3+ years of experience, starting in React on the web and moving into React Native. At Boraami, which I co-founded, I lead the frontend with a small international team, working on the mobile app, the admin dashboard and, more recently, the Node.js backend.
>
> Before that, I built React web apps for a healthcare platform.

---

## 5. Selected work: Boraami (case study)

**Intro:**
> A community-driven social app for the BTS fan community, live on the App Store and Google Play. I've been on the founding team since November 2022 and have led the mobile app since its first commit in January 2024.

**Store links**
- App Store: https://apps.apple.com/in/app/boraami/id6749337745
- Google Play: https://play.google.com/store/apps/details?id=app.boraami.mobile

**Facts row**

| Label | Value |
|---|---|
| Role | Co-founder, Frontend Lead (React Native) |
| Team | 4 frontend developers, remote and international |
| So far | 2,000+ downloads, 1,700+ registered users, about 350 monthly active users, 99.7% crash-free users |
| Stack | React Native, Expo, Tamagui, Redux Toolkit, Socket.IO, Node.js |

### Feature walkthrough (scroll-driven phone)

The centrepiece: a phone frame on one side that switches screenshots as the reader scrolls through these steps. Each step has a title, then a **Frontend** line and a **Backend** line (small lilac tags).

1. **Boraline: a feed that stays fast and consistent** (`boraline.png`)
   - Frontend: I tuned the timeline for long scrolling: memoized rows, a tuned render window, infinite scroll cached per feed tab, and smaller, cached images. Likes and reposts update instantly and roll back if the request fails, and a normalized post store means one tap updates every screen that shows that post.
   - Backend: The feed fetches every reposted or quoted original in one query instead of one per post, and a like race condition is fixed. Images upload straight from the app to Cloudflare R2 through short-lived pre-signed URLs, so image bytes never pass through our server.
2. **Notifications that stay correct** (`boraline-2.png`)
   - Frontend: Live updates over Socket.IO, with REST reconciliation on reconnect and a periodic refetch so missed events can't leave the unread count wrong.
   - Backend: I rewrote the notification system: grouped by type, target and time window, an unread-count endpoint, push via Expo (FCM/APNs), and broadcasts streamed in batches over the socket.
3. **A gated community, so fans can feel safe** (`quiz.jpeg`)
   - Why: ARMY is one of the biggest fandoms in the world, and big open platforms tend to fill up with spam, trolls and people who are there to stir things up. We wanted Boraami to feel like a calm, friendly space for genuine fans, so joining starts with a short quiz only a real fan would enjoy.
   - Frontend: Sign-up includes a timed quiz about BTS, one question at a time with a countdown, built into the app's onboarding.
   - Backend: Questions are sampled by category and scored automatically: clear cases are approved or rejected, borderline ones go to moderators, and invites and results go out by email. It has processed 2,400+ applications.
4. **Trust and safety the app stores require** (`profile.png`)
   - Frontend: Blocking, reporting, a profanity filter, a 13+ age gate, and clear states in the app when content comes from a suspended or blocked member.
   - Backend: A suspension system with banned usernames and time-limited suspensions. Blocked and suspended users are filtered out of every feed, search and notification. Account deletion runs in a transaction that also fixes reply, quote and repost counts on other people's posts.
5. **From about 95% to 99.7% crash-free users** (`search.png`)
   - Frontend: Fixed Android out-of-memory crashes on lower-end phones by virtualizing the GIF picker and serving smaller feed images, measured in Sentry.
   - Backend: Server and scheduled-job errors report to Sentry, email failures never block the action behind them, and every paginated endpoint caps page size so no request can scan the whole database.

### What Boraami taught me

1. **Learning whatever the project needs.** Boraami is where I learned mobile development, building on my React web experience. When the backend needed someone, I learned Node.js and MongoDB on the job and took it over. In 2026 I also brought Claude Code into my workflow to move faster before launch.
2. **Taking things all the way to done.** Beyond features, I took care of what keeps an app alive: EAS builds and store reviews, moving the App Store listing to the company account, rotating credentials across services, and helping register the company.
3. **Bringing in process as we grew.** We started as a small team focused on shipping. As the app and team grew, I started writing a short spec and API contract before a feature, so teammates could build against mocks while I built the backend, plus review guides so everyone checks for the same things. I also help hire and review pull requests.
4. **Working across teams and time zones.** Our team spans several continents, so most of our collaboration is written. I work with designers, product and moderators, and write step-by-step device test scripts so teammates can verify a release on their own phones.

---

## 6. Experience

### Co-founder, Frontend Lead · Boraami LLC
Nov 2022 – Present · Remote, international team

> Founding team from Nov 2022 (product concept, design direction, team coordination), and frontend lead since Jan 2024, when the codebase started. The case study above has the details.

- Set up the React Native app (Expo, Tamagui), wrote about three quarters of its commits, and ship it to the App Store and Google Play with EAS.
- Main backend developer since mid-2025 (Node.js, Express, MongoDB): moderation, notifications, the admission quiz and image uploads.
- Built the React admin dashboard (TypeScript, Vite, shadcn/ui, Cloudflare Workers) that moderators use to review applicants, reports and users.
- Lead a team of 4 frontend developers across time zones: hiring, code reviews, a shared component library with light and dark themes, and, more recently, specs and API contracts.
- Helped run the organisation beyond code: company registration, store accounts and the App Store transfer.

*(Commit shares are from git, counting non-merge commits across all branches as of Oct 2026: app ~74%, admin dashboard 100%, backend ~85% since June 2025.)*

### Frontend Developer (Contract) · Wayfareoworld Advent Pvt Ltd
Dec 2021 – May 2022 · Delhi, India
- Built responsive web apps for a healthcare platform: patient portal, appointment booking and payment workflows integrated with third-party APIs.
- Managed state with Redux and integrated REST APIs in an agile team with design and backend developers.

---

## 7. Stack (show as tags with brand icons)

| Group | Skills |
|---|---|
| Mobile | React Native, Expo, Expo Router, Tamagui, EAS Build, iOS, Android, App Store, Google Play, FCM, APNs |
| Frontend | TypeScript, JavaScript, React, Redux Toolkit, RTK Query, Vite, Tailwind CSS, shadcn/ui, Material UI |
| Backend | Node.js, Express, MongoDB, REST APIs, Socket.IO |
| Tools | Git, GitHub, Sentry, Amplitude, Cloudflare Workers |

Icons: the `simple-icons` package (CC0). Tamagui, Amplitude and REST APIs have no icon.

---

## 8. Projects (numbered list; links open in a new tab)

Layout: on desktop, text on the left and the project screenshot on the right (rounded, lifts on hover, clicking it opens the live demo in a new tab). On phones the screenshot sits above the text.

### 01. React Movie Library
Movie discovery app with search, categories and recommendations using the TMDB API. State managed with Context API and useReducer.
- Tech: React, Tailwind CSS, TMDB API
- Live demo: https://movielibriz.netlify.app
- GitHub: https://github.com/fabcodingzest/React-Movie-Library
- Screenshot: `public/projects/movie-library.png`

### 02. TradeByte
Second-highest contributor in the GirlScript Uplift open-source program, in a team of 6. Built Google OAuth, user profiles, dashboards, email notifications and Razorpay payments.
- Tech: Node.js, Express, MongoDB, Tailwind CSS
- Live demo: https://tradebyte.onrender.com
- GitHub: https://github.com/fabcodingzest/TradeByte
- Screenshot: `public/projects/tradebyte.png`

*More projects will be added later with an "In progress" tag.*

---

## 8b. What I'm looking for (section before Contact)

**Label:** What I'm looking for
**Heading:** My next role
Four cards in a 2×2 grid:

- **Roles:** Frontend roles with React and TypeScript, React Native and mobile roles, or full-stack roles that lean frontend, like my work at Boraami.
- **Team:** A product team that ships to real users, where I can own features from the interface to the API and keep learning from people more experienced than me.
- **Where:** Remote, or hybrid and on-site in Delhi NCR or Bangalore. I'm also open to roles abroad that offer visa sponsorship.
- **How I work with AI:** I use AI tools like Claude Code every day to explore unfamiliar code, draft tests and reviews, and move faster, and I check everything they produce. Next, I'd like to work on a team that builds AI-powered features into real products, and learn that side properly.

*(Don't claim experience with AI APIs or ML. The interest is stated as what I want to learn next.)*

---

## 9. Contact

**Label:** Contact
**Heading:** Have a role or a project in mind?
**Text:** I'm open to full-time roles. Send me a message here, or email me directly.

**Card 1: Contact information**
- Email: fabrizvi786@gmail.com
- Location: Delhi, India
- Elsewhere: GitHub · LinkedIn · Resume

**Card 2: Send me a message**
- Fields: Name, Email, Message (all required), plus a hidden "company" honeypot field for spam bots
- Button: Send message → "Sending…"
- Success: "Message sent." / "Thanks for writing. I'll reply to the email you gave." / "Send another message"
- Errors: a specific message (for example "Please enter a valid email address."), or "Couldn't send your message. Please email me directly."

**Footer:** © 2026 Fabeha Rizvi

### How the form saves messages (already working)
The form posts to a server route, which forwards to a **Google Apps Script web app**. The script writes the message into my Google Sheet and emails me.

- Sheet tab name: **Messages**, with columns `S no. | Date | Name | Email | Message`. Each message fills the first row with an empty Date.
- Server environment variables: `CONTACT_WEBHOOK_URL` (the Apps Script `/exec` URL) and `CONTACT_WEBHOOK_SECRET` (must match the script property `CONTACT_SECRET`).
- Request body sent to the script: `{ "secret", "name", "email", "message" }`. The script responds `{ "ok": true }` or `{ "ok": false, "error": "..." }`.
- **The secret must stay on the server, never in browser code.**
- If you add a **Subject** field, the script and the sheet columns need updating too.
- Script source: `scripts/contact-sheet.gs`

---

## 10. Assets

| File | Use |
|---|---|
| `public/screens/quiz.jpeg` | Feature 3 (admission quiz) |
| `public/screens/welcome.png` | Not used (spare) |
| `public/screens/boraline.png` | Feature 1 |
| `public/screens/create-post.png` | Not used (spare) |
| `public/screens/reply-to-post.png` | Not used (spare) |
| `public/screens/boraline-2.png` | Feature 2 |
| `public/screens/profile.png` | Feature 4 |
| `public/screens/search.png` | Feature 5 |
| `public/projects/movie-library.png` | React Movie Library screenshot (1847×851) |
| `public/projects/tradebyte.png` | TradeByte screenshot (1847×851) |
| `public/resume.pdf` | Frontend resume download (no phone number) |

Screenshots are 589×1280 real Boraami screens. Usernames and post text are replaced with fictional ones for privacy. **Don't restyle them or generate new fake screens.**

---

## 11. Design notes I like

- **Header:** stays at the top, translucent dark background with a blur behind it (`backdrop-filter: blur(12px)`), hairline bottom border, "FR." logo left, links centred, round theme icon and Resume button right.
- **Theme switch:** follows the system setting by default and remembers the visitor's choice, with no flash of the wrong theme on load.
- **Colours:**
  - Dark: background `#1b1a1f`, text `#ededee`, muted `#9a99a2`, accent Boraami lilac `#b48bff`
  - Light: background `#f6f5f8`, text `#1b1a1f`, accent `#7957b5`
- **Type:** Bricolage Grotesque ExtraBold (800, uppercase, letter-spacing -0.035em) for big headings, Instrument Sans for everything else.
- **Motion:** a short load-in for the hero (including the bobbing badges), the scroll-driven phone, and small hover/press feedback. Respect `prefers-reduced-motion`.
- **Contact:** two cards, info on the left (icons) and the form on the right.
- **Header behaviour:** hides when scrolling down, slides back when scrolling up (always shown near the top).
- **Hero background:** a subtle canvas starfield mixed with faint code symbols (`</>`, `{ }`, `=>`). Light 3D parallax: nearer particles shift more as the cursor moves, and particles near the cursor link with faint lines. Uses the accent colour, pauses off screen, fewer particles on phones, still with reduced motion.
- **Section tracker (screens 1440px+ only):** a slim vertical line on the left with one dot per section (About, Boraami, Experience, Stack, Projects, Next role, Contact). It fills as you scroll, the current dot and label light up, and dots are clickable. Hidden on the hero.
- **Case study phone:** height-capped so it never fills the screen, with room above and below; it follows the header as it hides.
- **Avoid:** purple-to-blue gradients, glowing blobs, skill progress bars, emoji section headings, filler like "passionate developer crafting experiences".

---

## 12. ⚠️ Remove these from the current Emergent site (not accurate or not verified)

- "Achieved Apple App Store approval with **50+ active beta testers**" (I don't want the beta-tester claim)
- "reducing redundant API calls by **40%**", "improving error detection by **60%**" (no source for these numbers)
- "**7-30 day** token management", "**7-day TTL**", "**25+ screens**" (not verified)
- "Frontend Developer" as the Boraami title. Use **Co-founder, Frontend Lead**.
- "Next.js" in skills, unless you want to claim it (it isn't on my resume)
- "Hi there, I'm…" opener and the typing cursor
