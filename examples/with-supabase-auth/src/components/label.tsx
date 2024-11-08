import { splitProps, JSX } from 'solid-js';
import { cn } from "~/util/cn";

interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> { }

export const Label = (props: LabelProps) => {
    const [local, labelProps] = splitProps(props, ['class']);
    return (
        <label {...labelProps} class={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", local.class)} />
    );
};

