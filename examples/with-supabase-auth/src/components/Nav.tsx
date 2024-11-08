import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/sign-in")} mx-1.5 sm:mx-6`}>
          <a href="/sign-in">Login</a>
        </li>
        <li class={`border-b-2 ${active("/sign-up")} mx-1.5 sm:mx-6`}>
          <a href="/sign-up">Register</a>
        </li>
        <li class={`border-b-2 ${active("/forgot-password")} mx-1.5 sm:mx-6`}>
          <a href="/forgot-password">Forgot Password</a>
        </li>
        <li class={`border-b-2 ${active("/protected")} mx-1.5 sm:mx-6`}>
          <a href="/protected">Protected</a>
        </li>
      </ul>
    </nav>
  );
}
