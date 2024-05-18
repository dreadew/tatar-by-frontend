'use client'

import { useUserStore } from '@/stores/userStore'
import { UserRole } from '@/types/roles'
import { cn } from '@/utils/cn'
import { motion, useAnimationControls } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DashboardNavigationLink } from './dashboard-navigation-link'
import { ProfileDialog } from './profile-dialog'
import { Logo } from './ui/logo'

const containerVariants = {
	close: {
		width: '5rem',
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
	open: {
		width: '19rem',
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
}

const arrowVariants = {
	close: {
		rotate: 360,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
	open: {
		rotate: 180,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
}

const dashboardLinks = [
	{
		name: 'Дэшборд',
		href: '/dashboard',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='min-w-6 h-full stroke-neutral-dark'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
				/>
			</svg>
		),
	},
	{
		name: 'Мои классы',
		href: '/dashboard/classrooms',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='min-w-6 h-full stroke-neutral-dark'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
				/>
			</svg>
		),
	},
	{
		name: 'Проверка произношения',
		href: '/dashboard/audio-simulator',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='min-w-6 h-full stroke-neutral-dark'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
				/>
			</svg>
		),
	},
	{
		name: 'Проверка текста',
		href: '/dashboard/text-simulator',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='min-w-6 h-full stroke-neutral-dark'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
				/>
			</svg>
		),
	},
	{
		name: 'Библиотека',
		href: '/dashboard/library',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='min-w-6 h-full stroke-neutral-dark'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z'
				/>
			</svg>
		),
	},
]

interface UserInfo {
	id: string
	name: string
	group: string
	role: UserRole
}

export const DashboardNavbar = ({ id, name, group, role }: UserInfo) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const containerControls = useAnimationControls()
	const arrowControls = useAnimationControls()

	useEffect(() => {
		if (isOpen) {
			containerControls.start('open')
			arrowControls.start('open')
			return
		}
		containerControls.start('close')
		arrowControls.start('close')
	}, [isOpen])

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
		<motion.nav
			variants={containerVariants}
			animate={containerControls}
			initial='close'
			className='bg-foreground border-r outline-neutral-light flex flex-col justify-between z-10 p-5 fixed top-0 left-0 h-full'
		>
			<div className='flex flex-col gap-20'>
				<div className='relative flex w-full justify-between place-items-center'>
					<Link
						className='hover:opacity-90 transition-opacity'
						href={'/dashboard'}
					>
						<Logo className='h-10 w-10 overflow-clip' />
					</Link>
					<button
						className='absolute -right-8 p-1 rounded-full flex bg-neutral-secondary'
						onClick={handleOpen}
					>
						<motion.svg
							variants={arrowVariants}
							initial='close'
							animate={arrowControls}
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							className='w-4 h-4 stroke-neutral-dark'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
							/>
						</motion.svg>
					</button>
				</div>
				<div className='flex flex-col gap-y-2'>
					{dashboardLinks.map((item, idx) => (
						<DashboardNavigationLink
							href={item.href}
							name={item.name}
							key={`dashboard-nav-${idx}`}
						>
							{item.icon}
						</DashboardNavigationLink>
					))}
				</div>
			</div>
			<ProfileDialog
				id={id}
				name={name}
				group={group}
				avatarId={0}
				preferredLang='r'
			/>
		</motion.nav>
	)
}

export const MobileDashboardNavbar = ({ id, name, group, role }: UserInfo) => {
	return (
		<motion.header
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
			className='fixed bottom-0 py-3 px-3 w-full min-h-16 flex items-center justify-center gap-3 z-10 bg-foreground rounded'
		>
			<div className={cn('flex gap-2 transition-all duration-300')}>
				{dashboardLinks.map((item, idx) => (
					<DashboardNavigationLink
						href={item.href}
						name={item.name}
						withText={false}
						iconClassName='relative min-h-10'
						key={`dashboard-nav-${idx}`}
					>
						{item.icon}
					</DashboardNavigationLink>
				))}
			</div>
			<ProfileDialog
				id={id}
				name={name}
				group={group}
				avatarId={0}
				preferredLang='r'
				isMobile
			/>
		</motion.header>
	)
}

export const ResponsiveNavbar = () => {
	const { user } = useUserStore()

	return (
		<>
			<div className='hidden lg:block'>
				<DashboardNavbar
					id={user?.id || ''}
					role={user?.role || 'ROLE_PUPIL'}
					name={user?.name || ''}
					group={user?.role || ''}
				/>
			</div>
			<div className='lg:hidden block'>
				<MobileDashboardNavbar
					id={user?.id || ''}
					role={user?.role || 'ROLE_PUPIL'}
					name={user?.name || ''}
					group={user?.role || ''}
				/>
			</div>
		</>
	)
}
