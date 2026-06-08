import { auth } from '@/auth';
import { db } from '@/lib/db';
import { workoutLogs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ workoutId: string }> },
) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { workoutId } = await params;
	const body = await req.json();

	const updated = await db
		.update(workoutLogs)
		.set({ ...body, updatedAt: new Date() })
		.where(
			and(
				eq(workoutLogs.id, workoutId),
				eq(workoutLogs.userId, session.user.id),
			),
		)
		.returning();

	return NextResponse.json({ data: updated[0] });
}

export async function DELETE(
	_req: Request,
	{ params }: { params: Promise<{ workoutId: string }> },
) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { workoutId } = await params;

	await db
		.delete(workoutLogs)
		.where(
			and(
				eq(workoutLogs.id, workoutId),
				eq(workoutLogs.userId, session.user.id),
			),
		);

	return NextResponse.json({ success: true });
}
