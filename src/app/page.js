import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <section className={styles.content}>
        <p>
          This app lets you create your own drawings using a simple canvas.
          Choose your gen style, and start generating based on your lines!
        </p>
        <Link href="/draw">
          <button className={styles.startButton}>Get Started</button>
        </Link>
      </section>
    </div>
  );
}
