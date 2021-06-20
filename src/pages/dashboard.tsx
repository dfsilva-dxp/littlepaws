import { useEffect } from "react";

import firebase from "../services/firebase";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("firebase", user);
    });
  });

  console.log("user", user);

  return (
    <main>
      <h1>Dashboard: {user?.email}</h1>
    </main>
  );
}
