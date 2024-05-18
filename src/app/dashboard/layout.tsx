'use client'

import { ResponsiveNavbar } from '@/components/dashboard-navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface IDashboardLayout {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export default function DashboardLayout({ children }: IDashboardLayout) {
	return (
		<QueryClientProvider client={queryClient}>
			<ResponsiveNavbar />
			<main>{children}</main>
		</QueryClientProvider>
	)
}
