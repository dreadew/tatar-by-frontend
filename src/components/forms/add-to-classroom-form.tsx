import {
	AddToClassroomSchema,
	AddToClassroomValidationSchema,
} from '@/schemas/schemas'
import classroomsService from '@/services/classrooms.service'
import { AddStudentRequest } from '@/types/classrooms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const AddToClassroomForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddToClassroomValidationSchema>({
		resolver: zodResolver(AddToClassroomSchema),
		defaultValues: {
			login: '',
			id: '',
		},
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (data: AddStudentRequest) => classroomsService.addStudent(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['classrooms', 1] })
		},
	})

	const onSubmit: SubmitHandler<
		AddToClassroomValidationSchema
	> = async data => {
		mutate(data)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-y-2'
		>
			<Input
				placeholder='Логин пользователя'
				error={errors.login?.message}
				{...register('login')}
			/>
			<Input
				placeholder='ID группы'
				error={errors.id?.message}
				{...register('id')}
			/>
			<Button className='mt-2' type='submit'>
				Добавить пользователя
			</Button>
		</form>
	)
}
