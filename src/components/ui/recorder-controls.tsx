import { RecorderControlsProps } from '@/types/recorder'
import { formatMinutes, formatSeconds } from '@/utils/format-time'
import { Button } from './button'

export const RecorderControls = ({
	recorderState,
	handlers,
	disabled = false,
}: RecorderControlsProps) => {
	const { recordingMinutes, recordingSeconds, initRecording } = recorderState
	const { startRecording, saveRecording, cancelRecording } = handlers

	return (
		<div className='flex gap-2 justify-between items-center'>
			<div className='w-full flex gap-1 justify-between'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-neutral-light'>Длительность</span>
					<div className='font-bold text-sm text-neutral-dark'>
						{initRecording && <div />}
						<span>{formatMinutes(recordingMinutes)}</span>
						<span>:</span>
						<span>{formatSeconds(recordingSeconds)}</span>
					</div>
				</div>
				{initRecording && (
					<div className=''>
						<Button type='button' onClick={cancelRecording}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-6 h-6 stroke-neutral-dark'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z'
								/>
							</svg>
						</Button>
					</div>
				)}
			</div>
			<div>
				{initRecording ? (
					<Button
						type='button'
						onClick={saveRecording}
						disabled={recordingSeconds === 0}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 stroke-neutral-dark'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
							/>
						</svg>
					</Button>
				) : (
					<Button disabled={disabled} type='button' onClick={startRecording}>
						{
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-6 h-6 stroke-neutral-dark'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'
								/>
							</svg>
						}
					</Button>
				)}
			</div>
		</div>
	)
}
