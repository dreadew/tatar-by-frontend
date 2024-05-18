import { UserRole } from './roles'

export interface LoginDTO {
	login: string
	password: string
}

export interface RegisterDTO {
	name: string
	login: string
	password: string
	role: {
		name: string
	}
	gender: string
	avatar: number
	birth_date: string
}

export interface UserStore {
	id: string
	name: string
	login: string
	role: UserRole
	gender: string
	avatar: number
	birth_date: string
	preferredLang: 'r' | 't'
}

export type UserDTO = Omit<RegisterDTO, 'password'>

export interface LoginResponse {
	token: string
}

export interface RegisterResponse {}
