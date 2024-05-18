import { AddCourseForm } from './forms/add-course-form'
import { Dialog } from './ui/dialog'

export const AddCourseDialog = () => {
	return <Dialog text={<>Создание курса</>}>{<AddCourseForm />}</Dialog>
}
