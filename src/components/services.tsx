export const Services = () => {
	return (
		<section className='min-h-screen bg-neutral-secondary rounded-xl p-12 flex flex-col gap-8'>
			<h2 className='text-4xl font-bold text-neutral-dark'>О наших курсах</h2>
			<div>
				<div className='p-4 flex flex-col gap-1 bg-foreground w-max rounded-xl min-h-[200px]'>
					<div className='h-12 w-12 bg-neutral-dark rounded-xl' />
					<h4 className='font-medium text-lg text-neutral-dark mt-2'>
						Программирование
					</h4>
					<span className='text-sm text-neutral-light'>
						Профессия будущего для вашего ребенка
					</span>
				</div>
			</div>
		</section>
	)
}
