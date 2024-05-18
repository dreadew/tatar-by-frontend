'use client'

import useRecorder from '@/hooks/use-recoder'
import useRecordingsList from '@/hooks/use-recording-list'
import { InputTaskSchema, InputTaskValidationSchema } from '@/schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { RecorderControls } from '../ui/recorder-controls'
import RecordingsList from '../ui/recordings-list'

interface IRecordingTaskWrapper {
	title: string | React.ReactNode
}

export const RecordingTaskWrapper = ({ title }: IRecordingTaskWrapper) => {
	const { recorderState, ...handlers } = useRecorder()
	const { audio } = recorderState
	const { recordings } = useRecordingsList(audio)
	const [state, setState] = useState<number>(0)

	const {
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<InputTaskValidationSchema>({
		resolver: zodResolver(InputTaskSchema),
		defaultValues: {
			answer: recordings[0]?.audio,
		},
	})
	useEffect(() => {
		if (recordings.length === 0) {
			return
		}
		setValue('answer', recordings[0]?.audio)
	}, [state])

	const onSubmit: SubmitHandler<InputTaskValidationSchema> = data => {
		console.log(data)
	}

	return (
		<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col gap-1'>
				<h1 className='text-2xl font-bold text-neutral-dark'>{title}</h1>
				<span className='text-neutral-light'>
					Для записи голоса нажмите на кнопку
				</span>
			</div>
			<div className='max-w-[500px] flex flex-col gap-2'>
				<RecorderControls
					disabled={state === 1}
					recorderState={recorderState}
					handlers={handlers}
				/>
				<RecordingsList setState={setState} audio={audio} />
				<Button className='mt-1 w-full' type='submit'>
					Отправить
				</Button>
			</div>
		</form>
	)
}
