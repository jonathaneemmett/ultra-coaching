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
import { Flag, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Race {
	id: string;
	name: string;
	distanceType: string;
	raceDate: string;
	location?: string | null;
	elevationGain?: number | null;
	isGoalRace: boolean;
}

export function RaceList({ races }: { races: Race[] }) {
	const router = useRouter();
	const [adding, setAdding] = useState(false);
	const [saving, setSaving] = useState(false);

	async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSaving(true);
		const form = e.currentTarget;

		const distanceMap: Record<string, number> = {
			'5k': 3.1,
			'10k': 6.2,
			half: 13.1,
			marathon: 26.2,
			'50k': 31.1,
			'50mi': 50,
			'100k': 62.1,
			'100mi': 100,
		};
		const distanceType = form.distanceType.value;

		await fetch('/api/races', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: form.raceName.value,
				distanceType,
				distance: distanceMap[distanceType] ?? 0,
				raceDate: form.raceDate.value,
				location: form.location.value || null,
				elevationGain: parseFloat(form.elevationGain.value) || null,
				isGoalRace: form.isGoalRace.checked,
			}),
		});

		setSaving(false);
		setAdding(false);
		router.refresh();
	}

	async function handleDelete(raceId: string) {
		await fetch(`/api/races/${raceId}`, { method: 'DELETE' });
		router.refresh();
	}

	return (
		<div className='space-y-4'>
			{races.length === 0 && !adding && (
				<p className='text-muted-foreground text-sm'>
					No races yet. Add your goal race to get started.
				</p>
			)}

			{races.map((race) => (
				<div
					key={race.id}
					className='flex items-center justify-between
  p-4 border rounded-lg bg-card'>
					<div className='flex items-center gap-3'>
						<Flag className='h-4 w-4 text-muted-foreground' />
						<div>
							<p className='font-medium'>{race.name}</p>
							<p className='text-sm text-muted-foreground'>
								{race.distanceType} · {race.raceDate}
								{race.isGoalRace && (
									<span
										className='ml-2 text-primary
  font-medium'>
										Goal Race
									</span>
								)}
							</p>
						</div>
					</div>
					<button
						onClick={() => handleDelete(race.id)}
						className='text-muted-foreground hover:text-destructive'>
						<Trash2 className='h-4 w-4' />
					</button>
				</div>
			))}

			{adding && (
				<form
					onSubmit={handleAdd}
					className='border rounded-lg p-4
  space-y-4 bg-card'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label>Race Name</Label>
							<Input
								name='raceName'
								placeholder='e.g. Leadville 100'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label>Distance</Label>
							<Select name='distanceType' defaultValue='50mi'>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='5k'>5K</SelectItem>
									<SelectItem value='10k'>10K</SelectItem>
									<SelectItem value='half'>
										Half Marathon
									</SelectItem>
									<SelectItem value='marathon'>
										Marathon
									</SelectItem>
									<SelectItem value='50k'>50K</SelectItem>
									<SelectItem value='50mi'>
										50 Mile
									</SelectItem>
									<SelectItem value='100k'>100K</SelectItem>
									<SelectItem value='100mi'>
										100 Mile
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<Label>Race Date</Label>
							<Input name='raceDate' type='date' required />
						</div>
						<div className='space-y-2'>
							<Label>Location</Label>
							<Input
								name='location'
								placeholder='e.g. Leadville, CO'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Elevation Gain (ft)</Label>
							<Input
								name='elevationGain'
								type='number'
								placeholder='e.g. 15000'
							/>
						</div>
						<div className='flex items-center gap-2 pt-6'>
							<input
								type='checkbox'
								name='isGoalRace'
								id='isGoalRace'
							/>
							<Label htmlFor='isGoalRace'>Goal Race</Label>
						</div>
					</div>
					<div className='flex gap-2'>
						<Button type='submit' disabled={saving}>
							{saving ? 'Saving...' : 'Add Race'}
						</Button>
						<Button
							type='button'
							variant='outline'
							onClick={() => setAdding(false)}>
							Cancel
						</Button>
					</div>
				</form>
			)}

			{!adding && (
				<Button
					onClick={() => setAdding(true)}
					variant='outline'
					className='gap-2'>
					<Plus className='h-4 w-4' /> Add Race
				</Button>
			)}
		</div>
	);
}
