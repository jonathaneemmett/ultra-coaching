import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { races } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { RaceList } from '@/components/races/race-list';

export default async function RacesPage() {
	const session = await auth();
	if (!session?.user?.id) redirect('/');

	const result = await db
		.select()
		.from(races)
		.where(eq(races.userId, session.user.id))
		.orderBy(races.raceDate);

	return (
		<div className='space-y-6 max-w-3xl'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Races</h2>
				<p className='text-muted-foreground'>
					Your upcoming and past races
				</p>
			</div>
			<RaceList races={result} />
		</div>
	);
}
