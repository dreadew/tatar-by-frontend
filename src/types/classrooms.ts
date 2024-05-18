import { UserDTO } from './auth'

export interface EnterRandomResponse {}
export interface AddStudentResponse {}
export interface CreateClassroomResponse extends Classroom {}
export interface EditClassroomResponse {}
export interface AskJoinResponse {}
export interface RemoveStudent {}
export interface QuitClassroom {}
export interface DeleteClassroom {}
export interface Classroom {
	id: string
	name: string
	teacher: {
		id: string
		name: string
		avatar: number
	}
	students: Array<UserDTO>
}

export interface CreateClassroomRequest {
	name: string
}
export interface EditClassroomRequest {
	id: string
	name: string
}
export interface AddStudentRequest {
	id: string
	login: string
}
