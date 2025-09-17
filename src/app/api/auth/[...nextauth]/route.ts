import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  token?: string;
  user?: { _id: string; name: string; email: string };
}

interface ExtendedToken extends JWT {
  user?: { _id: string; name: string; email: string };
  token?: string;
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        try {
          const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            headers: { 
              "Content-Type": "application/json" 
            }
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
          }

          if (data.token) {
            return {
              id: data.user?._id,
              name: data.user?.name,
              email: data.user?.email,
              token: data.token,
              user: data.user
            } as ExtendedUser;
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Failed to authenticate. Please try again.');
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser | undefined }) {
      if (user) {
        // Merge user data into token
        return {
          ...token,
          user: user.user || user,
          token: user.token
        };
      }
      return token;
    },
    async session({ session, token }: { session: { user: any; token?: string }; token: ExtendedToken }) {
      return {
        ...session,
        user: token.user || session.user,
        token: token.token
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };