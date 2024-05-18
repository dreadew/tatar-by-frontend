import Link from 'next/link'

interface ILessons {
	id: string
	courseId: string
}

export const LessonCard = ({ id, courseId }: ILessons) => {
	return (
		<Link
			className='min-h-[250px] w-full min-w-[350px] bg-accent-green p-6 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity'
			href={`/dashboard/courses/${courseId}/${id}`}
		>
			<h3 className='text-xl font-bold text-neutral-dark'>Урок #{id}</h3>
		</Link>
	)
}
