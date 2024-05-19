import { AddToClassroomForm } from './forms/add-to-classroom-form'
import { Dialog } from './ui/dialog'

export const AddStudentDialog = ({ id }: { id: string }) => {
	return (
		<Dialog variant='outline' text={<>Добавить студента</>}>
			{<AddToClassroomForm id={id} />}
		</Dialog>
	)
}
