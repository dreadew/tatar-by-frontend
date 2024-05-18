import { CreateClassroomForm } from './forms/create-classroom-form'
import { Dialog } from './ui/dialog'

export const CreateClassroomDialog = () => {
	return <Dialog text={<>Создать класс</>}>{<CreateClassroomForm />}</Dialog>
}
