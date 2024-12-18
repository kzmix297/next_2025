import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserByEmail, loginBackend } from "./data/users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const data = await loginBackend(credentials);

          if (data.status === 201) {
            const user = await data.json();

            return user;
          } else {
            throw new Error("Email or Password is not correct");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && user.data) {
        token.username = user.data.username;
        token.role = user.data.role;
        token.accessToken = user.data.token;
        token.refreshToken = user.data.refreshToken;
        token.fullname = user.data.fullname;
      }
      return token;
    },

    session: async ({ session, token, user }) => {
      if (token) {
        session.user.username = token.username;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
});
