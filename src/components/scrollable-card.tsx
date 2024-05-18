import Link from 'next/link'

interface IScrollableCard {
	id: string
	title: string
	min_age: number
	max_age: number
}

export const ScrollableCard = ({
	id,
	title,
	min_age,
	max_age,
}: IScrollableCard) => {
	return (
		<Link
			href={`/dashboard/courses/${id}`}
			className='flex flex-col justify-end gap-1 bg-accent-green p-5 rounded-xl w-[350px] min-h-[250px] shrink-0 hover:opacity-90 transition-opacity'
		>
			<h3 className='text-xl font-bold text-neutral-dark'>{title}</h3>
			<p className='text-md font-medium text-neutral-dark'>
				Подойдет для людей в возрасте от{' '}
				<span className='font-bold'>{min_age}</span> до{' '}
				<span className='font-bold'>{max_age}</span> лет
			</p>
		</Link>
	)
}
