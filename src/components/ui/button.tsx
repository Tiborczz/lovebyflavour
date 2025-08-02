import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-primary via-accent to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow",
        viral: "bg-gradient-viral text-white font-bold shadow-viral hover:shadow-rainbow animate-viral-pulse",
        pastel: "bg-gradient-pastel text-white font-semibold shadow-pastel hover:shadow-floating",
        neon: "bg-transparent border-2 border-primary text-primary font-bold shadow-neon hover:shadow-glow animate-glow",
        rainbow: "bg-gradient-viral text-white font-bold shadow-rainbow animate-rainbow-shift",
        shimmer: "bg-gradient-to-r from-primary to-accent text-white font-semibold relative overflow-hidden before:absolute before:inset-0 before:bg-shimmer before:animate-shimmer",
        floating: "bg-white/90 backdrop-blur-sm border border-white/20 text-foreground shadow-floating hover:shadow-xl transform hover:-translate-y-1",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-soft hover:shadow-glow",
        gradient: "bg-gradient-hero text-white font-semibold shadow-soft hover:shadow-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
