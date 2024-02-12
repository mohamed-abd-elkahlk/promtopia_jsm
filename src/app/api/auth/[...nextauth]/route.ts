import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { AuthOptions, SessionOptions } from "next-auth";
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECREAT!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();

      const sessionUser = await User.findOne({ email: session?.user?.email });

      session.user = sessionUser;

      return session;
    },
    async signIn({ profile, user }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          return await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: user?.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export { handler as GET, handler as POST };
