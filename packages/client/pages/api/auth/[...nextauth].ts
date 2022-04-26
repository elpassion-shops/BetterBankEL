import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
console.log(process.env);
export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log(account);
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
      return session;
    },
  },
  secret: process.env.AUTH0_CLIENT_SECRET,
  pages: {
    signIn: '/api/auth/signin',
  },
});
