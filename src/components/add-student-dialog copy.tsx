import { DeleteStudentForm } from './forms/delete-student-form'
import { Dialog } from './ui/dialog'

export const DeleteStudentDialog = ({ id }: { id: string }) => {
	return (
		<Dialog variant='outline' text={<>Удалить студента</>}>
			{<DeleteStudentForm id={id} />}
		</Dialog>
	)
}
