import { useSearchParams } from "@solidjs/router";
import { FormMessage, Message } from "~/components/form-message";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { SubmitButton } from "~/components/submit-button";
import { forgotPasswordAction } from "~/util/supabase/actions";


export default function ForgotPassword() {
    const [searchParams] = useSearchParams<Message>();
    return (
        <form action={forgotPasswordAction} class="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto" method="post">
            <div>
                <h1 class="text-2xl font-medium">Reset Password</h1>
                <p class="text-sm text-secondary-foreground">
                    Already have an account?{" "}
                    <a class="text-primary underline" href="/sign-in">
                        Sign in
                    </a>
                </p>
            </div>
            <div class="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label for="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <SubmitButton formAction={forgotPasswordAction}>
                    Reset Password
                </SubmitButton>
                <FormMessage message={searchParams} />
            </div>
        </form>

    );
}
