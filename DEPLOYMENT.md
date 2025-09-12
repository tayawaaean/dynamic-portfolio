# Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Supabase project

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   In Vercel dashboard, go to Settings > Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Post-Deployment Setup

1. **Seed Database**
   ```bash
   # Set environment variables locally first
   npm run seed
   ```

2. **Create Admin User**
   - Go to your Supabase project
   - Navigate to Authentication > Users
   - Create a new user for admin access
   - Use this to login at `/dashboard`

3. **Update Content**
   - Login to admin dashboard
   - Update profile, projects, experience, skills
   - Replace placeholder resume PDF

## 🔧 Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update CORS in Supabase**
   - Go to Authentication > Settings
   - Add your custom domain to allowed origins

## 📊 Analytics & Monitoring

### Vercel Analytics
- Enable in Project Settings > Analytics
- View performance metrics and user data

### Error Monitoring
- Check Function Logs in Vercel dashboard
- Monitor Supabase logs for database issues

## 🔒 Security Checklist

- [ ] Environment variables are set correctly
- [ ] RLS policies are enabled in Supabase
- [ ] Admin routes are protected
- [ ] CORS settings are configured
- [ ] API routes have proper validation

## 🚀 Performance Optimization

### Next.js Optimizations
- Images are optimized automatically
- Static pages are pre-rendered
- Dynamic imports for heavy components

### Supabase Optimizations
- Database indexes are in place
- RLS policies are optimized
- Connection pooling is enabled

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check environment variables
   - Verify TypeScript errors are fixed
   - Ensure all dependencies are installed

2. **Supabase Connection Issues**
   - Verify URL and keys are correct
   - Check network connectivity
   - Review RLS policies

3. **Authentication Problems**
   - Ensure email auth is enabled
   - Check user creation in Supabase
   - Verify session handling

### Debug Steps
1. Check Vercel function logs
2. Review browser console errors
3. Test API endpoints directly
4. Verify database connections

## 📈 Scaling Considerations

### Database
- Monitor query performance
- Add indexes for large datasets
- Consider read replicas for high traffic

### Frontend
- Implement caching strategies
- Use CDN for static assets
- Optimize bundle size

### API
- Implement rate limiting
- Add request validation
- Monitor API usage

## 🔄 Updates & Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor security advisories
- Backup database regularly
- Review analytics data

### Content Updates
- Use admin dashboard for content
- Update resume PDF as needed
- Add new projects and skills
- Respond to contact form messages

