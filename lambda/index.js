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
      subject: "Email Verification",
      
      text: `Click the following link to verify your email: ${verificationLink}`,
      html: `<p>Click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
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