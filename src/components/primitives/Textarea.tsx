import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

export const textareaVariants = cva(
  'w-full rounded-md border bg-surface text-text-primary text-[15px] placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-subtle',
  {
    variants: {
      size: {
        sm: 'min-h-[70px] p-2 text-sm',
        md: 'min-h-[90px] p-3 text-[15px]',
      },
      isInvalid: {
        true: 'border-destructive focus-visible:ring-destructive',
        false: 'border-border-default hover:border-border-strong focus-visible:border-accent dark:focus-visible:border-accent-text focus-visible:ring-ring',
      },
    },
    defaultVariants: {
      size: 'md',
      isInvalid: false,
    },
  },
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  isInvalid?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, isInvalid = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={isInvalid ? 'true' : undefined}
        className={cn(textareaVariants({ size, isInvalid }), className)}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
