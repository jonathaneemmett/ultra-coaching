import { auth } from '@/auth';
import { db } from '@/lib/db';
import { races } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ raceId: string }> },
) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { raceId } = await params;
	const body = await req.json();

	const updated = await db
		.update(races)
		.set({ ...body, updatedAt: new Date() })
		.where(and(eq(races.id, raceId), eq(races.userId, session.user.id)))
		.returning();

	return NextResponse.json({ data: updated[0] });
}

export async function DELETE(
	_req: Request,
	{ params }: { params: Promise<{ raceId: string }> },
) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { raceId } = await params;

	await db
		.delete(races)
		.where(and(eq(races.id, raceId), eq(races.userId, session.user.id)));

	return NextResponse.json({ success: true });
}
