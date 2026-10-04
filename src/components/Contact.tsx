import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

const ICONS = {
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
};

function Icon({ d }: { d: string }) {
  return (
    <span className={styles.icon} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d={d} />
      </svg>
    </span>
  );
}

export default function Contact() {
  return (
    <footer id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <p className="label">Contact</p>
        <h2 id="contact-title" className="h2">
          Have a role or a project in mind?
        </h2>
        <p className={styles.note}>I&rsquo;m open to full-time roles. Send me a message here, or email me directly.</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Contact information</h3>
            <ul className={styles.info}>
              <li>
                <Icon d={ICONS.mail} />
                <div>
                  <p className={styles.key}>Email</p>
                  <a className="link" href="mailto:fabrizvi786@gmail.com">
                    fabrizvi786@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <Icon d={ICONS.pin} />
                <div>
                  <p className={styles.key}>Location</p>
                  <p>Delhi, India</p>
                </div>
              </li>
              <li>
                <Icon d={ICONS.link} />
                <div>
                  <p className={styles.key}>Elsewhere</p>
                  <p className={styles.links}>
                    <a className="link" href="https://github.com/fabcodingzest" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                    <a className="link" href="https://linkedin.com/in/fabcodingzest" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                    <a className="link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                      Resume
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Send me a message</h3>
            <ContactForm />
          </div>
        </div>

        <p className={styles.small}>© 2026 Fabeha Rizvi</p>
      </div>
    </footer>
  );
}
