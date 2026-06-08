'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WeightLog {
	id: string;
	loggedDate: string;
	weight: number;
	notes?: string | null;
}

export function WeightTracker({
	logs,
	goalWeight,
}: {
	logs: WeightLog[];
	goalWeight: number | null;
}) {
	const router = useRouter();
	const [saving, setSaving] = useState(false);

	const latest = logs[0]?.weight ?? null;
	const delta =
		latest && goalWeight ? (latest - goalWeight).toFixed(1) : null;

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSaving(true);
		const form = e.currentTarget;

		await fetch('/api/weight', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				loggedDate: form.loggedDate.value,
				weight: parseFloat(form.weight.value),
				notes: form.notes.value || null,
			}),
		});

		form.reset();
		setSaving(false);
		router.refresh();
	}

	async function handleDelete(id: string) {
		await fetch(`/api/weight/${id}`, { method: 'DELETE' });
		router.refresh();
	}

	return (
		<div className='space-y-6'>
			{latest && (
				<div className='grid grid-cols-3 gap-4'>
					<div className='border rounded-lg p-4 bg-card'>
						<p className='text-sm text-muted-foreground'>
							Current Weight
						</p>
						<p className='text-2xl font-bold'>{latest} lbs</p>
					</div>
					{goalWeight && (
						<div className='border rounded-lg p-4 bg-card'>
							<p className='text-sm text-muted-foreground'>
								Goal Weight
							</p>
							<p className='text-2xl font-bold'>
								{goalWeight} lbs
							</p>
						</div>
					)}
					{delta && (
						<div className='border rounded-lg p-4 bg-card'>
							<p className='text-sm text-muted-foreground'>
								To Goal
							</p>
							<p className='text-2xl font-bold'>{delta} lbs</p>
						</div>
					)}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className='border rounded-lg p-6
  space-y-4 bg-card'>
				<h3 className='font-semibold'>Log Weight</h3>
				<div className='grid grid-cols-3 gap-4'>
					<div className='space-y-2'>
						<Label>Date</Label>
						<Input
							name='loggedDate'
							type='date'
							defaultValue={
								new Date().toISOString().split('T')[0]
							}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label>Weight (lbs)</Label>
						<Input
							name='weight'
							type='number'
							step='0.1'
							placeholder='e.g. 230'
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label>Notes</Label>
						<Input name='notes' placeholder='optional' />
					</div>
				</div>
				<Button type='submit' disabled={saving}>
					{saving ? 'Saving...' : 'Log Weight'}
				</Button>
			</form>

			{logs.length > 0 && (
				<div className='space-y-2'>
					<h3 className='font-semibold'>History</h3>
					{logs.map((log) => (
						<div
							key={log.id}
							className='flex items-center
  justify-between p-3 border rounded-lg bg-card'>
							<div>
								<span className='font-medium'>
									{log.weight} lbs
								</span>
								<span
									className='text-sm text-muted-foreground
  ml-3'>
									{log.loggedDate}
								</span>
								{log.notes && (
									<span
										className='text-sm
  text-muted-foreground ml-3'>
										{log.notes}
									</span>
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
			)}
		</div>
	);
}
