import classroomsService from '@/services/classrooms.service'
import { cn } from '@/utils/cn'
import { useQuery } from '@tanstack/react-query'

interface IDashboardNavbarProfile {
	id: string
	name: string
	group: string
	avatar?: string
	isMobile?: boolean
}

export const DashboardNavbarProfile = ({
	id,
	name,
	group,
	avatar,
	isMobile = false,
}: IDashboardNavbarProfile) => {
	const { data } = useQuery({
		queryKey: ['classrooms', id],
		queryFn: () => classroomsService.getByUser(id),
	})

	return isMobile ? (
		<div className='flex gap-3 items-center'>
			<div className='relative'>
				<div
					className={cn(
						'h-10 aspect-square rounded-full bg-neutral-dark transition-transform'
					)}
				/>
				<div
					className={cn(
						'absolute flex gap-x-8 p-1 -right-20 rounded-xl transition-all duration-300 top-10 opacity-0 pointer-events-none'
					)}
				>
					<div className='flex flex-col overflow-clip'>
						<h5 className='text-lg font-bold text-neutral-dark'>{name}</h5>
						<p className='text-xs font-medium text-neutral-light'>
							{data && data.data.length > 0
								? data.data.join(', ')
								: 'Вы не состоите в группе'}
						</p>
					</div>
					<button className='p-2 font-medium flex gap-2 rounded-xl bg-neutral-light/10 transition-colors'>
						Выйти
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 stroke-neutral-dark'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	) : (
		<>
			<div className='flex items-center gap-3'>
				<div className='min-h-10 h-full aspect-square rounded-full bg-neutral-dark' />
				<div className='w-full flex items-center justify-between overflow-clip'>
					<div className='min-w-max flex flex-col overflow-clip'>
						<h5 className='text-lg font-bold text-neutral-dark'>{name}</h5>
						<p className='text-xs font-medium text-neutral-light'>
							{data && data.data.length > 0
								? data.data.join(', ')
								: 'Вы не состоите в группе'}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
