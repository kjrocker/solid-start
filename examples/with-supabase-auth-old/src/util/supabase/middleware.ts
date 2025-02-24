import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIEvent } from "@solidjs/start/server";
import { createMiddleware } from "@solidjs/start/middleware";
import { redirect } from "@solidjs/router";

const getIsProtected = (request: APIEvent['request']): boolean => false

export default createMiddleware({
  onRequest: [
    async event => {
      const supabase = createServerClient(
        process.env.VITE_SUPABASE_URL!,
        process.env.VITE_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              const cookies = event.request.headers.get('Cookie') ?? ''
              const parsed = parseCookieHeader(cookies);
              console.log('Middleware cookies', cookies, parsed);
              return parsed;
            },
            setAll(cookiesToSet: { name: string, value: string }[]) {
              console.log('Middleware cookiesToSet', cookiesToSet);

              cookiesToSet.forEach(({ name, value }: { name: string, value: string }) => {
                event.request.headers.append('Set-Cookie', `${name}=${value}`);
              });

              cookiesToSet.forEach(({ name, value }: { name: string, value: string }) => {
                event.response.headers.append('Set-Cookie', `${name}=${value}`);
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