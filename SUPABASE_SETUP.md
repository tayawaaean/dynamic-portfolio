# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization
4. Set project name: `aean-portfolio`
5. Set database password (save this!)
6. Choose region closest to you
7. Click "Create new project"

## 2. Database Setup

### Run SQL Schema
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the entire contents of `scripts/supabase-schema.sql`
3. Click "Run" to create all tables and policies

### Verify Tables Created
Go to Table Editor and verify these tables exist:
- `profiles`
- `projects` (with `image_url` and `work_type` columns)
- `experience`
- `skills`
- `messages`

## 3. Storage Setup for Images

### Create Storage Bucket
1. Go to Storage in your Supabase dashboard
2. Click "New bucket"
3. Bucket name: `images`
4. Set as Public bucket: ✅ (checked)
5. Click "Create bucket"

### Create Storage Policies
Go to Storage > Policies and add these policies for the `images` bucket:

**Policy 1: Public Read Access**
```sql
CREATE POLICY "Public can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

**Policy 3: Authenticated Update**
```sql
CREATE POLICY "Authenticated users can update images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

**Policy 4: Authenticated Delete**
```sql
CREATE POLICY "Authenticated users can delete images" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## 4. Authentication Setup

### Enable Email Authentication
1. Go to Authentication > Settings
2. Under "Auth Providers", ensure Email is enabled
3. **For development**: Disable "Confirm email" (you can re-enable for production)
4. Set Site URL to: `http://localhost:3000` (for development)
5. Add redirect URLs:
   - `http://localhost:3000/dashboard`
   - `https://yourdomain.com/dashboard` (for production)

### Create Admin User
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email: `admin@yourdomain.com`
4. Enter password: Create a strong password
5. Leave "Auto Confirm User" checked
6. Click "Create user"

## 5. Environment Variables

### Get API Keys
1. Go to Settings > API
2. Copy these values:

```env
# Copy to .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Create .env.local
Create `.env.local` in your project root:
```bash
cp env.template .env.local
```
Then edit `.env.local` with your actual values.

## 6. Seed Database

Run the seed script to populate with sample data:
```bash
npm run seed
```

This will create:
- Sample profile data
- 3 example projects
- Work experience entries
- Skills across different categories

## 7. Test the Setup

### Test Frontend
```bash
npm run dev
```
Visit `http://localhost:3000` - you should see the portfolio with default data.

### Test Admin Dashboard
1. Go to `http://localhost:3000/dashboard`
2. Login with the admin user you created
3. Test CRUD operations:
   - Create/edit profile
   - Add projects with image upload
   - Manage experience and skills
   - View contact messages

### Test Image Upload
1. In the dashboard, create a new project
2. Upload a project image (recommended: 3840x2160px 4K)
3. The image should upload to Supabase Storage
4. View the project on the frontend to see the image

## 8. Production Setup

### Update Environment Variables
In your production deployment (Vercel, etc.), add:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Update Auth Settings
1. Go to Authentication > Settings
2. Enable "Confirm email" for production
3. Update Site URL to your production domain
4. Add production redirect URLs

### Storage Configuration
Storage is automatically configured for production - no additional setup needed.

## 9. Backup and Maintenance

### Regular Backups
Supabase automatically backs up your database. For additional safety:
1. Go to Settings > Database
2. Download database backup periodically

### Monitor Usage
1. Go to Settings > Usage
2. Monitor database size, API requests, and storage usage
3. Upgrade plan if needed

## Troubleshooting

### Common Issues

**1. Images not uploading**
- Check Storage policies are created
- Verify bucket is public
- Ensure user is authenticated

**2. Authentication errors**
- Check environment variables
- Verify user exists in Authentication > Users
- Check RLS policies allow authenticated access

**3. Database connection errors**
- Verify SUPABASE_URL and keys
- Check if database is paused (free tier)
- Verify network connectivity

**4. Seed script fails**
- Ensure SERVICE_ROLE_KEY is correct
- Check database schema was applied
- Verify tables exist

### Getting Help
- Check Supabase documentation
- Join Supabase Discord community
- Review browser console for errors
- Check Supabase dashboard logs

## Security Notes

- Never commit `.env.local` to version control
- Use service role key only for server-side operations
- Regularly rotate API keys
- Monitor authentication logs for suspicious activity
- Keep Supabase project updated

## Next Steps

After setup:
1. Customize the profile with your information
2. Add your real projects with screenshots
3. Update experience and skills
4. Replace placeholder resume PDF
5. Test contact form functionality
6. Deploy to production (Vercel recommended)

