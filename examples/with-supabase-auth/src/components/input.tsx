import { splitProps, JSX } from 'solid-js';
import { cn } from "~/util/cn";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> { }

export const Input = (props: InputProps) => {
    const [local, inputProps] = splitProps(props, ['class']);
    return (
        <input {...inputProps} class={cn("flex h-10 w-full text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", local.class)} />
    );
};