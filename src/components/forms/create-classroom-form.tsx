import {
	CreateClassroomSchema,
	CreateClassroomValidationSchema,
} from '@/schemas/schemas'
import classroomsService from '@/services/classrooms.service'
import { CreateClassroomRequest } from '@/types/classrooms'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const CreateClassroomForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateClassroomValidationSchema>({
		resolver: zodResolver(CreateClassroomSchema),
		defaultValues: {
			name: '',
		},
		resetOptions: {},
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (data: CreateClassroomRequest) =>
			classroomsService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['classrooms'] })
		},
	})

	const onSubmit: SubmitHandler<
		CreateClassroomValidationSchema
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
				placeholder='Название'
				error={errors.name?.message}
				{...register('name')}
			/>
			<Button className='mt-2' type='submit'>
				Создать класс
			</Button>
		</form>
	)
}
