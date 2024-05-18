'use client'

import { DashboardWrapper } from '@/components/dashboard-wrapper'
import { MascottWrapper } from '@/components/mascott-wrapper'
import { motion } from 'framer-motion'

export default function DashboardPage() {
	return (
		<section className='relative h-screen px-3 sm:px-8 lg:pl-28 lg:pr-12 xl:px-36 py-56 pb-96 sm:py-28 xl:py-10 flex flex-col xl:grid xl:grid-cols-3'>
			<motion.section
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
				className='col-span-2 pb-24 xl:pb-0'
			>
				<DashboardWrapper />
			</motion.section>
			<motion.section
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
					delay: 0.25,
				}}
				className='xl:relative xl:-right-10 xl:-top-16 absolute md:right-14 top-12 md:top-14 md:flex md:items-end md:justify-end right-4'
			>
				<MascottWrapper />
			</motion.section>
		</section>
	)
}
