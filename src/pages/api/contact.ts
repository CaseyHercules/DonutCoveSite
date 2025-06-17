import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse JSON data instead of FormData
    const data = await request.json();
    const {
      firstName,
      lastName,
      email,
      company,
      projectType,
      message,
      privacy,
    } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !message || !privacy) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please fill in all required fields",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Please enter a valid email address",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check for Resend API key
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service is not configured. Please try again later.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
            .value { background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #3b82f6; }
            .message { background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #8b5cf6; }
            .footer { color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🍩 New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">From donutcove.com</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${company || "Not provided"}</div>
              </div>
              
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${projectType || "Not selected"}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="message">${message.replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="footer">
                This message was sent through the contact form on donutcove.com
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
New contact form submission from Donut Cove website:

Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || "Not provided"}
Project Type: ${projectType || "Not selected"}

Message:
${message}

---
This message was sent through the contact form on donutcove.com
    `.trim();

    try {
      // Send email using Resend
      await resend.emails.send({
        from: "Donut Cove Contact <noreply@donutcove.com>",
        to: ["info@donutcove.com"],
        replyTo: email,
        subject: `New Contact Form: ${firstName} ${lastName}${company ? ` from ${company}` : ""}`,
        html: htmlContent,
        text: textContent,
      });

      // Return success response
      return new Response(
        JSON.stringify({
          success: true,
          message: "Thank you for your message! We'll get back to you soon.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (emailError) {
      console.error("Resend email error:", emailError);

      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Failed to send email. Please try again or email us directly at info@donutcove.com",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Something went wrong. Please try again or email us directly at info@donutcove.com",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
