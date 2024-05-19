'use client'
import { useUserStore } from '@/stores/userStore'
import {
	DashboardCourses,
	TeacherCourses,
	UserCourses,
} from './dashboard-courses'

export const DashboardWrapper = () => {
	const { user } = useUserStore()

	return (
		<section className='flex flex-col gap-8 md:gap-10'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-4xl text-neutral-dark font-bold'>
					Привет, {user?.name}
				</h1>
				{user?.role === 'ROLE_PUPIL' && (
					<div className='flex gap-10'>
						<span className='text-lg text-neutral-light'>
							Твое место в рейтинге:{' '}
							<span className='font-bold text-neutral-dark'>2</span>
						</span>
						<span className='text-lg text-neutral-light'>
							Количество баллов:{' '}
							<span className='font-bold text-neutral-dark'>150</span>
						</span>
					</div>
				)}
			</div>
			{user?.role === 'ROLE_PUPIL' && <UserCourses id={user?.id || ''} />}
			{user?.role === 'ROLE_TEACHER' && <TeacherCourses />}
			{user?.role === 'ROLE_EDITOR' && <DashboardCourses />}
			<DashboardCourses />
		</section>
	)
}
