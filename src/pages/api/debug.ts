import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    // Check environment variables
    const resendApiKey = import.meta.env.RESEND_API_KEY;

    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: import.meta.env.MODE,
      hasResendKey: !!resendApiKey,
      resendKeyLength: resendApiKey ? resendApiKey.length : 0,
      resendKeyPrefix: resendApiKey
        ? resendApiKey.substring(0, 8) + "..."
        : "NOT_SET",
      nodeVersion:
        typeof process !== "undefined" ? process.version : "Not available",
      // Don't expose the actual key for security
    };

    return new Response(JSON.stringify(debugInfo, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify(
        {
          error: "Debug endpoint failed",
          message: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        },
        null,
        2
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
