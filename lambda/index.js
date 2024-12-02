const sgMail = require("@sendgrid/mail");

// Load SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    const snsMessage = JSON.parse(event.Records[0].Sns.Message);
    const { email, token } = snsMessage;
    const verificationLink = `http://${process.env.domain_name}/v1/verify?user=${encodeURIComponent(email)}&token=${token}`;

    // Email payload
  const emailOptions = {
    to: snsMessage.email,
    from: process.env.EMAIL_FROM,
    subject: "Verify Your Email Address to Complete Registration",
  
    text: `Dear User,
  
  Thank you for signing up with YourAppName! Please verify your email address by clicking the link below:
  
  ${verificationLink}
  
  This link will expire in 2 minutes. If you didn't create an account with WebApp, please ignore this email.
  
  Best regards,  
  WebApp`,
  
      html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                  <div style="background: #4CAF50; padding: 20px; text-align: center; color: #ffffff;">
                      <h1 style="margin: 0; font-size: 24px;">Welcome to WebApp!</h1>
                  </div>
                  <div style="padding: 20px;">
                      <p style="margin-bottom: 16px; color: #444;">Thank you for creating an account with us! To complete your registration, please verify your email address by clicking the button below:</p>
                      <p style="text-align: center; margin-bottom: 16px;">
                          <a href="${verificationLink}" style="background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px;">Verify Email Address</a>
                      </p>
                      <p style="margin-bottom: 16px; color: #666;">If the button above doesn't work, you can copy and paste the following link into your browser:</p>
                      <p style="word-wrap: break-word; color: #555; background-color: #f4f4f4; padding: 10px; border-radius: 4px; border: 1px solid #ddd;">
                          ${verificationLink}
                      </p>
                      <p style="color: #888; margin-bottom: 16px;">This link will expire in 2 minutes. If you didn’t sign up for this account, you can safely ignore this email.</p>
                  </div>
                  <div style="padding: 20px; border-top: 1px solid #eee; text-align: center; color: #777;">
                      <p style="margin: 0; font-size: 14px;">Need help? Contact us at <a href="mailto:support@"${process.env.domain_name}"" style="color: #4CAF50; text-decoration: none;">support@"${process.env.domain_name}"</a></p>
                      <p style="margin: 0; font-size: 12px;">© 2024 WebApp. All rights reserved.</p>
                  </div>
              </div>
          </div>
      `,
  };
  
    // Send email
    await sgMail.send(emailOptions);
    console.log(`Verification email sent to ${snsMessage.email}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error processing SNS message or sending email:", error);
    throw new Error("Lambda processing failed");
    }
};







// const sgMail = require("@sendgrid/mail");

// // Set SendGrid API Key from environment variables
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.handler = async (event) => {
//   try {
//     // 1. Parse the incoming SNS message
//     const { email, token } = JSON.parse(event.Records[0].Sns.Message);

//     // 2. Generate the verification link
//     const verificationLink = generateVerificationLink(email, token);

//     // 3. Create email content
//     const emailOptions = createEmailContent(email, verificationLink);

//     // 4. Send the email
//     await sendEmail(emailOptions);

//     console.log(`Verification email sent to ${email}`);
//     return { statusCode: 200, body: JSON.stringify({ message: "Email sent successfully" }) };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Lambda processing failed");
//   }
// };

// // Helper function to generate the verification link
// function generateVerificationLink(email, token) {
//   return `https://${process.env.domain_name}/v1/verify?user=${encodeURIComponent(email)}&token=${token}`;
// }

// // Helper function to create email content
// function createEmailContent(email, verificationLink) {
//   return {
//     to: email,
//     from: process.env.EMAIL_FROM,
//     subject: "Verify Your Email Address to Complete Registration",
//     text: `Please verify your email by clicking the link: ${verificationLink}`,
//     html: `
//       <div>
//         <p>Thank you for signing up!</p>
//         <p>Please verify your email address by clicking the link below:</p>
//         <a href="${verificationLink}">Verify Email</a>
//       </div>
//     `,
//   };
// }

// // Helper function to send an email using SendGrid
// async function sendEmail(emailOptions) {
//   await sgMail.send(emailOptions);
// }
