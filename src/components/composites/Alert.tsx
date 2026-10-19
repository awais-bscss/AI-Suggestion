import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, Info } from 'lucide-react'
import { cn } from '../../lib/cn'

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm transition-colors flex items-start gap-3',
  {
    variants: {
      variant: {
        destructive: 'border-destructive/30 bg-destructive-subtle text-text-primary',
        info: 'border-info/30 bg-info-subtle text-text-primary',
      },
    },
    defaultVariants: {
      variant: 'destructive',
    },
  },
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'destructive', title, children, ...props }, ref) => {
    const isError = variant === 'destructive'

    return (
      <div
        ref={ref}
        role={isError ? 'alert' : 'status'}
        aria-live={isError ? 'assertive' : 'polite'}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {isError ? (
          <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" aria-hidden="true" />
        ) : (
          <Info size={18} className="text-info shrink-0 mt-0.5" aria-hidden="true" />
        )}

        <div className="flex-1 space-y-0.5 text-left">
          {title && (
            <h5 className="font-semibold text-[15px] leading-tight text-text-primary">
              {title}
            </h5>
          )}
          {children && (
            <div className="text-sm text-text-secondary leading-relaxed">{children}</div>
          )}
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
