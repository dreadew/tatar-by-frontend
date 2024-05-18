'use client'

import React, { useId, useState } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelClassName?: string
	wrapperClassName?: string
	error?: string
	state?: boolean
	setState?: (a: boolean) => void
}

interface IconProps {
	className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			labelClassName,
			wrapperClassName,
			state = true,
			error,
			setState,
			...props
		},
		ref
	) => {
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
					<input
						id={id}
						type={type === 'password' ? (state ? 'text' : 'password') : type}
						className={cn(
							'flex w-full rounded-lg border border-neutral-light px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium font-medium placeholder:text-neutral-gray disabled:cursor-not-allowed disabled:opacity-50 ring-none outline-none focus:border-neutral-gray hover:border-neutral-dark transition-colors duration-300',
							type === 'date' && 'text-neutral-light',
							error &&
								'border-red-700 text-red-700 placeholder:text-red-700 bg-red-900/5',
							className
						)}
						{...props}
						ref={ref}
					/>
					{type === 'password' && setState && typeof state !== 'undefined' && (
						<button
							className='absolute right-0 top-1/2 -translate-y-1/2 h-full rounded-r-lg px-4 border-l border-l-neutral-light hover:bg-neutral-light/10 transition-colors'
							onClick={() => setState(!state)}
							type='button'
						>
							{state ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									className='w-5 h-5'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									className='w-5 h-5'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
									/>
								</svg>
							)}
						</button>
					)}
					{type === 'date' && (
						<button
							className='absolute right-0 top-1/2 -translate-y-1/2 h-full rounded-r-lg px-4 border-l border-l-neutral-light hover:bg-neutral-light/10 transition-colors'
							type='button'
							onClick={() => document.getElementById(id)?.focus()}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
								/>
							</svg>
						</button>
					)}
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

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ ...props }, ref) => {
		const [show, setShow] = useState<boolean>(false)

		return <Input state={show} setState={setShow} ref={ref} {...props} />
	}
)

export const WarningIcon = ({ className }: IconProps) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='currentColor'
			className={cn('h-4 w-4', className)}
		>
			<path
				fillRule='evenodd'
				d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
				clipRule='evenodd'
			/>
		</svg>
	)
}

Input.displayName = 'Input'

export { Input, PasswordInput }
