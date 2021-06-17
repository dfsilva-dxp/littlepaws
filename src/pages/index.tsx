import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>littlepaws.</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>littlepaws</h1>

        <p className={styles.description}>Gestão de banho e tosa</p>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          littlepaws.
        </a>
      </footer>
    </div>
  );
}
