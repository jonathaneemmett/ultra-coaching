import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const session = await auth();
	if (!session) redirect('/');

	return (
		<div className='space-y-6'>
			<div>
				<h2
					className='text-3xl font-bold
  tracking-tight'>
					Dashboard
				</h2>
				<p className='text-muted-foreground'>
					Welcome back,
					{session.user?.name}
				</p>
			</div>
			<form
				action={async () => {
					'use server';
					await signOut({ redirectTo: '/' });
				}}>
				<button
					type='submit'
					className='text-sm text-muted-foreground
  hover:text-foreground'>
					Sign out
				</button>
			</form>
		</div>
	);
}
