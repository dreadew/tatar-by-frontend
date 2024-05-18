import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const accessToken = cookies.get('access_token')?.value

	const isPrivatePage = url.includes('/dashboard')
	const isAuthPage = url.includes('/sign-in') || url.includes('/sign-up')

	if (isAuthPage && accessToken) {
		return NextResponse.redirect(new URL('/dashboard', url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (isPrivatePage && !accessToken) {
		return NextResponse.redirect(new URL('/sign-in', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
