import { FormMessage, Message } from "~/components/form-message";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { SubmitButton } from "~/components/submit-button";
import { signUpAction } from "~/util/supabase/actions";

export default function Signup({ searchParams }: { searchParams: Message }) {
    if ("message" in searchParams) {
        return (
            <div class="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <form action={signUpAction} class="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 class="text-2xl font-medium">Sign up</h1>
            <p class="text-sm text text-foreground">
                Already have an account?{" "}
                <a class="text-primary font-medium underline" href="/sign-in">
                    Sign in
                </a>
            </p>
            <div class="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label for="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    minLength={6}
                    required
                />
                <SubmitButton pendingText="Signing up...">
                    Sign up
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>
    );
}
