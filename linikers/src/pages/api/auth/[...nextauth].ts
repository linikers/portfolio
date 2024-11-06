// import NextAuth from "next-auth";
import NextAuth, { AuthOptions } from "next-auth";
// import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password"},
            },
            async authorize (credentials) {
                // if(!credentials) return null
                const { email, password } = credentials as { email: string; password: string};
                
                const users = [
                    {
                        id: "188",
                        email: "admin@admin.app",
                        password: "adminlink",
                        role: "admin",
                    },
                    {
                        id: "288",
                        email: "admin@liniker.app",
                        password: "link1234",
                        role: "admin",
                    },
                ];

                const user = users.find(user => user.email === email && user.password === password);

                // if(email === "admin@admin.app" && password === "adminlink") {
                //     return {
                //         email: "admin@admin.app",
                //         role: "admin"
                //     };
                // }
                if (user) {
                    return { id: user.id, email: user.email, role: user.role}
                }
                return null
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: {token: any, user?: { email:string, role: string } }) {
            if (user) {
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: {session: any, token: any}) {
            if (token) {
                // session.user?.email = token.email
                session.user.email = token.email as string;
                session.user.role = token.role as string
            }
            return session;
        },
    },
};
    // const handler = NextAuth(authOptions);
    // export { handler as GET, handler as POST }
    export default NextAuth(authOptions);