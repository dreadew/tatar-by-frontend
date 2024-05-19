import { JWTToken } from '@/types/jwt'
import { decodeJwt, jwtVerify } from 'jose'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get('access_token')
	return accessToken || null
}

export const decode = async (token: string) => {
	return (await decodeJwt(token)) as JWTToken
}

export const saveTokenToCookies = async (accessToken: string) => {
	if (!process.env.NEXT_PUBLIC_JWT_SECRET) return
	const isValid = await jwtVerify(
		accessToken,
		new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
	)
	if (!isValid) return
	Cookies.set('access_token', accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
	Cookies.set('role', (await decode(accessToken)).role, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
}

export const removeTokenFromCookies = () => {
	Cookies.remove('access_token')
}
