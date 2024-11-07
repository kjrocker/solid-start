import { splitProps, JSX } from 'solid-js';
import { cn } from "~/util/cn";

interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> { }

export const Label = (props: LabelProps) => {
    const [local, labelProps] = splitProps(props, ['class']);
    return (
        <label {...labelProps} class={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", local.class)} />
    );
};

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> { }

export const Input = (props: InputProps) => {
    const [local, inputProps] = splitProps(props, ['class']);
    return (
        <input {...inputProps} class={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", local.class)} />
    );
};