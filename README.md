# Portfolio Website - Aean Gabrielle Tayawa

A modern, dark-themed portfolio website built with Next.js, TypeScript, TailwindCSS, and Supabase.

## 🎨 Design Features

- **Dark Theme Only**: Professional dark design with a three-color palette
- **Colors**: 
  - Background: `#0B0F12` (slate-900)
  - Accent: `#7C5CFF` (purple)
  - Highlight: `#00D4A0` (teal)
- **Minimal & Professional**: Clean design focused on content
- **Responsive**: Mobile-first design that works on all devices
- **Subtle Animations**: Hover effects and smooth transitions

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📁 Project Structure

```
/src
  /app                 # Next.js App Router pages
    /page.tsx         # Home page with Hero section
    /projects/        # Projects showcase
    /experience/      # Work history timeline
    /skills/          # Skills grouped by category
    /resume/          # Resume view and download
    /contact/         # Contact form
    /dashboard/       # Protected admin panel
    /api/contact/     # Contact form API endpoint
  /components          # Reusable UI components
    Nav.tsx           # Navigation header
    Footer.tsx        # Site footer
    Hero.tsx          # Hero section component
    Card.tsx          # Reusable card component
    Button.tsx        # Button component
    Section.tsx       # Section wrapper component
  /lib
    supabaseClient.ts # Supabase configuration
    auth.ts           # Authentication helpers
/scripts
  seed-resume.ts      # Database seeding script
  supabase-schema.sql # Database schema
```

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd nextjs-aean-portfolio
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `scripts/supabase-schema.sql` in your Supabase SQL editor
3. Copy your project URL and API keys to the `.env.local` file

### 4. Database Seeding

Seed your database with sample resume data:

```bash
npm run seed
```

### 5. Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📄 Pages Overview

### Public Pages

- **Home (`/`)**: Hero section with name, headline, and quick links
- **Projects (`/projects`)**: Showcase of projects with tech stacks and links
- **Experience (`/experience`)**: Professional timeline with roles and achievements
- **Skills (`/skills`)**: Technical skills grouped by category with proficiency levels
- **Resume (`/resume`)**: Online resume view with PDF download option
- **Contact (`/contact`)**: Contact form that saves messages to Supabase

### Admin Dashboard (`/dashboard`)

Protected admin panel with:
- Supabase authentication (email/password)
- CRUD operations for all content types
- Message management from contact form
- Profile management

## 🗄️ Database Schema

### Tables

- **profiles**: Personal information and bio
- **projects**: Project showcase with descriptions and tech stacks
- **experience**: Work history and achievements
- **skills**: Technical skills with categories and proficiency levels
- **messages**: Contact form submissions
- **users**: Managed by Supabase Auth

### Security

- Row Level Security (RLS) enabled on all tables
- Public read access for portfolio content
- Authenticated write access for admin operations

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Environment Variables for Production

Make sure to add these in your Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## 🎯 Key Features

- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance**: Optimized images, lazy loading, and minimal bundle size
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- **Security**: Protected admin routes and secure API endpoints
- **Responsive**: Mobile-first design with smooth animations

## 📝 Customization

### Adding Content

1. **Projects**: Use the admin dashboard or directly insert into Supabase
2. **Experience**: Add work history through the dashboard
3. **Skills**: Organize skills by category with 1-5 proficiency levels
4. **Profile**: Update personal information and bio

### Styling

- Colors are defined in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Component-specific styles use Tailwind classes

### Adding Pages

1. Create new page in `src/app/[page-name]/page.tsx`
2. Add navigation link in `src/components/Nav.tsx`
3. Update sitemap and metadata as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, TypeScript, TailwindCSS, and Supabase.