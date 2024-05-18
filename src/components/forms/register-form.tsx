'use client'

import { RegisterSchema, RegisterValidationSchema } from '@/schemas/schemas'
import authService from '@/services/auth.service'
import { getRandomInt } from '@/utils/generate-random-number'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input, PasswordInput, WarningIcon } from '../ui/input'
import { SelectGender, SelectRole } from '../ui/select'

export const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()
	const [gender, setGender] = useState<string | null>(null)
	const [role, setRole] = useState<string | null>(null)
	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterValidationSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			gender: gender || '',
			role: {
				name: role || '',
			},
			login: '',
			password: '',
			avatar: 1,
			birth_date: undefined,
		},
	})

	useEffect(() => {
		if (!role) return
		setValue('role.name', role)
	}, [role])

	useEffect(() => {
		if (!gender) return
		setValue('gender', gender)
	}, [gender])

	const onSubmit = async (data: RegisterValidationSchema) => {
		setIsLoading(true)
		const res = await authService.signUp({
			name: data.name,
			gender: data.gender,
			login: data.login,
			password: data.password,
			role: {
				name: data.role.name,
			},
			avatar: getRandomInt(0, 5),
			birth_date: data.birth_date + 'T00:00',
		})
		setIsLoading(false)
		if (res.error) {
			setError('Ошибка на стороне сервера')
			return
		}
		router.push('/sign-in')
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-y-2'
		>
			<Input
				placeholder='Имя'
				error={errors.name?.message}
				{...register('name')}
			/>
			<Input
				wrapperClassName='w-full'
				placeholder='Логин'
				error={errors.login?.message}
				{...register('login')}
			/>
			<div className='w-full flex flex-wrap items-center justify-between gap-2'>
				<SelectGender
					error={errors.gender?.message}
					selected={gender}
					setSelected={setGender}
				/>
				<SelectRole
					error={errors.role?.message}
					selected={role}
					setSelected={setRole}
				/>
			</div>
			<PasswordInput
				type='password'
				placeholder='Пароль'
				error={errors.password?.message}
				{...register('password')}
			/>
			<Input
				type='date'
				placeholder='Дата рождения'
				error={errors.birth_date?.message}
				{...register('birth_date')}
			/>
			{error && (
				<span className='text-red-700 mt-1 text-xs font-medium flex items-center gap-2 whitespace-nowrap'>
					{<WarningIcon />}
					{error}
				</span>
			)}
			<Button disabled={isLoading} type='submit' className='mt-2'>
				Зарегистрироваться
			</Button>
		</form>
	)
}
