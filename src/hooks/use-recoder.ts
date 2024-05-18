import { saveRecording, startRecording } from '@/handlers/recorder-controls'
import {
	AudioTrack,
	Interval,
	MediaRecorderEvent,
	Recorder,
} from '@/types/recorder'
import { useEffect, useState } from 'react'

const blobToBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => {
			if (reader.result) {
				resolve(reader.result.toString().split(',')[1])
			} else {
				reject(new Error('Conversion to Base64 failed'))
			}
		}
		reader.onerror = reject
		reader.readAsDataURL(blob)
	})
}

const initialState: Recorder = {
	recordingMinutes: 0,
	recordingSeconds: 0,
	initRecording: false,
	mediaStream: null,
	mediaRecorder: null,
	audio: null,
}

export default function useRecorder() {
	const [recorderState, setRecorderState] = useState<Recorder>(initialState)

	useEffect(() => {
		const MAX_RECORDER_TIME = 5
		let recordingInterval: Interval = null

		if (recorderState.initRecording)
			recordingInterval = setInterval(() => {
				setRecorderState((prevState: Recorder) => {
					if (
						prevState.recordingMinutes === MAX_RECORDER_TIME &&
						prevState.recordingSeconds === 0
					) {
						typeof recordingInterval === 'number' &&
							clearInterval(recordingInterval)
						return prevState
					}

					if (
						prevState.recordingSeconds >= 0 &&
						prevState.recordingSeconds < 59
					)
						return {
							...prevState,
							recordingSeconds: prevState.recordingSeconds + 1,
						}
					else if (prevState.recordingSeconds === 59)
						return {
							...prevState,
							recordingMinutes: prevState.recordingMinutes + 1,
							recordingSeconds: 0,
						}
					else return prevState
				})
			}, 1000)
		else
			typeof recordingInterval === 'number' && clearInterval(recordingInterval)

		return () => {
			typeof recordingInterval === 'number' && clearInterval(recordingInterval)
		}
	})

	useEffect(() => {
		setRecorderState(prevState => {
			if (prevState.mediaStream)
				return {
					...prevState,
					mediaRecorder: new MediaRecorder(prevState.mediaStream),
				}
			else return prevState
		})
	}, [recorderState.mediaStream])

	useEffect(() => {
		const recorder = recorderState.mediaRecorder
		let chunks: Blob[] = []

		if (recorder && recorder.state === 'inactive') {
			recorder.start()

			recorder.ondataavailable = (e: MediaRecorderEvent) => {
				chunks.push(e.data)
			}

			recorder.onstop = async () => {
				const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
				chunks = []

				try {
					const base64Audio = await blobToBase64(blob)

					setRecorderState((prevState: Recorder) => {
						if (prevState.mediaRecorder)
							return {
								...initialState,
								audio: base64Audio,
							}
						else return initialState
					})
				} catch (error) {
					console.error('Failed to convert Blob to Base64', error)
				}
			}
		}

		return () => {
			if (recorder)
				recorder.stream
					.getAudioTracks()
					.forEach((track: AudioTrack) => track.stop())
		}
	}, [recorderState.mediaRecorder])

	return {
		recorderState,
		startRecording: () => startRecording(setRecorderState),
		cancelRecording: () => setRecorderState(initialState),
		saveRecording: () => saveRecording(recorderState.mediaRecorder),
	}
}
