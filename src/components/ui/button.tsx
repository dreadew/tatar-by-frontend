import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
	'flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all',
	{
		variants: {
			variant: {
				default: 'bg-accent-green text-neutral-dark hover:bg-accent-green/70',
				outline:
					'border text-neutral-dark border-neutral-secondary hover:border-neutral-light hover:bg-neutral-light/10',
			},
			size: {
				default: 'px-4 py-3',
				sm: 'px-3 py-2',
				lg: 'px-8 py-6',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'

export { Button, buttonVariants }
