import { A, createAsync, useLocation } from "@solidjs/router";
import { Suspense } from "solid-js";
import { getUser, signOutAction } from "~/util/supabase/actions";

export function Navigation() {
  const location = useLocation();
  const user = createAsync(() => getUser());
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-sky-800">
      <Suspense fallback={<div>Loading...</div>}>
        <ul class="container flex items-center p-3 text-gray-200">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <A href="/">Home</A>
          </li>
          <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
            <A href="/about">About</A>
          </li>
          <li class={`border-b-2 ${active("/protected")} mx-1.5 sm:mx-6`}>
            <A href="/protected">Protected</A>
          </li>
          {user() ? (
            <form action={signOutAction} method="post">
              <button type="submit" formAction={signOutAction} class={`border-b-2 mx-1.5 sm:mx-6`}>Sign Out</button>
            </form>
          ) : (
            <>
              <li class={`border-b-2 ${active("/sign-up")} mx-1.5 sm:mx-6`}>
                <A href="/sign-up">Sign Up</A>
              </li>
              <li class={`border-b-2 ${active("/sign-in")} mx-1.5 sm:mx-6`}>
                <A href="/sign-in">Sign In</A>
              </li>
            </>
          )}
        </ul>
      </Suspense>
    </nav>
  );
}
