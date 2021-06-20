import { useEffect } from "react";

import firebase from "../services/firebase";
import useAuth from "../hooks/useAuth";
import Router from "next/router";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/");
      }
    });
  }, []);

  return (
    <main>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
