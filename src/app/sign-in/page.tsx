import { AuthForm } from '@/components/forms/auth-form'
import { Card } from '@/components/ui/card'

export default function SignInPage() {
	return (
		<main className='min-h-screen w-full flex items-center justify-center bg-foreground'>
			<Card
				className='max-w-[500px]'
				title={'Вход в аккаунт'}
				desc={
					'Для использования наших услуг вам необходимо войти в ваш аккаунт, либо зарегистрировать его'
				}
				redirectText={'Еще нет аккаунта? Зарегистрироваться'}
				href='/sign-up'
			>
				<AuthForm />
			</Card>
		</main>
	)
}
