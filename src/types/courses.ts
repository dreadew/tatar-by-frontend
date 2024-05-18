export interface Course {
	id: string
	title: string
	min_age: number
	max_age: number
	teacher_id: string
}

export type CreateCourseReq = Omit<Course, 'id'>
