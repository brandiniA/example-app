import React from "react";

interface SlotProps {
    children: React.ReactElement;
    [key: string]: unknown;
}

// Slot component that delegates rendering to its child
export const Slot = React.forwardRef<unknown, SlotProps>(
    ({ children, ...props }, ref) => {
        const child = React.Children.only(children);
        
        return React.cloneElement(child, {
            ...props,
            ...child.props,
            ref: ref,
        });
    }
);

Slot.displayName = "Slot";