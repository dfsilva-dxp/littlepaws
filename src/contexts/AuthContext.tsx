import { createContext, ReactNode, useState } from "react";
import firebase from "../services/firebase";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  createAuth: ({ email, password }: SignInCredentials) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signIn() {}

  async function signOut() {}

  async function createAuth({ email, password }: SignInCredentials) {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => response);

    console.log(response);
  }

  return (
    <AuthContext.Provider value={{ loading, signIn, signOut, createAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AutConsumer = AuthContext.Consumer;

export default AuthContext;
