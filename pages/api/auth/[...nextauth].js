import NextAuth from "next-auth";
// import NaverProvider from "next-auth/providers/naver";
import { connectDB } from "@/util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    // NaverProvider({
    //   clientId: 'Nq4tWga_ZSRjPSMpyQjb',
    //   clientSecret: '0ILtRhrgeE',
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        let db = (await connectDB).db('forum');
        let user = await db.collection('user_cred').findOne({username: credentials.username})

        if(!user) {
          console.log('아이디 없음')
          return null
        }
        const passwordCheck = await bcrypt.compare(credentials.password, user.password)
        if(!passwordCheck) {
          console.log('비밀번호 틀림')
          return null
        }
        return user
      }
    })
  ],

  sesson: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        token.user = {};
        token.user.name = user.username;
        token.user.email = user.email;
      }
      return token;
    },
    session: async ({session, token}) => {
      if(token) {
        session.user = token.user;
      }
      return session;
    },
  },

  secret : 'i_23wj#2eKJ!@2'
};

export default NextAuth(authOptions);
