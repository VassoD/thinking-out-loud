# Thinking Out Loud

Personal blog by [Vasiliki Doropoulou](https://www.linkedin.com/in/vasilikidoropoulou/). Writing about engineering, UX, AI, leadership, philosophy, and whatever is making me think this week.

## Stack

- [Next.js 14](https://nextjs.org) App Router
- TypeScript
- Tailwind CSS
- MDX via next-mdx-remote
- Deployed on Vercel

## Running locally

```bash
npm install
npm run dev
```

## Adding a post

Create a `.mdx` file in `content/posts/`:

```mdx
---
title: "Your title"
excerpt: "One sentence."
date: "2026-05-14"
category: "Philosophy"
tags: ["tag"]
featured: false
published: true
---

Your content here.
```

Available categories: `Engineering`, `Leadership`, `UX & Product`, `AI`, `Philosophy`, `Growth`.

Set `published: false` to draft without it appearing on the site.

## Deploy

Deployed automatically via Vercel on push to `main`. Set `NEXT_PUBLIC_SITE_URL` to your domain in Vercel environment variables.
