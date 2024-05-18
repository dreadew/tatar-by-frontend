import { axiosWithAuth } from '@/api/interceptors'
import { Course, CreateCourseReq } from '@/types/courses'

class CoursesService {
	private URL = 'http://localhost:8082' + '/courses'

	async createByTeacher(data: CreateCourseReq) {
		return axiosWithAuth.post<Course>(this.URL + '/create_by_teacher', data)
	}

	async createByEditor(data: CreateCourseReq) {
		return axiosWithAuth.post<Course>(this.URL + '/create_by_editor', data)
	}

	async update(data: Course) {
		return axiosWithAuth.patch<Course>(this.URL, data)
	}

	async getByTeacherId(id: string) {
		if (id === '') return
		return axiosWithAuth.get<Course[]>(this.URL + `/teacher_courses/${id}`)
	}

	async getByStudentId(id: string) {
		if (id === '') return
		return axiosWithAuth.get<Course[]>(this.URL + `/student_courses/${id}`)
	}

	async getEditorCourses() {
		return axiosWithAuth.get<Course[]>(this.URL + '/editor_courses')
	}

	async delete(id: string) {
		if (id === '') return
		return axiosWithAuth.delete(this.URL + `/${id}`)
	}
}

export default new CoursesService()
