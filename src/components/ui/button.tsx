import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-sm hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        outline: "border-2 border-border text-foreground bg-transparent hover:bg-foreground hover:text-background hover:border-foreground rounded-full",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        link: "text-foreground underline-offset-4 hover:underline",
        // Premium variants - Enhanced
        premium: "bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold tracking-wide shadow-md hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-0.5",
        premiumOutline: "border-2 border-foreground/20 text-foreground bg-transparent hover:border-foreground hover:bg-foreground hover:text-background rounded-full font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5",
        minimal: "text-foreground hover:text-muted-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground",
      },
      size: {
        default: "h-12 px-7 py-2.5",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-9 text-sm",
        xl: "h-16 px-12 text-base font-semibold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
