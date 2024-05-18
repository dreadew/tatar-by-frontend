'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MascottWrapper } from './mascott-wrapper'
import { Button } from './ui/button'

export const Hero = () => {
	return (
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
			className='relative h-screen grid lg:grid-cols-2 items-center overflow-hidden'
		>
			<div className='flex flex-col gap-y-4'>
				<h1 className='text-4xl md:text-5xl font-bold text-balance leading-tight text-neutral-dark'>
					Открой мир татарского языка: учи легко и с удовольствием!
				</h1>
				<p className='text-sm md:text-md font-regular text-neutral-light leading-loose text-balance'>
					Наши интерактивные уроки подойдут для всех возрастов: от дошкольников
					до взрослых. С нами вы сможете учить татарский язык в удобное для вас
					время и в любом месте.
				</p>
				<div className='flex flex-wrap w-full gap-2'>
					<Link className='lg:w-max w-full' href='/sign-up'>
						<Button className='w-full'>Начать изучение</Button>
					</Link>
					<Link className='lg:w-max w-full' href={'/sign-in'}>
						<Button className='w-full' variant='outline'>
							У меня уже есть аккаунт
						</Button>
					</Link>
				</div>
			</div>
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
					delay: 0.25,
				}}
				className='absolute top-6 right-3 lg:relative flex items-center justify-end'
			>
				<MascottWrapper
					className='w-[150px] md:min-w-[200px] lg:min-w-[400px] xl:min-w-[500px]'
					text=''
				/>
			</motion.div>
		</motion.section>
	)
}
