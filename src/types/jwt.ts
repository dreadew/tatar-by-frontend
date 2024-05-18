import { UserRole } from './roles'

export interface JWTToken {
	sub: string
	id: string
	name: string
	login: string
	role: UserRole
	avatar: number
	gender: string
	birth_date: string
	registered_at: string
	last_activity_at: string
	iss: string
	exp: number
}
