import { z } from 'zod'

export const AuthSchema = z.object({
	login: z
		.string()
		.min(3, { message: 'Длина логина должна быть больше 3 символов' })
		.max(24, { message: 'Длина логина должна быть меньше 24 символов' }),
	password: z
		.string()
		.min(6, { message: 'Длина пароля должна быть минимум 6 символов ' })
		.max(24, { message: 'Длина пароля должна быть меньше 24 символов' }),
})

export type AuthValidationSchema = z.infer<typeof AuthSchema>

export const RegisterSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Длина логина должна быть больше 3 символов' })
		.max(24, { message: 'Длина логина должна быть меньше 24 символов' }),
	gender: z.string(),
	role: z.object({
		name: z.string().min(1, { message: 'Выберите что-то' }),
	}),
	login: z
		.string()
		.min(3, { message: 'Длина логина должна быть больше 3 символов' })
		.max(24, { message: 'Длина логина должна быть меньше 24 символов' }),
	password: z
		.string()
		.min(6, { message: 'Длина пароля должна быть минимум 6 символов ' })
		.max(24, { message: 'Длина пароля должна быть меньше 24 символов' }),
	avatar: z.number().min(0).max(6),
	birth_date: z.string().date('Необходимо выбрать дату рождения'),
})

export type RegisterValidationSchema = z.infer<typeof RegisterSchema>

export const SelectTaskSchema = z.object({
	answer: z
		.array(z.string())
		.min(1, { message: 'Выберите хотя бы 1 элемент ' }),
})

export type SelectTaskValidationSchema = z.infer<typeof SelectTaskSchema>

export const InputTaskSchema = z.object({
	answer: z
		.string()
		.min(1, { message: 'Длина ответа должна быть больше 1 символа ' }),
})

export type InputTaskValidationSchema = z.infer<typeof InputTaskSchema>

export const CreateClassroomSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Длина названия должна быть больше 3 символов ' }),
})

export type CreateClassroomValidationSchema = z.infer<
	typeof CreateClassroomSchema
>

export const AddToClassroomSchema = z.object({
	id: z.string().min(3, { message: 'Длина id должна быть больше 3 символов ' }),
	login: z
		.string()
		.min(3, { message: 'Длина логина должна быть больше 3 символов ' }),
})

export type AddToClassroomValidationSchema = z.infer<
	typeof AddToClassroomSchema
>

export const CreateCourseSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Длина названия должна быть больше 3 символов ' }),
	min_age: z.string(),
	max_age: z.string(),
	teacher_id: z
		.string()
		.min(3, { message: 'Длина id должна быть больше 3 символов ' }),
})

export type CreateCourseValidationSchema = z.infer<typeof CreateCourseSchema>

export const LevelSchema = z.object({
	lesson_id: z.string(),
	level_type: z.string().min(0).max(1),
	task: z.string().min(3, {
		message: 'Длина заголовка задания должна быть больше 3 символов ',
	}),
	correct_answer: z.string().min(3, {
		message: 'Длина заголовка задания должна быть больше 3 символов ',
	}),
	points: z.string(),
})

export type LevelValidationSchema = z.infer<typeof LevelSchema>

export const LessonSchema = z.object({
	course: z.object({
		id: z.string(),
	}),
	description: z.string(),
})

export type LessonValidationSchema = z.infer<typeof LessonSchema>
