import { AddToClassroomForm } from './forms/add-to-classroom-form'
import { Dialog } from './ui/dialog'

export const DeleteStudentDialog = () => {
	return (
		<Dialog variant='outline' text={<>Удалить студента</>}>
			{<AddToClassroomForm />}
		</Dialog>
	)
}
