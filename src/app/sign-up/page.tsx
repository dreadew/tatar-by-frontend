import { RegisterForm } from '@/components/forms/register-form'
import { Card } from '@/components/ui/card'

export default function SignUpPage() {
	return (
		<main className='min-h-screen w-full flex items-center justify-center bg-foreground'>
			<Card
				className='max-w-[500px]'
				title={'Регистрация'}
				desc={
					'Для использования наших услуг вам необходимо войти в ваш аккаунт, либо зарегистрировать его'
				}
				redirectText={'Уже есть аккаунт? Войти'}
				href='/sign-in'
			>
				<RegisterForm />
			</Card>
		</main>
	)
}
