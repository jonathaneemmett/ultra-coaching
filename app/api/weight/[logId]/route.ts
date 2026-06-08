import { auth } from '@/auth';
import { db } from '@/lib/db';
import { weightLogs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(
	_req: Request,
	{ params }: { params: Promise<{ logId: string }> },
) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { logId } = await params;

	await db
		.delete(weightLogs)
		.where(
			and(
				eq(weightLogs.id, logId),
				eq(weightLogs.userId, session.user.id),
			),
		);

	return NextResponse.json({ success: true });
}
