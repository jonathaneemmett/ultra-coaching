import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { weightLogs, athleteProfiles } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { WeightTracker } from '@/components/weight/weight-tracker';

export default async function WeightPage() {
	const session = await auth();
	if (!session?.user?.id) redirect('/');

	const [logs, profile] = await Promise.all([
		db
			.select()
			.from(weightLogs)
			.where(eq(weightLogs.userId, session.user.id))
			.orderBy(desc(weightLogs.loggedDate))
			.limit(90),
		db
			.select()
			.from(athleteProfiles)
			.where(eq(athleteProfiles.userId, session.user.id))
			.limit(1),
	]);

	return (
		<div className='space-y-6 max-w-3xl'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Weight</h2>
				<p className='text-muted-foreground'>
					Track progress toward your race weight
				</p>
			</div>
			<WeightTracker
				logs={logs}
				goalWeight={profile[0]?.goalRaceWeight ?? null}
			/>
		</div>
	);
}
