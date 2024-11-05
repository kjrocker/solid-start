import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIEvent } from "@solidjs/start/server";
import { createMiddleware } from "@solidjs/start/middleware";
import { redirect } from "@solidjs/router";

const getIsProtected = (request: APIEvent['request']): boolean => true

export default createMiddleware({
  onRequest: [
    async event => {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return parseCookieHeader(event.request.headers.get('Cookie') ?? '')
            },
            setAll(cookiesToSet: { name: string, value: string }[]) {
              cookiesToSet.forEach(({ name, value }: { name: string, value: string }) => {
                event.request.headers.set('Set-Cookie', `${name}=${value}`);
              });

              cookiesToSet.forEach(({ name, value }: { name: string, value: string }) => {
                event.response.headers.set('Set-Cookie', `${name}=${value}`);
              });
            }
          }
        })

      const user = await supabase.auth.getUser();

      // protected routes
      if (getIsProtected(event.request) && user.error) {
        return redirect("/sign-in");
      }
    }
  ]
});