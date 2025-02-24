import { A, useSearchParams } from "@solidjs/router";
import { FormMessage, Message } from "~/components/form-message";
import { signInAction } from "~/util/supabase/actions";

export default function Login() {
    const [searchParams] = useSearchParams<Message>();
    return (
        <form action={signInAction} class="flex flex-col min-w-64 max-w-64 mx-auto" method="post">
            <h1 class="text-2xl font-medium">Sign in</h1>
            <p class="text-sm text-foreground">
                Don't have an account?{" "}
                <A class="text-foreground font-medium underline" href="/sign-up">
                    Sign up
                </A>
            </p>
            <div class="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <label for="email">Email</label>
                <input name="email" type="email" placeholder="you@example.com" required />
                <div class="flex justify-between items-center">
                    <label for="password">Password</label>
                    <A
                        class="text-xs text-foreground underline"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </A>
                </div>
                <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                />
                <button formAction={signInAction}>
                    Sign in
                </button>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
