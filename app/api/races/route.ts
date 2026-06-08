import { auth } from '@/auth';
import { db } from '@/lib/db';
import { races } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const result = await db
		.select()
		.from(races)
		.where(eq(races.userId, session.user.id))
		.orderBy(races.raceDate);

	return NextResponse.json({ data: result });
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();

	const created = await db
		.insert(races)
		.values({ userId: session.user.id, ...body })
		.returning();

	return NextResponse.json({ data: created[0] });
}
