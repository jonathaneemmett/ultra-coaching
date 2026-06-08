import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { athleteProfiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { ProfileForm } from '@/components/settings/profile-form';

export default async function SettingsPage() {
	const session = await auth();
	if (!session?.user?.id) redirect('/');

	const profile = await db
		.select()
		.from(athleteProfiles)
		.where(eq(athleteProfiles.userId, session.user.id))
		.limit(1);

	return (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Settings</h2>
				<p className='text-muted-foreground'>
					Your athlete profile and preferences
				</p>
			</div>
			<ProfileForm profile={profile[0] ?? null} />
		</div>
	);
}
