import { AddToClassroomForm } from './forms/add-to-classroom-form'
import { Dialog } from './ui/dialog'

export const AddStudentDialog = () => {
	return (
		<Dialog variant='outline' text={<>Добавить студента</>}>
			{<AddToClassroomForm />}
		</Dialog>
	)
}
