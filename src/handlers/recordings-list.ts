import { SetRecordings } from '@/types/recorder'

export function deleteAudio(audioKey: string, setRecordings: SetRecordings) {
	setRecordings(prevState => {
		const updatedRecordings = prevState.filter(
			record => record.key !== audioKey
		)
		return updatedRecordings
	})
}
