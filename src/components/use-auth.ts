"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const useProvideAuth = (): AuthContextInterface => {
  const [user, setUser] = useState<string | undefined>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const signOut = async (): Promise<void> => {
    setLoggedIn(false);
    setUser(undefined);
    localStorage.setItem("TOKEN", "");
    router.push("/");
  };

  const signIn = async (user: string, password: string): Promise<void> => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });
    const data = await response.json();
    console.log(data);
    console.log(response);
    if (response.status === 200) {
      setLoggedIn(true);
      localStorage.setItem("TOKEN", data.token);
    }
  };

  return {
    signIn,
    signOut,
    user,
    loggedIn,
  };
};
const AuthContext = createContext({} as AuthContextInterface);

export function ProvideAuth({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const auth = useProvideAuth();
  return React.createElement(AuthContext.Provider, { value: auth }, children);
}

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

interface AuthContextInterface {
  signOut: () => Promise<void>;
  signIn: (user: string, password: string) => Promise<void>;
  user?: string;
  loggedIn: boolean;
}
