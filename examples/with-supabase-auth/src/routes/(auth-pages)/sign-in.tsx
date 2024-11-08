import { useSearchParams } from "@solidjs/router";
import { FormMessage, Message } from "~/components/form-message";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { SubmitButton } from "~/components/submit-button";
import { signInAction } from "~/util/supabase/actions";

export default function Login() {
    const [searchParams] = useSearchParams<Message>();
    return (
        <form action={signInAction} class="flex flex-col min-w-64 max-w-64 mx-auto" method="post">
            <h1 class="text-2xl font-medium">Sign in</h1>
            <p class="text-sm text-foreground">
                Don't have an account?{" "}
                <a class="text-foreground font-medium underline" href="/sign-up">
                    Sign up
                </a>
            </p>
            <div class="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label for="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div class="flex justify-between items-center">
                    <Label for="password">Password</Label>
                    <a
                        class="text-xs text-foreground underline"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </a>
                </div>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                />
                <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                    Sign in
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
