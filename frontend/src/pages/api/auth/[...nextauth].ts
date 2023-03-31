import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "~/serverless/libs/mongodb";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //@ts-ignore
    async session({ session, token }) {
      session = {
        ...session,
        user: {
          ...session.user,
          //@ts-ignore
          id: token?.sub,
        },
      };
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/login",
  },
});
