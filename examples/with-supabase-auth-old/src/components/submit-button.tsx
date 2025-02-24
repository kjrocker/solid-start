import { splitProps, JSX, ParentComponent } from 'solid-js';
import { cn } from "~/util/cn";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    pendingText?: string
}

export const SubmitButton = (props: ButtonProps) => {
    const [local, buttonProps] = splitProps(props, ['class']);
    return (
        <button {...buttonProps} type="submit" class={cn("h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", local.class)} />
    );
};

