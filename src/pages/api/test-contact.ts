import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse JSON data
    const data = await request.json();

    // Check for Resend API key
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "RESEND_API_KEY environment variable is not set",
          debug: {
            hasKey: false,
            environment: import.meta.env.MODE,
            timestamp: new Date().toISOString(),
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Resend
    let resend;
    try {
      resend = new Resend(resendApiKey);
    } catch (resendError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to initialize Resend",
          debug: {
            hasKey: true,
            keyLength: resendApiKey.length,
            keyPrefix: resendApiKey.substring(0, 8) + "...",
            error:
              resendError instanceof Error
                ? resendError.message
                : String(resendError),
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Test email send with minimal data
    try {
      const result = await resend.emails.send({
        from: "Test <noreply@donutcove.com>",
        to: ["info@donutcove.com"],
        subject: "Test Email from Debug Endpoint",
        text: `Test email sent at ${new Date().toISOString()}\nForm data: ${JSON.stringify(data, null, 2)}`,
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Test email sent successfully",
          debug: {
            emailId: result.data?.id,
            timestamp: new Date().toISOString(),
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (emailError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send test email",
          debug: {
            hasKey: true,
            keyLength: resendApiKey.length,
            emailError:
              emailError instanceof Error
                ? {
                    message: emailError.message,
                    name: emailError.name,
                    stack: emailError.stack?.split("\n").slice(0, 3).join("\n"),
                  }
                : String(emailError),
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Unexpected error in test endpoint",
        debug: {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
