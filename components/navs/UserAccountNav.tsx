'use client'

import { User } from 'next-auth'
import { signOut } from 'next-auth/react'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <div>
      <p>Current user: {user.email}</p>
      <button
        onClick={(event) => {
          event.preventDefault()
          signOut({
            callbackUrl: `${window.location.origin}/login`,
          })
        }}
      >
        Sign out
      </button>
    </div>
  )
}
