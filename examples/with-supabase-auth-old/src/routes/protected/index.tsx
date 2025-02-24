// import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { redirect } from "@solidjs/router";
import { createResource } from "solid-js";
import { createClient } from "~/util/supabase/client";

export default function ProtectedPage() {
    const supabase = createClient();

    console.log("Protected Page Found!")

    const [user] = createResource(async () => {
        const response = await supabase.auth.getUser();
        return response.data
    });

    // if (!user) {
    //     return redirect("/sign-in");
    // }

    console.log("User: ", JSON.stringify(user, null, 2))

    return (
        <div class="flex-1 w-full flex flex-col gap-12">
            <div class="w-full">
                <div class="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                    This is a protected page that you can only see as an authenticated
                    user
                </div>
            </div>
            <div class="flex flex-col gap-2 items-start">
                <h2 class="font-bold text-2xl mb-4">Your user details</h2>
                <pre class="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </div>
    );
}
