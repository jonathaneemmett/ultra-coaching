import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const garminTokens = pgTable('garmin_tokens', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
		.unique(),

	accessToken: text('access_token').notNull(),
	accessTokenSecret: text('access_token_secret').notNull(),
	garminUserId: text('garmin_user_id'),
	lastSyncAt: timestamp('last_sync_at'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
