import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <section className={styles.content}>
        <p>
          This app lets you create your own drawings using a simple canvas.
          Choose your brush color, adjust the brush size, and start drawing! You
          can even save your creations for later.
        </p>
        <Link href="/draw">
          <button className={styles.startButton}>Get Started</button>
        </Link>
      </section>
    </div>
  );
}
