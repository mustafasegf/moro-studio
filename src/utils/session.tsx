import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import router from "next/router";
import { Session } from "~/server/api/trpc";
import { api } from "./api";
import { NextApiRequest } from "next";
import { decode } from "jsonwebtoken";
import { z } from "zod";
import { tryCatch } from "~/utils/trycatch";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export interface AuthContextType {
  session: Session | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  session: null,
  logout: () => {},
});

export interface AuthProviderProps {
  session: Session | null;
  children: React.ReactNode
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ session, children  }: AuthProviderProps) => {
  const [user, setUser] = useState<Session | null>(session);

  const logout = async () => {
    destroyCookie(null, "token");
    setUser(null);
    await router.push("/");
  };

  return <AuthContext.Provider value={{ session: user, logout }} > {children} </AuthContext.Provider>;
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