'use client'

import { removeTokenFromCookies } from '@/services/auth-token.service'
import classroomsService from '@/services/classrooms.service'
import { useUserStore } from '@/stores/userStore'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Select } from './ui/select'

export const ProfileWrapper = () => {
	const router = useRouter()
	const { user, update, updatePreferredLang } = useUserStore()
	const [selected, setSelected] = useState<string | null>(
		user?.preferredLang || null
	)

	const { data } = useQuery({
		queryKey: ['classrooms', user?.id],
		queryFn: () => classroomsService.getByUser(user?.id || ''),
	})

	const options = [
		{
			value: 'r',
			label: 'Русский',
		},
		{
			value: 't',
			label: 'Татарский',
		},
	]

	useEffect(() => {
		if (selected !== user?.preferredLang) {
			if (selected === 'r' || selected === 't') {
				updatePreferredLang(selected)
			}
		}
	}, [selected])

	const handleLogout = () => {
		router.push('/')
		removeTokenFromCookies()
		update(null)
	}

	return (
		<section className='relative flex gap-4 justify-between flex-wrap'>
			<div className='flex-grow h-[300px] aspect-square w-full rounded-xl bg-gradient-to-br from-lime-100 to-lime-400 via-lime-200' />
			<div className='flex-grow w-full flex flex-col justify-between gap-2 rounded-xl p-2'>
				<div className='flex flex-col gap-1'>
					<h4 className='font-medium text-neutral-light text-md'>Имя</h4>
					<span className='min-w-[250px] bg-white font-bold text-neutral-dark text-lg'>
						{user?.name}
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<h4 className='font-medium text-neutral-light text-md'>Группа</h4>
					<span className='min-w-[250px] bg-white rounded-xl font-bold text-neutral-dark text-lg'>
						{data?.data.join(',') || 'Отсутствует'}
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<h4 className='font-medium text-neutral-light text-md'>
						Язык интерфейса
					</h4>
					<Select
						selected={selected}
						setSelected={setSelected}
						options={options}
					/>
				</div>
				<button
					type='button'
					onClick={() => handleLogout()}
					className='flex w-max items-center gap-2 p-2 rounded-xl text-neutral-dark font-medium hover:bg-neutral-light/10 transition-colors z-10'
				>
					Выйти из аккаунта
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
		</section>
	)
}
