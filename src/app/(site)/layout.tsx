import { Header } from '@/components/header'

export default function MainPageLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}
