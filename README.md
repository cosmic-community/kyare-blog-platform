# Kyare Blog Platform

![App Preview](https://imgix.cosmicjs.com/4bf7ac30-d509-11f0-903e-477b09506230-photo-1518770660439-4636190af475-1765289570411.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, multi-niche blog platform featuring technology, gaming, anime, and entertainment content. Built with Next.js 16 and powered by Cosmic CMS.

## Features

- 🎯 Multi-category content hub (Technology, Games, Anime, Entertainment, Niche)
- 💎 Premium content system with exclusive articles
- 👥 Detailed author profiles with social links
- 🏷️ Dynamic category filtering and navigation
- 📱 Fully responsive design optimized for all devices
- 🖼️ Image galleries with automatic imgix optimization
- ⏱️ Reading time estimates for better content discovery
- 🎨 Color-coded categories without gradients
- 🔍 SEO-optimized with server-side rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69382c1d8880fbd1d8a5cf9e&clone_repository=6938308c8880fbd1d8a5cffb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories for niche, games, technology ,, anime ,  and entertainment with premium options, do not use gradient colors."

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a blog with posts, authors, and categories for niche, games, technology ,, anime ,  and entertainment with premium options, do not use gradient colors.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **React Markdown** - Markdown content rendering
- **Imgix** - Automatic image optimization

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with the blog content model set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts with Related Content

```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1); // Includes author and category data
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId // Query by category ID
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching a Single Post

```typescript
const response = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: postSlug
  })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1);
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with three main content types:

### Posts
- Title, excerpt, and markdown content
- Featured image and image galleries
- Connected author and category
- Premium content flag
- Reading time estimate

### Authors
- Name, bio, and profile photo
- Role/title
- Social links (Twitter, LinkedIn, website)

### Categories
- Name and description
- Category image
- Color theme (solid colors, no gradients)

All content is fetched server-side for optimal SEO and performance. The depth parameter ensures related content (authors, categories) is included in a single query.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Build command: `bun run build`
5. Publish directory: `.next`
6. Deploy!

## Project Structure

```
├── app/
│   ├── posts/[slug]/        # Individual post pages
│   ├── categories/[slug]/   # Category pages
│   ├── authors/[slug]/      # Author pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── PostCard.tsx         # Post preview card
│   ├── CategoryCard.tsx     # Category display card
│   └── CosmicBadge.tsx      # Cosmic branding badge
├── lib/
│   └── cosmic.ts            # Cosmic SDK client
└── types.ts                 # TypeScript definitions
```

## License

MIT

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com)
<!-- README_END -->