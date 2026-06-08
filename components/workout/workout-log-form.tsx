'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export function WorkoutLogForm() {
	const router = useRouter();
	const [saving, setSaving] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSaving(true);
		const form = e.currentTarget;

		await fetch('/api/workouts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				loggedDate: form.loggedDate.value,
				workoutType: form.workoutType.value,
				distance: parseFloat(form.distance.value) || null,
				duration: form.duration.value
					? parseInt(form.duration.value) * 60
					: null,
				elevationGain: parseFloat(form.elevationGain.value) || null,
				rpe: parseInt(form.rpe.value) || null,
				notes: form.notes.value || null,
			}),
		});

		form.reset();
		setSaving(false);
		router.refresh();
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='border rounded-lg p-6
  space-y-4 bg-card'>
			<h3 className='font-semibold'>New Entry</h3>
			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<Label>Date</Label>
					<Input
						name='loggedDate'
						type='date'
						defaultValue={new Date().toISOString().split('T')[0]}
						required
					/>
				</div>
				<div className='space-y-2'>
					<Label>Type</Label>
					<Select name='workoutType' defaultValue='easy'>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='easy'>Easy</SelectItem>
							<SelectItem value='long'>Long Run</SelectItem>
							<SelectItem value='tempo'>Tempo</SelectItem>
							<SelectItem value='interval'>Interval</SelectItem>
							<SelectItem value='repetition'>
								Repetition
							</SelectItem>
							<SelectItem value='recovery'>Recovery</SelectItem>
							<SelectItem value='race'>Race</SelectItem>
							<SelectItem value='cross'>
								Cross Training
							</SelectItem>
							<SelectItem value='other'>Other</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='space-y-2'>
					<Label>Distance (miles)</Label>
					<Input
						name='distance'
						type='number'
						step='0.01'
						placeholder='e.g. 8.5'
					/>
				</div>
				<div className='space-y-2'>
					<Label>Duration (minutes)</Label>
					<Input
						name='duration'
						type='number'
						placeholder='e.g. 75'
					/>
				</div>
				<div className='space-y-2'>
					<Label>Elevation Gain (ft)</Label>
					<Input
						name='elevationGain'
						type='number'
						placeholder='e.g.
  1200'
					/>
				</div>
				<div className='space-y-2'>
					<Label>RPE (1–10)</Label>
					<Input
						name='rpe'
						type='number'
						min='1'
						max='10'
						placeholder='e.g. 6'
					/>
				</div>
			</div>
			<div className='space-y-2'>
				<Label>Notes</Label>
				<Input name='notes' placeholder='How did it feel?' />
			</div>
			<Button type='submit' disabled={saving}>
				{saving ? 'Saving...' : 'Log Workout'}
			</Button>
		</form>
	);
}
