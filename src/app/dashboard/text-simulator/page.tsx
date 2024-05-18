'use client'

import { TextSimulatorWrapper } from '@/components/simulator-wrapper'
import { motion } from 'framer-motion'

export default function TextSimulatorPage() {
	return (
		<motion.main
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
			className='relative px-3 sm:px-8 lg:pl-28 lg:pr-12 xl:px-36 py-8 xl:py-10 h-screen flex flex-col'
		>
			<TextSimulatorWrapper text={<>Симулятор проверки текстов</>} />
		</motion.main>
	)
}
