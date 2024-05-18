'use client'

import {
	DashboardCourses,
	TeacherCourses,
} from '@/components/dashboard-courses'
import { useUserStore } from '@/stores/userStore'
import { motion } from 'framer-motion'

export default function CoursesPage() {
	const { user } = useUserStore()
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
			className='relative px-3 sm:px-8 lg:pl-28 lg:pr-12 xl:px-36 py-8 xl:py-10 h-screen flex flex-col gap-8'
		>
			<div className='pb-20'>
				<DashboardCourses />
				{user?.role === 'ROLE_TEACHER' && <TeacherCourses />}
			</div>
		</motion.main>
	)
}
