import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import firebase from "../services/firebase";

type Customer = {
  email: string;
  refreshToken: string;
  uid: string;
  token: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  loading: boolean;
  isAuthenticated: boolean;
  customer: Customer;
  setLoading(value: boolean): void;
  signIn({ email, password }: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!customer;

  function session(token = "") {
    if (!!token) {
      setCookie(undefined, "littlepaws.token", token, {
        maxAge: 3600, // 1 hours
        path: "/",
      });
    } else {
      destroyCookie(undefined, "littlepaws.token");
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => response);

      const { refreshToken, uid, za: token } = response.user;

      setCustomer({
        email,
        refreshToken,
        uid,
        token,
      });

      session(token);

      Router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await Router.push("/");
    await firebase.auth().signOut();
    await session();
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((customer) => {
      if (customer) {
        const { email, refreshToken, uid, za: token } = customer;
        setCustomer({
          email,
          refreshToken,
          uid,
          token,
        });
      } else {
        setCustomer(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated,
        loading,
        setLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AutConsumer = AuthContext.Consumer;

export default AuthContext;
