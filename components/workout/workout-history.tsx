'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WorkoutLog {
	id: string;
	loggedDate: string;
	workoutType: string;
	distance?: number | null;
	duration?: number | null;
	elevationGain?: number | null;
	rpe?: number | null;
	notes?: string | null;
}

function formatDuration(seconds: number) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function WorkoutHistory({ logs }: { logs: WorkoutLog[] }) {
	const router = useRouter();

	async function handleDelete(id: string) {
		await fetch(`/api/workouts/${id}`, { method: 'DELETE' });
		router.refresh();
	}

	if (logs.length === 0) {
		return (
			<p className='text-muted-foreground text-sm'>
				No workouts logged yet.
			</p>
		);
	}

	return (
		<div className='space-y-3'>
			<h3 className='font-semibold'>Recent Workouts</h3>
			{logs.map((log) => (
				<div
					key={log.id}
					className='flex items-center justify-between
  p-4 border rounded-lg bg-card'>
					<div>
						<p className='font-medium capitalize'>
							{log.workoutType}
						</p>
						<p className='text-sm text-muted-foreground'>
							{log.loggedDate}
							{log.distance && ` · ${log.distance} mi`}
							{log.duration &&
								` · ${formatDuration(log.duration)}`}
							{log.elevationGain && ` · ${log.elevationGain} ft`}
							{log.rpe && ` · RPE ${log.rpe}`}
						</p>
						{log.notes && (
							<p
								className='text-sm text-muted-foreground
  mt-1'>
								{log.notes}
							</p>
						)}
					</div>
					<button
						onClick={() => handleDelete(log.id)}
						className='text-muted-foreground hover:text-destructive'>
						<Trash2 className='h-4 w-4' />
					</button>
				</div>
			))}
		</div>
	);
}
