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

interface Profile {
	vdot?: number | null;
	currentWeeklyMileage?: number | null;
	currentWeight?: number | null;
	goalRaceWeight?: number | null;
	height?: number | null;
	availableTrainingDays?: number | null;
	primaryTerrain?: string | null;
}

export function ProfileForm({ profile }: { profile: Profile | null }) {
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSaving(true);

		const form = e.currentTarget;
		const data = {
			vdot: parseFloat(form.vdot.value) || null,
			currentWeeklyMileage:
				parseFloat(form.currentWeeklyMileage.value) || null,
			currentWeight: parseFloat(form.currentWeight.value) || null,
			goalRaceWeight: parseFloat(form.goalRaceWeight.value) || null,
			height: parseFloat(form.height.value) || null,
			availableTrainingDays:
				parseInt(form.availableTrainingDays.value) || 5,
			primaryTerrain: form.primaryTerrain.value,
		};

		await fetch('/api/user/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		setSaving(false);
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<Label htmlFor='vdot'>VDOT Score</Label>
					<Input
						id='vdot'
						name='vdot'
						type='number'
						step='0.1'
						defaultValue={profile?.vdot ?? ''}
						placeholder='e.g. 43'
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='currentWeeklyMileage'>
						Current Weekly Mileage
					</Label>
					<Input
						id='currentWeeklyMileage'
						name='currentWeeklyMileage'
						type='number'
						step='0.1'
						defaultValue={profile?.currentWeeklyMileage ?? ''}
						placeholder='e.g. 40'
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='currentWeight'>Current Weight (lbs)</Label>
					<Input
						id='currentWeight'
						name='currentWeight'
						type='number'
						step='0.1'
						defaultValue={profile?.currentWeight ?? ''}
						placeholder='e.g. 230'
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='goalRaceWeight'>
						Goal Race Weight (lbs)
					</Label>
					<Input
						id='goalRaceWeight'
						name='goalRaceWeight'
						type='number'
						step='0.1'
						defaultValue={profile?.goalRaceWeight ?? ''}
						placeholder='e.g. 214'
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='height'>Height (inches)</Label>
					<Input
						id='height'
						name='height'
						type='number'
						step='0.1'
						defaultValue={profile?.height ?? ''}
						placeholder='e.g. 72'
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='availableTrainingDays'>
						Training Days per Week
					</Label>
					<Input
						id='availableTrainingDays'
						name='availableTrainingDays'
						type='number'
						min='1'
						max='7'
						defaultValue={profile?.availableTrainingDays ?? 5}
					/>
				</div>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='primaryTerrain'>Primary Terrain</Label>
				<Select
					name='primaryTerrain'
					defaultValue={profile?.primaryTerrain ?? 'mixed'}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='road'>Road</SelectItem>
						<SelectItem value='trail'>Trail</SelectItem>
						<SelectItem value='track'>Track</SelectItem>
						<SelectItem value='mixed'>Mixed</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button type='submit' disabled={saving}>
				{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
			</Button>
		</form>
	);
}
