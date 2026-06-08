import {
	pgTable,
	text,
	real,
	date,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const weightLogs = pgTable('weight_logs', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	loggedDate: date('logged_date').notNull(),
	weight: real('weight').notNull(),
	bodyFatPercent: real('body_fat_percent'),
	notes: text('notes'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
});
