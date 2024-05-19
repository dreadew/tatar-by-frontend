import { CreateLessonForm } from './forms/create-lesson-form'
import { Dialog } from './ui/dialog'

export const CreateLessonDialog = ({ id }: { id: string }) => {
	return (
		<Dialog text={<>Создать урок</>}>
			<CreateLessonForm id={id} />
		</Dialog>
	)
}
