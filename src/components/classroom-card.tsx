import classroomsService from '@/services/classrooms.service'
import { Classroom } from '@/types/classrooms'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddStudentDialog } from './add-student-dialog'
import { DeleteStudentDialog } from './add-student-dialog copy'
import { DeleteClassroomButton } from './delete-classroom'
import { Button } from './ui/button'

interface IClassroomCard {
	canLeave?: boolean
	canDelete?: boolean
}

export const ClassroomCard = ({
	id,
	name,
	teacher,
	students,
	canLeave,
	canDelete,
}: Classroom & IClassroomCard) => {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['leave classroom', 1],
		mutationFn: (i: string) => classroomsService.quit(i),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['classrooms', 1] })
		},
	})

	const handleClick = () => {
		mutate(id)
	}

	return (
		<div className='w-[325px] h-[250px] rounded-xl border border-neutral-secondary p-4 flex flex-col justify-between'>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col gap-1'>
					<h3 className='text-neutral-dark font-bold text-xl'>{name}</h3>
					<span className='text-neutral-light font-medium text-lg'>
						{teacher.name}
					</span>
				</div>
				<span className='text-md font-bold text-neutral-dark'>
					Количество учеников: {students.length}
				</span>
			</div>
			<div className='w-full'>
				{canLeave && (
					<Button className='w-full' disabled={isPending} onClick={handleClick}>
						Выйти
					</Button>
				)}
				{canDelete && <DeleteClassroomButton id={id} />}
				{canDelete && <AddStudentDialog id={id} />}
				{canDelete && <DeleteStudentDialog id={id} />}
			</div>
		</div>
	)
}
