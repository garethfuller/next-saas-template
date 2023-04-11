import { UserAuthForm } from '@/components/forms/UserAuthForm'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div>
      <div>
        <div>
          <h1>Welcome back</h1>
          <p>Enter your email to sign in to your account</p>
        </div>
        <UserAuthForm />
        <p>
          <Link href="/signup">Don&apos;t have an account? Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
