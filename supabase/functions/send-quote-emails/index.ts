import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GOOGLE_MAIL_API_KEY = Deno.env.get("GOOGLE_MAIL_API_KEY");
const GMAIL_SEND_URL =
  "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send";
const BUSINESS_EMAIL = "Simplydeliciousmeals4you@gmail.com";

const b64 = (s: string) =>
  btoa(
    Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(
      "",
    ),
  );
const b64url = (s: string) =>
  b64(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const header = (v: string) =>
  /^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`;

function createRawEmail(to: string, subject: string, body: string): string {
  const email = [
    `To: ${to}`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  return b64url(email);
}

async function sendViaGmail(to: string, subject: string, body: string) {
  const res = await fetch(GMAIL_SEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_MAIL_API_KEY!,
    },
    body: JSON.stringify({ raw: createRawEmail(to, subject, body) }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Gmail send failed [${res.status}]: ${errorBody}`);
    throw new Error(`Gmail send failed [${res.status}]: ${errorBody}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead } = await req.json();

    if (!lead || !lead.email || !lead.full_name) {
      return new Response(JSON.stringify({ error: "Missing lead data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
      console.error("Missing LOVABLE_API_KEY or GOOGLE_MAIL_API_KEY");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const isQuickQuestion = lead.source === "quick_question";

    // Auto-response to the person who submitted
    const autoSubject = isQuickQuestion
      ? "We Received Your Message"
      : "We Received Your Catering Request";
    const autoBody = [
      `Hello ${lead.full_name},`,
      "",
      "Thank you for contacting Simply Delicious Catering.",
      isQuickQuestion
        ? "We have received your message and will get back to you soon."
        : "We have received your request and a member of our team will review your event details and follow up shortly.",
      "",
      "We look forward to helping you create a successful and memorable event.",
      "",
      "Simply Delicious Catering",
      "208-757-8222",
    ].join("\r\n");

    await sendViaGmail(lead.email, autoSubject, autoBody);

    // Notification to the business owner
    const notifySubject = isQuickQuestion
      ? `New Website Message from ${lead.full_name}`
      : `New Catering Quote Request from ${lead.full_name}`;
    const lines = [
      isQuickQuestion
        ? "New message received through the website contact form."
        : "New catering inquiry received.",
      "",
      `Name: ${lead.full_name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone || "N/A"}`,
    ];
    if (!isQuickQuestion) {
      lines.push(
        `Event Type: ${lead.event_type || "N/A"}`,
        `Event Date: ${lead.event_date || "N/A"}`,
        `Guest Count: ${lead.guest_count || "N/A"}`,
        `City: ${lead.event_city || "N/A"}`,
      );
    }
    lines.push(`Message: ${lead.message || "N/A"}`, "", "Follow up promptly.");

    await sendViaGmail(BUSINESS_EMAIL, notifySubject, lines.join("\r\n"));

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
