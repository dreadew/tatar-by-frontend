export interface Lesson {
	id: string
	course: {
		id: string
	}
}

export type CreateLessonReq = Omit<Lesson, 'id'>
