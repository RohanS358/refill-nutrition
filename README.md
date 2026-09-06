<img src="./logo.svg" width="72" alt="logo" />

# Refill Nutrition

A marketing and product website for **Refill**, a sports/nutrition company — built with an editable CMS layer so non-technical staff can update on-page copy without touching code.

**Live:** [refill-pied.vercel.app](https://refill-pied.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## Overview

The site walks a visitor through the brand story — impact, expertise, featured products, solutions, company timeline, research, manufacturing, and a sports-nutrition line preview — with a stats section and call-to-action band. An admin panel (with its own login) lets the team edit page copy inline via a small content-management layer (`lib/cms/content`) instead of redeploying for every text change.

## Features

- **CMS-editable copy**: homepage sections pull their text through a `text()` helper with sensible defaults, backed by an editable content store
- **Admin panel**: authenticated `/admin` area for managing site content
- **Section-based homepage**: hero, impact, expertise, featured products, solutions, timeline, research, manufacturing, sports preview, stats, CTA
- **Route groups**: public `(site)` routes separated from the `admin` area

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin login is available at `/admin/login`.
