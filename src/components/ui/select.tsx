import { cn } from '@/utils/cn'
import { WarningIcon } from './input'

interface ISelect {
	text?: string | React.ReactNode
	options?: Array<{
		value: string
		label: string
	}>
	selected: string | string[] | null
	setSelected: (a: string | null) => void
	error?: string
	withIdx?: boolean
}

export const Select = ({
	text,
	options,
	selected,
	setSelected,
	error,
	withIdx = false,
}: ISelect) => {
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm text-neutral-dark font-semibold'>{text}</label>
			<ul className='flex gap-2'>
				{options?.map((item, idx) =>
					withIdx ? (
						<div
							className='flex flex-col items-center gap-1'
							key={`option-${idx}`}
						>
							<span
								onClick={() => setSelected(item.value)}
								className={cn(
									'px-2 py-2 rounded-xl font-medium text-neutral-dark transition-colors cursor-pointer',
									typeof selected === 'string'
										? selected === item.value
											? 'bg-accent-green'
											: 'bg-white border border-neutral-light hover:border-neutral-dark'
										: selected?.find(i => i === item.value)
										? 'bg-accent-green'
										: 'bg-white border border-neutral-light'
								)}
							>
								{item.label}
							</span>
							<span className='text-xs text-neutral-dark font-bold'>
								{selected?.indexOf(item.value) !== -1 &&
									selected?.indexOf(item.value)}
							</span>
						</div>
					) : (
						<span
							onClick={() => setSelected(item.value)}
							key={`option-${idx}`}
							className={cn(
								'px-2 py-2 rounded-xl font-medium text-neutral-dark transition-colors cursor-pointer',
								typeof selected === 'string'
									? selected === item.value
										? 'bg-accent-green'
										: 'bg-white border border-neutral-light hover:border-neutral-dark'
									: selected?.find(i => i === item.value)
									? 'bg-accent-green'
									: 'bg-white border border-neutral-light'
							)}
						>
							{item.label}
						</span>
					)
				)}
			</ul>
			{error && (
				<span className='text-red-700 mt-1 text-xs font-medium flex items-center gap-2 whitespace-nowrap'>
					{<WarningIcon />}
					{error}
				</span>
			)}
		</div>
	)
}

const genders = [
	{
		value: 'male',
		label: 'муж',
	},
	{
		value: 'female',
		label: 'жен',
	},
]

export const SelectGender = ({ text, options, ...props }: ISelect) => {
	return <Select text={<>Пол</>} options={genders} {...props} />
}

const roles = [
	{
		value: 'ROLE_PUPIL',
		label: 'ученик',
	},
	{
		value: 'ROLE_TEACHER',
		label: 'учитель',
	},
	{
		value: 'ROLE_EDITOR',
		label: 'редактор',
	},
]

export const SelectRole = ({ text, options, ...props }: ISelect) => {
	return <Select text={<>Роль</>} options={roles} {...props} />
}
