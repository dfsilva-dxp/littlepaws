import Router from "next/router";
import { createContext, ReactNode, useState } from "react";
import firebase from "../services/firebase";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  loading: boolean;
  signIn: ({ email, password }: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => response);
      Router.push("/dashboard");
      console.log(response);
    } catch (err) {
      setLoading(false);
      throw new Error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {}

  return (
    <AuthContext.Provider value={{ loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AutConsumer = AuthContext.Consumer;

export default AuthContext;
