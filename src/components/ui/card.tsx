'use client'

import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from './logo'

interface ICard {
	title: string | React.ReactElement
	desc?: string | React.ReactElement
	children: React.ReactElement
	redirectText?: string | React.ReactElement
	href?: string
	className?: string
}

export const Card = ({
	title,
	desc,
	children,
	redirectText,
	href,
	className,
}: ICard) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 20,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: 20,
			}}
			transition={{
				duration: 0.75,
			}}
			className={cn(
				'w-full flex flex-col gap-y-4 bg-foreground p-10 rounded-2xl shadow-xl',
				className
			)}
		>
			<div className='flex flex-col items-center gap-y-2'>
				<Logo />
				<div className='flex flex-col gap-y-1 items-center justify-center'>
					<h2 className='text-2xl font-bold text-neutral-dark'>{title}</h2>
					<p className='text-sm text-neutral-light line-clamp-3 leading-6 text-center'>
						{desc}
					</p>
				</div>
			</div>
			{children}
			{href && (
				<Link
					className='text-xs font-medium text-neutral-gray text-center transition-opacity hover:opacity-80'
					href={href}
				>
					{redirectText}
				</Link>
			)}
		</motion.div>
	)
}
