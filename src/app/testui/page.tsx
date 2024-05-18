import { InputTaskWrapper } from '@/components/tasks/input-task-wrapper'
import { RecordingTaskWrapper } from '@/components/tasks/recording-task-wrapper'
import { SelectTaskWrapper } from '@/components/tasks/select-task-wrapper'

const options = [
	{
		value: 'маша',
		label: 'маша',
	},
	{
		value: 'машину',
		label: 'машину',
	},
	{
		value: 'водит',
		label: 'водит',
	},
	{
		value: 'каша',
		label: 'каша',
	},
	{
		value: 'дома',
		label: 'дома',
	},
	{
		value: 'аккуратно',
		label: 'аккуратно',
	},
]

export default function testUiPage() {
	return (
		<main className='flex flex-col h-screen gap-8 items-center justify-center'>
			<SelectTaskWrapper title={<>Текст задания</>} options={options} />
			<InputTaskWrapper title={<>Текст задания</>} />
			<RecordingTaskWrapper title={<>Текст задания</>} />
		</main>
	)
}
