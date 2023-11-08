# SwiftTalk Real-Time Chat Web Application

This is real time chat web application that build on top of Socket.io, Next.js, Mysql and Drizzle ORM.

## Tech stack

- Next.js
- Socket.io
- Mysql
- Drizzle ORM
- TypeScript
- Tailwind
- Shadcn UI
- NextAuth.js
- OAuth

## Installation and Local test

- First, run `npm install` to install all dependencies and connect to your local Mysql database with Drizzle ORM

- Second, run migration by running command:

```bash
npm run db:migrate
```

- Third, push migration data to actuarial local database by running command:

```bash
npm run db:push
```

- After that, run dev server:

```bash
npm run dev
```

- Finally, run socket server:

```bash
npm run node
```

## Contribution

Every issues and better performance make pull request, contribution are always welcome.
