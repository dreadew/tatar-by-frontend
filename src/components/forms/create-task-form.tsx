import { LevelSchema, LevelValidationSchema } from '@/schemas/schemas'
import { useUserStore } from '@/stores/userStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const CreateLevelForm = ({ id }: { id: string }) => {
	const { user } = useUserStore()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LevelValidationSchema>({
		resolver: zodResolver(LevelSchema),
		defaultValues: {
			lesson_id: id,
			level_type: '',
			task: '',
			correct_answer: '',
			points: '',
		},
	})

	const queryClient = useQueryClient()

	/*const { mutate } = useMutation({
		mutationFn:
			user?.role === 'ROLE_TEACHER'
				? (data: CreateCourseReq) => coursesService.createByTeacher(data)
				: (data: CreateCourseReq) => coursesService.createByEditor(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['classrooms', 1] })
		},
	})*/

	const onSubmit: SubmitHandler<LevelValidationSchema> = async data => {
		console.log(data)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-y-2'
		>
			<Input
				placeholder='ID урока'
				error={errors.lesson_id?.message}
				{...register('lesson_id')}
			/>
			<Input
				placeholder='Выберите тип 0-2'
				error={errors.level_type?.message}
				{...register('level_type')}
			/>
			<Input
				placeholder='Варианты задания'
				error={errors.task?.message}
				{...register('task')}
			/>
			<Input
				placeholder='Правильная последовательность'
				error={errors.correct_answer?.message}
				{...register('correct_answer')}
			/>
			<Input
				placeholder='Количестов очков'
				error={errors.points?.message}
				{...register('points')}
			/>
			<Button className='mt-2' type='submit'>
				Создать курс
			</Button>
		</form>
	)
}
