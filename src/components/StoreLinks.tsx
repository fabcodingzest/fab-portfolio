import { siApple, siGoogleplay } from "simple-icons";
import { APP_STORE, PLAY_STORE } from "./boraami";
import styles from "./CaseStudy.module.css";

/* App Store / Google Play pills, on the home card and the case study page. */
export default function StoreLinks() {
  return (
    <div className={styles.stores}>
      <a className={`${styles.store} press`} href={APP_STORE} data-track="store_click" data-label="app_store" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={siApple.path} />
        </svg>
        App Store
      </a>
      <a className={`${styles.store} press`} href={PLAY_STORE} data-track="store_click" data-label="google_play" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={siGoogleplay.path} />
        </svg>
        Google Play
      </a>
    </div>
  );
}
