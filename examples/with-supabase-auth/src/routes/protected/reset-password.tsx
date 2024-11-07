import { FormMessage, Message } from "~/components/form-message";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { SubmitButton } from "~/components/submit-button";
import { resetPasswordAction } from "~/util/supabase/actions";

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: Message;
}) {
    return (
        <form action={resetPasswordAction} class="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
            <h1 class="text-2xl font-medium">Reset password</h1>
            <p class="text-sm text-foreground/60">
                Please enter your new password below.
            </p>
            <Label for="password">New password</Label>
            <Input
                type="password"
                name="password"
                placeholder="New password"
                required
            />
            <Label for="confirmPassword">Confirm password</Label>
            <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
            />
            <SubmitButton>
                Reset password
            </SubmitButton>
            <FormMessage message={searchParams} />
        </form>
    );
}
