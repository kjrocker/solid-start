import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIEvent } from "@solidjs/start/server";

type SupabaseClientEvent = {
  request: APIEvent['request']
  response: APIEvent['response']
}

export const createClient = ({ request, response }: SupabaseClientEvent) => {
  const cookies = parseCookieHeader(request.headers.get('Cookie') ?? '');

  return createServerClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies;
        },
        setAll(cookiesToSet: { name: string, value: string }[]) {
          try {
            cookiesToSet.forEach(({ name, value }: { name: string, value: string }) => {
              response.headers.set('Set-Cookie', `${name}=${value}`);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
