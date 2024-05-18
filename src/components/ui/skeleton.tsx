import { cn } from '../../utils/cn'

const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				'min-w-[300px] max-h-[250px] animate-pulse rounded-md bg-neutral-light',
				className
			)}
			{...props}
		/>
	)
}

export { Skeleton }
