# Next SaaS Template

My very bare bones Nextjs (13) SaaS template. By filling out the .env.template
file and renaming .env you should have a fully functional SaaS app with email
authentication via Next-auth/Postmark and Stripe subscriptions.

Initial implementation drawn from
[taxonomy](https://github.com/shadcn/taxonomy).

## Development

```bash
git clone https://github.com/garethfuller/japoolzi.git && cd japoolzi && pnpm install
```

Then start dev services, e.g. postgres & redis

```bash
pnpm dev:services
```

Then setup the database:

```bash
pnpm db:setup
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).
