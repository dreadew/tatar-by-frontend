import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IDashboardNavigationLink {
	children: React.ReactNode
	name: string
	href: string
	withText?: boolean
	iconClassName?: string
}

export const DashboardNavigationLink = ({
	children,
	name,
	href,
	withText = true,
	iconClassName,
}: IDashboardNavigationLink) => {
	const path = usePathname()
	return (
		<Link
			href={href}
			className={cn(
				'flex p-2 rounded-lg stroke-[0.75] hover:stroke-neutral-dark/90 stroke-neutral-dark text-neutral-dark hover:text-neutral-dark/90 place-items-center gap-3 transition-colors duration-100 hover:bg-neutral-light/10',
				path === href && 'bg-neutral-light/10'
			)}
		>
			<span className={cn('inline-grid', iconClassName)}>{children}</span>
			{withText && (
				<p className='text-inherit font-medium whitespace-nowrap tracking-wide overflow-clip'>
					{name}
				</p>
			)}
		</Link>
	)
}
