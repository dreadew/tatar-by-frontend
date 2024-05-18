import {
	getAccessToken,
	removeTokenFromCookies,
} from '@/services/auth-token.service'
import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'

const options: CreateAxiosDefaults = {
	headers: {
		'Content-Type': 'application/json',
	},
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const access_token = getAccessToken()

	if (config?.headers && access_token) {
		config.headers.Authorization = `Bearer ${access_token}`
	}
	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const origReq = error.config

		if (
			error?.response?.status === 401 &&
			error.config &&
			error.config._isRetry
		) {
			origReq._isRetry = true
			try {
				return axiosWithAuth.request(origReq)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeTokenFromCookies()
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
