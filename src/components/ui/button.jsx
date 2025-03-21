import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-teal-600/50  text-teal-50 hover:bg-teal-500/50 active:bg-teal-400/50",
        ghost: "bg-transparent text-teal-50 hover:bg-teal-300/30 active:bg-teal-200/30",
        text: "bg-transparent text-teal-50 hover:text-teal-100 active:text-teal-200"
      },
      size: {
        default: "h-8 px-4 py-1",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
