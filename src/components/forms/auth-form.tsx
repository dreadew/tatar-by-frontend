'use client'

import { AuthSchema, AuthValidationSchema } from '@/schemas/schemas'
import { decode, saveTokenToCookies } from '@/services/auth-token.service'
import authService from '@/services/auth.service'
import { useUserStore } from '@/stores/userStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input, PasswordInput, WarningIcon } from '../ui/input'

export const AuthForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()
	const { user, update } = useUserStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthValidationSchema>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			login: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<AuthValidationSchema> = async data => {
		setIsLoading(true)
		const res = await authService.signIn(data)
		setIsLoading(false)

		if (res.error) {
			setError('Неверный логин или пароль')
			return
		}

		if (typeof res.data !== 'string') {
			saveTokenToCookies(res.data.token)

			if (!user) {
				const decodedData = await decode(res.data.token)

				update({
					id: decodedData.id,
					name: decodedData.name,
					login: decodedData.login,
					avatar: decodedData.avatar,
					birth_date: decodedData.birth_date,
					gender: decodedData.gender,
					role: decodedData.role,
					preferredLang: 'r',
				})
			}
		}

		router.push('/dashboard')
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-y-2'
		>
			<Input
				placeholder='Логин'
				error={errors.login?.message}
				{...register('login')}
			/>
			<PasswordInput
				type='password'
				placeholder='Пароль'
				error={errors.password?.message}
				{...register('password')}
			/>
			{error && (
				<span className='text-red-700 mt-1 text-xs font-medium flex items-center gap-2 whitespace-nowrap'>
					{<WarningIcon />}
					{error}
				</span>
			)}
			<Button disabled={isLoading} className='mt-2' type='submit'>
				Войти в аккаунт
			</Button>
		</form>
	)
}
