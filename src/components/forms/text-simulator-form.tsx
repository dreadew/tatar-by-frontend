'use client'

import { InputTaskSchema, InputTaskValidationSchema } from '@/schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { TextArea } from '../ui/textarea'

export const TextSimulatorForm = () => {
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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-y-2'
		>
			<TextArea
				placeholder='Введите текст'
				error={errors.answer?.message}
				{...register('answer')}
			/>
			<Button className='mt-2' type='submit'>
				Проверить
			</Button>
		</form>
	)
}
