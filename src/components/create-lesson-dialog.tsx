import { CreateLessonForm } from './forms/create-lesson-form'
import { Dialog } from './ui/dialog'

export const CreateLessonDialog = () => {
	return (
		<Dialog text={<>Создать урок</>}>
			<CreateLessonForm />
		</Dialog>
	)
}
