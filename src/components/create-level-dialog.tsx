import { CreateLevelForm } from './forms/create-task-form'
import { Dialog } from './ui/dialog'

export const CreateLevelDialog = ({ id }: { id: string }) => {
	return (
		<Dialog variant='outline' text={<>Создать уровень</>}>
			<CreateLevelForm id={id} />
		</Dialog>
	)
}
