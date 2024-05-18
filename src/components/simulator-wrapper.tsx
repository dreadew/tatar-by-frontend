import { TextSimulatorForm } from './forms/text-simulator-form'

interface ITextSimulatorWrapper {
	text: string | React.ReactNode
}

export const TextSimulatorWrapper = ({ text }: ITextSimulatorWrapper) => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-bold text-neutral-dark'>{text}</h2>
			<TextSimulatorForm />
		</section>
	)
}
