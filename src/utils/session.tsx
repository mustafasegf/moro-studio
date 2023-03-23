import { parseCookies, destroyCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import router from "next/router";
import { Session } from "~/server/api/trpc";
import { decode } from "jsonwebtoken";
import { z } from "zod";
import { tryCatch } from "~/utils/trycatch";
import { IncomingMessage } from "http";

export interface AuthContextType {
  session: Session | null;
  logout: () => void;
  changeUser: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({ 
  session: null,
  logout: () => {},
  changeUser: () => {}
});

export interface AuthProviderProps {
  session: Session | null;
  children: React.ReactNode
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ session, children  }: AuthProviderProps) => {
  const [user, setUser] = useState<Session | null>(session);

  const logout = async () => {
    destroyCookie(null, "token", {
      path: "/",
    });

    setUser(null);
    await router.push("/api/auth/logout");
  };

  const changeUser = (token: string) => {
    const user = parseToken(token);
    setUser(user);
  }

  return <AuthContext.Provider value={{ session: user, logout, changeUser }} > {children} </AuthContext.Provider>;
};

const sessionSchema = z.object({
  id: z.string(),
  nama: z.string(),
  role: z.enum(["admin", "studioManager", "blogManager", "user"]),
});

export function getServerAuthSession({
  req,
}: {
  req?: IncomingMessage;
}) {
  const parsedCookies = parseCookies({ req });
  const token = parsedCookies["token"];
  if (!token) {
    return null;
  }

  return parseToken(token);
}

function parseToken(token: string) {
  let decoded = decode(token);
  if (!decoded) {
    return null;
  }

  const [err, data] = tryCatch(sessionSchema.parse, decoded);
  if (err) {
    return null;
  }
  return data;
}