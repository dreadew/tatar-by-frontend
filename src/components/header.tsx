'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from './ui/logo'

export const Header = () => {
	return (
		<motion.header
			initial={{
				opacity: 0,
				y: -20,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: -20,
			}}
			transition={{
				duration: 0.75,
			}}
			className='px-2 md:px-4 lg:px-6 xl:px-36 py-4 fixed top-0 left-0'
		>
			<nav>
				<Link className='hover:opacity-80 transition-opacity' href={'/'}>
					<Logo />
				</Link>
			</nav>
		</motion.header>
	)
}
