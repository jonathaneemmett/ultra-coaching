import { auth } from '@/auth';
import { db } from '@/lib/db';
import { athleteProfiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const profile = await db
		.select()
		.from(athleteProfiles)
		.where(eq(athleteProfiles.userId, session.user.id))
		.limit(1);

	return NextResponse.json({ data: profile[0] ?? null });
}

export async function PUT(req: Request) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();

	const existing = await db
		.select()
		.from(athleteProfiles)
		.where(eq(athleteProfiles.userId, session.user.id))
		.limit(1);

	if (existing.length === 0) {
		const created = await db
			.insert(athleteProfiles)
			.values({ userId: session.user.id, ...body })
			.returning();
		return NextResponse.json({ data: created[0] });
	}

	const updated = await db
		.update(athleteProfiles)
		.set({ ...body, updatedAt: new Date() })
		.where(eq(athleteProfiles.userId, session.user.id))
		.returning();

	return NextResponse.json({ data: updated[0] });
}
