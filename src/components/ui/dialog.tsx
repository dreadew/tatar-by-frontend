'use client'

import { useRef } from 'react'
import { Button } from './button'

interface IDialog {
	children: React.ReactNode
	text?: React.ReactNode | string
	block?: React.ReactNode
	variant?: 'default' | 'outline'
}

export const Dialog = ({
	children,
	text,
	block,
	variant = 'default',
}: IDialog) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	return (
		<>
			{text && (
				<Button
					variant={variant}
					onClick={() => dialogRef.current?.showModal()}
				>
					{text}
				</Button>
			)}
			{block && (
				<div
					className='cursor-pointer hover:opacity-90 transition-opacity'
					onClick={() => dialogRef.current?.showModal()}
				>
					{block}
				</div>
			)}
			<dialog
				ref={dialogRef}
				className='inset-0 min-w-[350px] xl:min-w-[500px] block w-max translate-y-20 rounded-2xl p-6 opacity-0 transition-[opacity,transform] duration-300 backdrop:backdrop-blur-sm [&:not([open])]:pointer-events-none [&[open]]:translate-y-0 [&[open]]:opacity-100'
				onClick={ev => {
					const target = ev.target as HTMLDialogElement
					if (target.nodeName === 'DIALOG') {
						target.close()
					}
				}}
			>
				<main className='relative'>
					<button
						className='absolute right-0 -top-2 p-1 rounded-xl border border-neutral-secondary hover:bg-neutral-light/10 transition-colors z-10'
						type='button'
						onClick={() => dialogRef.current?.close()}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-4 h-4 stroke-neutral-dark'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>
					{children}
				</main>
			</dialog>
		</>
	)
}
