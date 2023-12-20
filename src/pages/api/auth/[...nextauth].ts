import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
