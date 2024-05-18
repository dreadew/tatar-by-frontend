import classroomsService from '@/services/classrooms.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'

export const EnterRandomClassroom = () => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: () => classroomsService.enterRandom(),
		mutationKey: ['enter random classroom'],
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['classroom'],
			}),
	})

	return <Button onClick={() => mutate()}>Вступить в рандомный класс</Button>
}
