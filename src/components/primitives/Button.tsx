import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { Spinner } from './Spinner'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-foreground hover:bg-accent-hover shadow-xs active:brightness-95',
        secondary:
          'bg-surface-subtle text-text-primary border border-border-default hover:bg-surface-muted shadow-xs active:brightness-95',
        outline:
          'bg-transparent text-text-primary border border-border-default hover:bg-surface-subtle hover:border-border-strong active:bg-surface-muted',
        ghost:
          'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-subtle active:bg-surface-muted',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover shadow-xs active:brightness-95',
      },
      size: {
        sm: 'h-8 px-3 text-[13px] gap-1.5',
        md: 'h-9 px-4 text-sm gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading ? 'true' : undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <Spinner
            size="sm"
            variant={variant === 'primary' || variant === 'destructive' ? 'inverted' : 'current'}
          />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
