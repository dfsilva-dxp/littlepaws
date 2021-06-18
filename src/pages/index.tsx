import Head from "next/head";
import { FormEvent, useContext, useState } from "react";

import AuthContext from "../contexts/AuthContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createAuth } = useContext(AuthContext);

  async function handleCreateUserAuth(event: FormEvent) {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    await createAuth(user);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>littlepaws.</title>
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>littlepaws</h1>
          <p className={styles.description}>Gestão de banho e tosa</p>
        </div>
        <form className={styles.card}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div>
            <button type="submit" onClick={handleCreateUserAuth}>
              Cadastrar
            </button>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          littlepaws.
        </a>
      </footer>
    </div>
  );
}
