'use client'

import { cn } from '@/utils/cn'
import React, { useId } from 'react'
import { WarningIcon } from './input'

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	wrapperClassName?: string
	labelClassName?: string
	error?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, wrapperClassName, labelClassName, error, ...props }, ref) => {
		const id = useId()
		return (
			<div className={cn('flex flex-col gap-1', wrapperClassName)}>
				<label
					className={cn(
						'text-sm text-neutral-dark font-semibold',
						labelClassName
					)}
					htmlFor={id}
				>
					{props.placeholder}
				</label>
				<div className='relative'>
					<textarea
						id={id}
						className={cn(
							'flex w-full min-h-[250px] max-h-[300px] rounded-lg border border-neutral-light px-3 py-3 text-sm font-medium placeholder:text-neutral-gray disabled:cursor-not-allowed disabled:opacity-50 ring-none outline-none focus:border-neutral-gray hover:border-neutral-dark transition-colors duration-300',
							error &&
								'border-red-700 text-red-700 placeholder:text-red-700 bg-red-900/5',
							className
						)}
						{...props}
						ref={ref}
					/>
				</div>
				{error && (
					<span className='text-red-700 mt-1 text-xs font-medium flex items-center gap-2 whitespace-nowrap'>
						{<WarningIcon />}
						{error}
					</span>
				)}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'

export { TextArea }
