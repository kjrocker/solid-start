import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIEvent } from "@solidjs/start/server";

export const createClient = (event: APIEvent) => {
  const cookies = parseCookieHeader(event.request.headers.get('Cookie') ?? '');

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
              event.response.headers.set('Set-Cookie', `${name}=${value}`);
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
