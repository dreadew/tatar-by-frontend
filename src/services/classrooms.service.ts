import { axiosWithAuth } from '@/api/interceptors'
import {
	AddStudentRequest,
	AddStudentResponse,
	AskJoinResponse,
	Classroom,
	CreateClassroomRequest,
	CreateClassroomResponse,
	DeleteClassroom,
	EditClassroomRequest,
	EditClassroomResponse,
	EnterRandomResponse,
	QuitClassroom,
	RemoveStudent,
} from '@/types/classrooms'

class ClassroomsService {
	private URL = process.env.NEXT_PUBLIC_URL + '/classrooms'

	async create(data: CreateClassroomRequest) {
		return await axiosWithAuth.post<CreateClassroomResponse>(
			this.URL + '/create',
			data
		)
	}

	async edit(data: EditClassroomRequest) {
		return await axiosWithAuth.patch<EditClassroomResponse>(
			this.URL + '/edit',
			data
		)
	}

	async getOne(id: string) {
		return await axiosWithAuth.get<Classroom>(
			this.URL + `/get-one?classroom_id=${id}`
		)
	}

	async getAll() {
		return await axiosWithAuth.get<Array<Classroom>>(this.URL + `/get-all`)
	}

	async getByUser(id: string) {
		if (id === '') return
		return await axiosWithAuth.get<Array<Classroom>>(
			this.URL + `/student/${id}/get-classrooms`
		)
	}

	async askJoin() {
		return await axiosWithAuth.get<AskJoinResponse>(
			this.URL + `/ask-join-group`
		)
	}

	async addStudent(data: AddStudentRequest) {
		return await axiosWithAuth.put<AddStudentResponse>(
			this.URL +
				`/add-student?classroom_id=${data.id}&student_login=${data.login}`
		)
	}

	async enterRandom() {
		return await axiosWithAuth.put<EnterRandomResponse>(
			this.URL + `/enter-to-random-system-group`
		)
	}

	async removeStudent(id: string, login: string) {
		return await axiosWithAuth.delete<RemoveStudent>(
			this.URL + `/remove-student?classroom_id=${id}&student_login=${login}`
		)
	}

	async quit(id: string) {
		return await axiosWithAuth.delete<QuitClassroom>(
			this.URL + `/quit?classroom_id=${id}`
		)
	}

	async delete(id: string) {
		return await axiosWithAuth.delete<DeleteClassroom>(
			this.URL + `/quit?classroom_id=${id}`
		)
	}
}

export default new ClassroomsService()
