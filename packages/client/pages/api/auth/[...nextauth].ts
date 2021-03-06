import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log(session, token);
      session.accessToken = token.accessToken;
      console.log(session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return '/account';
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  secret: process.env.AUTH0_CLIENT_SECRET,
});
