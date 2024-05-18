'use client'
import { useUserStore } from '@/stores/userStore'
import { DashboardCourses, UserCourses } from './dashboard-courses'

export const DashboardWrapper = () => {
	const { user } = useUserStore()

	return (
		<section className='flex flex-col gap-8 md:gap-4'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-4xl text-neutral-dark font-bold'>
					Привет, {user?.name}
				</h1>
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
			</div>
			<UserCourses id={user?.id || ''} />
			<DashboardCourses />
		</section>
	)
}
