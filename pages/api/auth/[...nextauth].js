import { verifyPassword } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import NextAuth from "next-auth/next";

import Credentials from "next-auth/providers/credentials";


export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectToDB();
 
        const usersCollection = client.db().collection('users');
 
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        console.log(user)
 
        if (!user) {
          client.close();
          throw new Error('No user found!');
        }
 
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
 
        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }
 
        client.close();
        return { email: user.email };
      },
    }),
  ],
};
 
export default NextAuth(authOptions);