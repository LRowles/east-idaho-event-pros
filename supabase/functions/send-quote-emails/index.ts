import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const BUSINESS_EMAIL = "Simplydeliciousmeals4you@gmail.com";

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

    // If no RESEND_API_KEY, just log and return success
    if (!RESEND_API_KEY) {
      console.log("No RESEND_API_KEY configured. Skipping emails.");
      console.log("Would send auto-response to:", lead.email);
      console.log("Would send notification to:", BUSINESS_EMAIL);
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send auto-response to client
    const autoResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Simply Delicious Catering <noreply@simplydeliciouscatering.com>",
        to: [lead.email],
        subject: "We Received Your Catering Request",
        html: `<p>Hello,</p>
<p>Thank you for contacting Simply Delicious Catering.</p>
<p>We have received your request and a member of our team will review your event details and follow up shortly.</p>
<p>We look forward to helping you create a successful and memorable event.</p>
<p>Simply Delicious Catering</p>`,
      }),
    });

    // Send internal notification
    const internalNotification = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Simply Delicious Catering <noreply@simplydeliciouscatering.com>",
        to: [BUSINESS_EMAIL],
        subject: "New Catering Quote Request",
        html: `<p>New catering inquiry received.</p>
<p><strong>Name:</strong> ${lead.full_name}</p>
<p><strong>Email:</strong> ${lead.email}</p>
<p><strong>Phone:</strong> ${lead.phone || "N/A"}</p>
<p><strong>Event Type:</strong> ${lead.event_type || "N/A"}</p>
<p><strong>Event Date:</strong> ${lead.event_date || "N/A"}</p>
<p><strong>Guest Count:</strong> ${lead.guest_count || "N/A"}</p>
<p><strong>City:</strong> ${lead.event_city || "N/A"}</p>
<p><strong>Message:</strong> ${lead.message || "N/A"}</p>
<p>Review in dashboard and follow up promptly.</p>`,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
