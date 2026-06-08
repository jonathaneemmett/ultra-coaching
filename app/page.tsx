import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await auth();

	if (session) redirect('/dashboard');

	return (
		<main className='min-h-screen flex items-center justify-center bg-gray-950'>
			<div className='text-center space-y-6'>
				<h1 className='text-4xl font-bold text-white'>
					Ultra Coaching
				</h1>
				<p className='text-gray-400'>
					Your personal ultra endurance coach
				</p>
				<form
					action={async () => {
						'use server';
						await signIn('google', { redirectTo: '/dashboard' });
					}}>
					<button
						type='submit'
						className='bg-white text-gray-900 px-6 py-3 rounded-lg font-medium
  hover:bg-gray-100 transition'>
						Sign in with Google
					</button>
				</form>
			</div>
		</main>
	);
}
