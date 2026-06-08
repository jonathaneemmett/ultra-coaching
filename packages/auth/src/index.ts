export { auth, currentUser, clerkClient } from '@clerk/nextjs/server';

export async function getOrCreateDbUser(clerkUserId: string, email: string) {
	const { db, users } = await import('@ultra/db');
	const { eq } = await import('drizzle-orm');

	const existing = await db
		.select()
		.from(users)
		.where(eq(users.id, clerkUserId))
		.limit(1);

	if (existing.length > 0) return existing[0];

	const [created] = await db
		.insert(users)
		.values({ id: clerkUserId, email })
		.returning();

	return created;
}
