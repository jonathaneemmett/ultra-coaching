import { auth } from '@/auth';
import { db } from '@/lib/db';
import { weightLogs } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const result = await db
		.select()
		.from(weightLogs)
		.where(eq(weightLogs.userId, session.user.id))
		.orderBy(desc(weightLogs.loggedDate))
		.limit(90);

	return NextResponse.json({ data: result });
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();

	const created = await db
		.insert(weightLogs)
		.values({ userId: session.user.id, ...body })
		.returning();

	return NextResponse.json({ data: created[0] });
}
