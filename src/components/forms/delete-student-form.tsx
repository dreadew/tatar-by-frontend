import {
	AddToClassroomSchema,
	AddToClassroomValidationSchema,
} from '@/schemas/schemas'
import classroomsService from '@/services/classrooms.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const DeleteStudentForm = ({ id }: { id: string }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddToClassroomValidationSchema>({
		resolver: zodResolver(AddToClassroomSchema),
		defaultValues: {
			login: '',
			id: id,
		},
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (data: { id: string; login: string }) =>
			classroomsService.removeStudent(data.id, data.login),
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
			<Button className='mt-2' type='submit'>
				Удалить пользователя
			</Button>
		</form>
	)
}
