import { Slot } from "@radix-ui/react-slot";
import type { CSSProperties, HTMLAttributes } from "react";

const defaultStyles: CSSProperties = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
}

export const ButtonRadditSlot = ({ asChild, ...props }: { asChild: boolean } & HTMLAttributes<HTMLButtonElement>) => {
    const Comp = asChild ? Slot : 'button'
    const styles = {
        ...defaultStyles,
        ...props.style,
    }

    return <Comp {...props} style={styles} />
}