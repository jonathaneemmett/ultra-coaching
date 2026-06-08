import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { trainingPlans } from './training-plans';

export const chatSessions = pgTable('chat_sessions', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	planId: uuid('plan_id').references(() => trainingPlans.id, {
		onDelete: 'set null',
	}),

	title: text('title'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chatMessages = pgTable('chat_messages', {
	id: uuid('id').primaryKey().defaultRandom(),
	sessionId: uuid('session_id')
		.notNull()
		.references(() => chatSessions.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	role: text('role').$type<'user' | 'assistant'>().notNull(),
	content: text('content').notNull(),
	orderIndex: integer('order_index').notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
});
