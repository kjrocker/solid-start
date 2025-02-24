import { createClient } from "~/util/supabase/server";
import type { APIEvent } from "@solidjs/start/server";
import { redirect } from "@solidjs/router";

export async function GET(event: APIEvent) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // NextJS Equivalent: https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(event.request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = createClient(event);
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) {
    return redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return redirect(`${origin}/protected`);
}
