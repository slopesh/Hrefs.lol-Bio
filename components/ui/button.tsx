import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-poppins",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-400 shadow-sm hover:shadow-md active:scale-95",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400 shadow-sm hover:shadow-md active:scale-95",
        outline: "border border-dark-200 bg-transparent hover:bg-dark-200 hover:text-white focus-visible:ring-dark-400 shadow-sm hover:shadow-md active:scale-95",
        secondary: "bg-dark-200 text-white hover:bg-dark-300 focus-visible:ring-dark-400 shadow-sm hover:shadow-md active:scale-95",
        ghost: "bg-transparent hover:bg-dark-200 hover:text-white focus-visible:ring-dark-400",
        link: "text-primary-500 underline-offset-4 hover:underline focus-visible:ring-primary-400",
        gradient: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus-visible:ring-primary-400 shadow-sm hover:shadow-md active:scale-95",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 focus-visible:ring-white/40 shadow-sm hover:shadow-md active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
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
