import { LessonSchema, LessonValidationSchema } from '@/schemas/schemas'
import lessonsService from '@/services/lessons.service'
import { CreateLessonReq } from '@/types/lessons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const CreateLessonForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LessonValidationSchema>({
		resolver: zodResolver(LessonSchema),
		defaultValues: {
			course: {
				id: '',
			},
			description: '',
		},
		resetOptions: {},
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (data: CreateLessonReq) => lessonsService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['classrooms'] })
		},
	})

	const onSubmit: SubmitHandler<LessonValidationSchema> = async data => {
		mutate(data)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-y-2'
		>
			<Input
				placeholder='Идентификатор урока'
				error={errors.course?.id?.message}
				{...register('course.id')}
			/>
			<Input
				placeholder='Описание'
				error={errors.description?.message}
				{...register('description')}
			/>
			<Button className='mt-2' type='submit'>
				Создать урок
			</Button>
		</form>
	)
}
