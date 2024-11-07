export type Message =
    | { success: string }
    | { error: string }
    | { message: string };

export function FormMessage(props: { message: Message }) {
    return (
        <div class="flex flex-col gap-2 w-full max-w-md text-sm">
            {"success" in props.message && (
                <div class="text-foreground border-l-2 border-foreground px-4">
                    {props.message.success}
                </div>
            )}
            {"error" in props.message && (
                <div class="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
                    {props.message.error}
                </div>
            )}
            {"message" in props.message && (
                <div class="text-foreground border-l-2 px-4">{props.message.message}</div>
            )}
        </div>
    );
}
