This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The page also uses components from [`shadcn/ui`](https://ui.shadcn.com/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

You will also have to create an `.env` file, which will cotain a `DATABASE_URL` variable which will be your connection URL to your database. F.e.:

```
DATABASE_URL=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/
```

Naturally you will have to replace `yourusername`, `yourpassword` and `yourcluster` with your own values. You can find more about that [`here`](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string).

## About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
