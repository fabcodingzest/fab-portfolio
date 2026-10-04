import Image from "next/image";
import styles from "./Phone.module.css";

export type Screen = { src: string; alt: string };

type PhoneProps = {
  screens: Screen[];
  /** Index of the screen currently shown; the rest stay mounted and fade. */
  active?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Device frame around Boraami screenshots (589 x 1280 source images). */
export default function Phone({ screens, active = 0, priority, sizes = "300px", className }: PhoneProps) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <div className={styles.screen}>
        {screens.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={589}
            height={1280}
            sizes={sizes}
            priority={priority && i === 0}
            className={styles.shot}
            data-active={i === active}
            aria-hidden={i !== active}
          />
        ))}
      </div>
    </div>
  );
}
