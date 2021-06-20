import Router from "next/router";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import firebase from "../services/firebase";

type User = {
  uid: string;
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  loading: boolean;
  isAuthenticated: boolean;
  user: User;
  signIn({ email, password }: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, email } = user;
        setUser({ uid, email });
        Router.push("/dashboard");
      } else {
        Router.push("/");
      }
    });
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => response);

      const { uid } = response.user;

      setUser({
        uid,
        email,
      });

      Router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      throw new Error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AutConsumer = AuthContext.Consumer;

export default AuthContext;
