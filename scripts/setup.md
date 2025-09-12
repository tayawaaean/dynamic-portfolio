# Portfolio Setup Guide

## Quick Start Checklist

### 1. Environment Setup
- [ ] Copy `env.template` to `.env.local`
- [ ] Create Supabase project at [supabase.com](https://supabase.com)
- [ ] Add Supabase URL and keys to `.env.local`

### 2. Database Setup
- [ ] Run the SQL schema from `scripts/supabase-schema.sql` in Supabase SQL Editor
- [ ] Install dependencies: `npm install`
- [ ] Seed database: `npm run seed`

### 3. Development
- [ ] Start dev server: `npm run dev`
- [ ] Visit `http://localhost:3000`
- [ ] Test all pages work correctly

### 4. Admin Access
- [ ] Go to `/dashboard`
- [ ] Create admin user in Supabase Auth
- [ ] Login and test CRUD operations

### 5. Customization
- [ ] Update profile information
- [ ] Add your projects
- [ ] Update experience and skills
- [ ] Replace placeholder resume PDF

### 6. Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables
- [ ] Deploy and test

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Supabase Setup Steps

1. Create new project
2. Go to Settings > API
3. Copy Project URL and anon public key
4. Copy service_role secret key (for seeding)
5. Go to SQL Editor
6. Run the schema from `scripts/supabase-schema.sql`
7. Go to Authentication > Settings
8. Enable email authentication
9. Optionally create an admin user

## Customization Tips

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- `background`: Main background color
- `accent`: Primary accent (purple)
- `highlight`: Secondary accent (teal)

### Content
Use the admin dashboard at `/dashboard` to:
- Update profile information
- Add/edit projects
- Manage work experience
- Update skills and proficiency levels
- View contact form messages

### Resume PDF
Replace `public/resume.pdf` with your actual resume file.

## Troubleshooting

### Common Issues

1. **Supabase connection errors**
   - Check environment variables
   - Verify project URL and keys
   - Ensure RLS policies are set correctly

2. **Seed script fails**
   - Make sure service role key is correct
   - Check database schema was applied
   - Verify network connectivity

3. **Authentication not working**
   - Enable email auth in Supabase
   - Check auth policies
   - Verify user creation

### Getting Help

- Check the README.md for detailed documentation
- Review Supabase documentation for database issues
- Check Next.js documentation for framework questions

