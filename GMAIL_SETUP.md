# Gmail Setup for Contact Form

This guide will help you configure Gmail to send contact form messages directly to your email.

## 🔐 Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the prompts to enable 2FA (required for App Passwords)

## 🔑 Step 2: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **App passwords**
3. Select **Mail** as the app
4. Select **Other (Custom name)** as the device
5. Enter "Portfolio Contact Form" as the name
6. Click **Generate**
7. **Copy the 16-character password** (you won't see it again!)

## ⚙️ Step 3: Configure Environment Variables

1. Copy the environment template:
   ```bash
   cp env.template .env.local
   ```

2. Edit `.env.local` and add your Gmail credentials:
   ```env
   # Gmail Configuration for Contact Form
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   ```

   **Important:** Use the App Password, NOT your regular Gmail password!

## 🧪 Step 4: Test the Configuration

Create a test script to verify your Gmail setup:

```bash
# Create test script
cat > test-email.js << 'EOF'
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    console.log('✅ Gmail configuration is working!');
    
    // Send test email
    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'Test Email from Portfolio',
      text: 'This is a test email from your portfolio contact form setup.',
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('❌ Gmail configuration error:', error.message);
  }
}

testEmail();
EOF

# Run the test
node test-email.js

# Clean up
rm test-email.js
```

## 🚀 Step 5: Deploy to Production

For production deployment (Vercel, Netlify, etc.), add these environment variables:

### Vercel
1. Go to your project dashboard
2. Navigate to Settings > Environment Variables
3. Add:
   - `GMAIL_USER` = your-email@gmail.com
   - `GMAIL_APP_PASSWORD` = your_16_character_app_password

### Netlify
1. Go to Site settings > Environment variables
2. Add the same variables as above

## 📧 How It Works

When someone submits the contact form:

1. **Form validation** - Checks required fields and email format
2. **Email sent** - Beautiful HTML email sent to your Gmail
3. **Database saved** - Message also saved to Supabase (backup)
4. **User feedback** - Success/error message shown to user

## 🎨 Email Features

The contact form emails include:
- **Professional HTML design** with your brand colors
- **Responsive layout** that works on all devices
- **Contact details** (name, email, message)
- **Timestamp** of when the message was received
- **Reply-to functionality** (click email to reply)

## 🔧 Troubleshooting

### Common Issues:

**"Invalid login" error:**
- Make sure you're using the App Password, not your regular password
- Verify 2FA is enabled on your Google account
- Check that the App Password was copied correctly (16 characters)

**"Less secure app access" error:**
- This shouldn't happen with App Passwords
- Make sure you're using App Passwords, not regular passwords

**"Connection timeout" error:**
- Check your internet connection
- Verify Gmail SMTP settings are correct
- Try again in a few minutes

### Debug Mode:
Add this to your `.env.local` for detailed logging:
```env
NODE_ENV=development
```

## 🔒 Security Notes

- **Never commit** `.env.local` to version control
- **App Passwords** are safer than regular passwords
- **Rotate passwords** periodically for security
- **Monitor access** in your Google Account activity

## 📱 Mobile Setup

The contact form works on all devices:
- **Desktop** - Full form with all features
- **Mobile** - Responsive design, touch-friendly
- **Tablet** - Optimized layout for medium screens

## ✅ Verification Checklist

- [ ] 2-Factor Authentication enabled
- [ ] App Password generated and copied
- [ ] Environment variables configured
- [ ] Test email sent successfully
- [ ] Contact form working on website
- [ ] Emails received in Gmail
- [ ] Production environment variables set

## 🆘 Need Help?

If you're having issues:
1. Check the console logs for error messages
2. Verify your App Password is correct
3. Test with the provided test script
4. Make sure 2FA is enabled
5. Check your Gmail account for any security alerts

Your contact form is now ready to send beautiful emails directly to your Gmail! 🎉
