'use client'

import { InputTaskSchema, InputTaskValidationSchema } from '@/schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface IInputTaskWrapper {
	title: string | React.ReactNode
}

export const InputTaskWrapper = ({ title }: IInputTaskWrapper) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputTaskValidationSchema>({
		resolver: zodResolver(InputTaskSchema),
		defaultValues: {
			answer: '',
		},
	})

	const onSubmit: SubmitHandler<InputTaskValidationSchema> = data => {
		console.log(data)
	}

	return (
		<form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-2xl font-bold text-neutral-dark'>{title}</h1>
			<Input
				placeholder='Введите ответ'
				error={errors.answer?.message}
				{...register('answer')}
			/>
			<Button className='mt-1' type='submit'>
				Отправить
			</Button>
		</form>
	)
}
