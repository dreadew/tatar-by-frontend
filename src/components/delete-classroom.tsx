import classroomsService from '@/services/classrooms.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'

export const DeleteClassroomButton = ({ id }: { id: string }) => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationFn: (i: string) => classroomsService.delete(i),
		mutationKey: ['delete classroom', id],
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['classroom', 1] }),
	})
	return <Button onClick={() => mutate(id)}>Удалить</Button>
}
