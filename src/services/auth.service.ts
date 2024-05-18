import { axiosClassic } from '@/api/interceptors'
import { LoginDTO, LoginResponse, RegisterDTO } from '@/types/auth'

class AuthService {
	private URL = process.env.NEXT_PUBLIC_URL + '/auth'

	async signIn(data: LoginDTO) {
		try {
			return {
				data: (
					await axiosClassic.post<LoginResponse>(this.URL + '/login', data)
				).data,
				error: '',
			}
		} catch (err: any) {
			return {
				data: '',
				error: err.response.data,
			}
		}
	}

	async signUp(data: RegisterDTO) {
		try {
			return {
				data: (await axiosClassic.post(this.URL + '/registration', data)).data,
				error: '',
			}
		} catch (err: any) {
			return {
				data: '',
				error: err.response.data,
			}
		}
	}
}

export default new AuthService()
