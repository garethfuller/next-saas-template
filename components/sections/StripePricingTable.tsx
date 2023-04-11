'use client'

import { User } from 'next-auth'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'id' | 'name' | 'email'>
}

export default function StripePricingTable({ user }: Props) {
  return (
    <div>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        customer-email={user.email}
        client-reference-id={user.id}
      ></stripe-pricing-table>
    </div>
  )
}
