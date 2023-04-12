import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from './db'
import EmailProvider from 'next-auth/providers/email'
import { ServerClient } from 'postmark'
import { config } from './config'
import { SessionStrategy, AuthOptions } from 'next-auth'
import { handleNewSession } from './session'

const postmarkClient = new ServerClient(process.env.POSTMARK_API_TOKEN || '')

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        await handleNewSession(user.id)
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
      }

      return session
    },
  },
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier,
        url,
        provider: { from },
      }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
          },
        })

        const templateId = user?.emailVerified
          ? process.env.POSTMARK_SIGN_IN_TEMPLATE
          : process.env.POSTMARK_ACTIVATION_TEMPLATE
        if (!templateId) {
          throw new Error('Missing template id')
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          From: from as string,
          To: identifier,
          TemplateModel: {
            actionUrl: url,
            product_name: config.appName,
            product_url: config.appUrl,
            company_name: config.companyName,
            company_address: config.companyAddress,
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: 'X-Entity-Ref-ID',
              Value: new Date().getTime() + '',
            },
          ],
        })

        if (result.ErrorCode) {
          throw new Error(result.Message)
        }
      },
    }),
  ],
}
