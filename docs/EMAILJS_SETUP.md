# EmailJS Setup Guide

## Environment Variables

Add these secrets via Lovable's secrets management (already configured):

- `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID  
- `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

## EmailJS Template

Paste this HTML into your EmailJS template editor at https://dashboard.emailjs.com:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0f0a; font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #0a0f0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0d1410; border: 1px solid #1a2f1a; border-radius: 4px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #1a2f1a;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td>
                    <span style="color: #00ff41; font-size: 14px; font-weight: 600;">sam@terminal</span>
                    <span style="color: #4a5a4a; font-size: 14px;"> ~/inbox</span>
                  </td>
                  <td style="text-align: right;">
                    <span style="color: #4a5a4a; font-size: 12px;">New Message</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Info -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #1a2f1a;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="color: #00cc33; font-size: 13px;">$ from_name:</span>
                    <span style="color: #c8d8c8; font-size: 13px; margin-left: 8px;">{{from_name}}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="color: #00cc33; font-size: 13px;">$ reply_to:</span>
                    <a href="mailto:{{reply_to}}" style="color: #00ff41; font-size: 13px; margin-left: 8px; text-decoration: none;">{{reply_to}}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Content -->
          <tr>
            <td style="padding: 32px;">
              <div style="color: #00cc33; font-size: 13px; margin-bottom: 12px;">$ message:</div>
              <div style="background-color: #0a0f0a; border: 1px solid #1a2f1a; border-radius: 4px; padding: 20px;">
                <p style="color: #c8d8c8; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">{{message}}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #1a2f1a; background-color: #0a0f0a;">
              <p style="color: #4a5a4a; font-size: 11px; margin: 0; text-align: center;">
                This message was sent from the contact form on Sam Ranjith Paul's Portfolio
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

## Template Variables

Make sure your EmailJS template uses these variables:
- `{{from_name}}` - Sender's name
- `{{reply_to}}` - Sender's email address
- `{{message}}` - Message content

## Updating the Template

1. Go to https://dashboard.emailjs.com
2. Navigate to Email Templates
3. Select your template or create a new one
4. Paste the HTML above into the template editor
5. Save the template
