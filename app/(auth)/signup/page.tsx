import { UserAuthForm } from '@/components/forms/UserAuthForm'
import Link from 'next/link'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function SignupPage() {
  return (
    <div>
      <Link href="/login">Login</Link>
      <div>
        <h1>Create an account</h1>
        <p>Enter your email below to create your account</p>
      </div>
      <UserAuthForm />
    </div>
  )
}
