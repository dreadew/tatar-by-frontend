import Link from 'next/link'
import { CreateLevelDialog } from './create-level-dialog'

interface ILessons {
	id: string
	courseId: string
	canCreate?: boolean
}

export const LessonCard = ({ id, courseId, canCreate = false }: ILessons) => {
	return (
		<div className='fle flex-col gap-2 min-h-[250px] w-full min-w-[350px] bg-accent-green p-6 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity'>
			<Link
				href={`/dashboard/courses/${courseId}/${id}`}
				className='text-xl font-bold text-neutral-dark'
			>
				Урок #{id}
			</Link>
			<span className='font-medium text-neutral-dark'>
				Количество уровней - 0
			</span>
			{canCreate && <CreateLevelDialog id={id} />}
		</div>
	)
}
