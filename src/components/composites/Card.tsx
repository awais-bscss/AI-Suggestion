import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

export const cardVariants = cva(
  'rounded-lg border border-border-default bg-surface text-text-primary shadow-xs transition-all overflow-hidden',
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants(), className)}
        {...props}
      />
    )
  },
)
CardRoot.displayName = 'Card'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between p-5 border-b border-border-subtle', className)}
        {...props}
      />
    )
  },
)
CardHeader.displayName = 'Card.Header'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-base font-semibold leading-none tracking-tight text-text-primary', className)}
        {...props}
      />
    )
  },
)
CardTitle.displayName = 'Card.Title'

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-5', className)} {...props} />
  },
)
CardBody.displayName = 'Card.Body'

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
})
