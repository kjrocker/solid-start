import { type RouteDefinition, useSearchParams } from "@solidjs/router";
import { FormMessage, Message } from "~/components/form-message";
import { getProtectedUser, resetPasswordAction } from "~/util/supabase/actions";

export const route = {
    preload() { getProtectedUser() }
} satisfies RouteDefinition;

export default function ResetPassword() {
    const [searchParams] = useSearchParams<Message>();
    return (
        <form action={resetPasswordAction} class="flex flex-col min-w-64 max-w-64 mx-auto gap-2" method="post">
            <h1 class="text-2xl font-medium">Reset password</h1>
            <p class="text-sm text-foreground/60">
                Please enter your new password below.
            </p>
            <label for="password">New password</label>
            <input
                type="password"
                name="password"
                class="text-black"
                placeholder="New password"
                required
            />
            <label for="confirmPassword">Confirm password</label>
            <input
                type="password"
                name="confirmPassword"
                class="text-black"
                placeholder="Confirm password"
                required
            />
            <button formAction={resetPasswordAction} type="submit">
                Reset password
            </button>
            <FormMessage message={searchParams} />
        </form>
    );
}
