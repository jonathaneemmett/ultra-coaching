import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { workoutLogs } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { WorkoutLogForm } from '@/components/workout/workout-log-form';
import { WorkoutHistory } from '@/components/workout/workout-history';

export default async function LogPage() {
	const session = await auth();
	if (!session?.user?.id) redirect('/');

	const logs = await db
		.select()
		.from(workoutLogs)
		.where(eq(workoutLogs.userId, session.user.id))
		.orderBy(desc(workoutLogs.loggedDate))
		.limit(20);

	return (
		<div className='space-y-8 max-w-3xl'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>
					Log Workout
				</h2>
				<p className='text-muted-foreground'>Record your training</p>
			</div>
			<WorkoutLogForm />
			<WorkoutHistory logs={logs} />
		</div>
	);
}
