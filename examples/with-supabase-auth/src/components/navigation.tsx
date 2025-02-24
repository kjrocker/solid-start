import { A, createAsync, useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import { getUser, signOutAction } from "~/util/supabase/actions";

export function Navigation() {
  const location = useLocation();
  const user = createAsync(() => getUser());
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800">
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
        <Show when={user()} fallback={
          <>
            <li class={`border-b-2 ${active("/sign-up")} mx-1.5 sm:mx-6`}>
              <A href="/sign-up">Sign Up</A>
            </li>
            <li class={`border-b-2 ${active("/sign-in")} mx-1.5 sm:mx-6`}>
              <A href="/sign-in">Sign In</A>
            </li>
          </>
        }>
          <form action={signOutAction} method="post">
            <button formAction={signOutAction} class={`border-b-2 mx-1.5 sm:mx-6`} type="submit">Sign Out</button>
          </form>
        </Show>
      </ul>
    </nav>
  );
}
