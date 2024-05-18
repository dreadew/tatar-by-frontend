'use client'

import { SelectTaskSchema, SelectTaskValidationSchema } from '@/schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Select } from '../ui/select'

interface ISelectTaskWrapper {
	title: string | React.ReactNode
	options: Array<{
		value: string
		label: string
	}>
}

export const SelectTaskWrapper = ({ title, options }: ISelectTaskWrapper) => {
	const [selected, setSelected] = useState<string[]>([])

	const handleSelect = (s: string | null) => {
		if (!s) return
		if (selected.find(i => i === s)) {
			setSelected(prev => prev.filter(i => i !== s))
			return
		}
		setSelected(prev => [...prev, s])
	}

	useEffect(() => {
		setValue('answer', selected)
	}, [selected])

	const {
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<SelectTaskValidationSchema>({
		resolver: zodResolver(SelectTaskSchema),
		defaultValues: {
			answer: selected,
		},
	})

	const onSubmit: SubmitHandler<SelectTaskValidationSchema> = data => {
		console.log(data)
	}

	return (
		<form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-2xl font-bold text-neutral-dark'>{title}</h1>
			<Select
				error={errors?.answer?.message}
				selected={selected}
				setSelected={handleSelect}
				options={options}
				withIdx
			/>
			<Button className='mt-1' type='submit'>
				Отправить
			</Button>
		</form>
	)
}
