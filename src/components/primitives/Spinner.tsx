import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export const spinnerVariants = cva('animate-spin inline-block shrink-0', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    variant: {
      default: 'text-text-muted',
      accent: 'text-accent dark:text-accent-text',
      current: 'text-current',
      inverted: 'text-accent-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'current',
  },
})

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading', ...props }, ref) => {
    return (
      <span className="inline-flex items-center justify-center" role="status" aria-label={label}>
        <Loader2
          ref={ref}
          className={cn(spinnerVariants({ size, variant }), className)}
          aria-hidden="true"
          {...props}
        />
        <span className="sr-only">{label}</span>
      </span>
    )
  },
)

Spinner.displayName = 'Spinner'
