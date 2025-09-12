import nodemailer from 'nodemailer';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter with Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });
  }

  async sendContactMessage(contactData: ContactMessage): Promise<boolean> {
    try {
      const { name, email, message } = contactData;
      
      const emailOptions: EmailOptions = {
        to: process.env.GMAIL_USER || 'your-email@gmail.com',
        subject: `New Contact Form Message from ${name}`,
        html: this.generateContactEmailHTML(contactData),
        text: this.generateContactEmailText(contactData),
      };

      const result = await this.transporter.sendMail(emailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  private generateContactEmailHTML(contactData: ContactMessage): string {
    const { name, email, message } = contactData;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Message</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #7C5CFF, #00D4A0);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              margin: -30px -30px 30px -30px;
              text-align: center;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 6px;
              border-left: 4px solid #7C5CFF;
            }
            .field-label {
              font-weight: bold;
              color: #555;
              margin-bottom: 5px;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 0.5px;
            }
            .field-value {
              color: #333;
              word-wrap: break-word;
            }
            .message-content {
              white-space: pre-wrap;
              background: white;
              padding: 15px;
              border-radius: 4px;
              border: 1px solid #e0e0e0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .timestamp {
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Message</h1>
              <p>Someone has reached out through your portfolio website</p>
            </div>
            
            <div class="field">
              <div class="field-label">From</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #7C5CFF; text-decoration: none;">
                  ${email}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Message</div>
              <div class="message-content">${message}</div>
            </div>
            
            <div class="footer">
              <p>This message was sent from your portfolio contact form</p>
              <p class="timestamp">Received: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateContactEmailText(contactData: ContactMessage): string {
    const { name, email, message } = contactData;
    
    return `
New Contact Form Message
========================

From: ${name}
Email: ${email}
Time: ${new Date().toLocaleString()}

Message:
--------
${message}

---
This message was sent from your portfolio contact form.
    `.trim();
  }

  // Test email configuration
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service is ready');
      return true;
    } catch (error) {
      console.error('Email service configuration error:', error);
      return false;
    }
  }
}

export default EmailService;
