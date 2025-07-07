import { Slot } from "./slot"
import type { HTMLAttributes } from "react"

export const ButtonSlot = ({ asChild, ...props }: { asChild: boolean } & HTMLAttributes<HTMLButtonElement>) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp {...props} />
}