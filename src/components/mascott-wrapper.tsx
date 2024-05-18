import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import Image from 'next/image'
import img1 from '../../public/mascott.png'

interface IMascottWrapper {
	text?: string | React.ReactNode
	className?: string
}

export const MascottWrapper = ({
	text = 'Добро пожаловать на нашу платформу',
	className,
}: IMascottWrapper) => {
	return (
		<section className='relative'>
			{text && (
				<motion.h2
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
						delay: 0.5,
					}}
					className='absolute text-sm xl:text-3xl font-bold bg-foreground p-4 rounded-xl shadow-xl -top-8 -left-36 mr-20 xl:-top-36 xl:-left-1/2'
				>
					{text}
				</motion.h2>
			)}
			<Image
				className={cn('h-full xl:w-[350px] w-[125px]', className)}
				width={350}
				src={img1}
				alt='mascott'
			/>
		</section>
	)
}
