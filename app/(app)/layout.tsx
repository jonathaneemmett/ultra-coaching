import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session) redirect('/');

	return (
		<div className='flex h-screen bg-background'>
			<Sidebar />
			<main
				className='flex-1 overflow-y-auto
  p-8'>
				{children}
			</main>
		</div>
	);
}
