import React from "react";

interface SlotProps {
    children: React.ReactElement;
    [key: string]: unknown;
}

// Slot component that delegates rendering to its child
export const Slot = React.forwardRef<unknown, SlotProps>(
    ({ children, ...props }, ref) => {
        const child = React.Children.only(children) as React.ReactElement;
        
        // Create props object with proper typing
        const childProps: React.JSX.IntrinsicAttributes & { ref?: React.Ref<unknown> } = {
            ...props,
            ...(child.props as object),
        };
        
        // Only add ref if it exists
        if (ref) {
            childProps.ref = ref;
        }
        
        return React.cloneElement(child, childProps);
    }
);

Slot.displayName = "Slot";