export const EmptyCard = ({ text }: { text: string | React.ReactNode }) => {
	return (
		<div className='w-[350px] h-[250px] p-4 rounded-lg border border-neutral-secondary flex items-center justify-center'>
			<h2 className='text-xl text-center font-bold text-neutral-dark'>
				{text}
			</h2>
		</div>
	)
}
