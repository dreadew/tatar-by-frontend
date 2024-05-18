import { axiosWithAuth } from '@/api/interceptors'
import { CreateLessonReq, Lesson } from '@/types/lessons'

class LessonsService {
	private URL = 'http://localhost:8082' + '/lessons'

	async create(data: CreateLessonReq) {
		return axiosWithAuth.post<Lesson>(this.URL + '/create', data)
	}

	async get(id: string) {
		if (id === '') return
		return axiosWithAuth.get<Lesson[]>(this.URL + `/course/${id}`)
	}
}

export default new LessonsService()
