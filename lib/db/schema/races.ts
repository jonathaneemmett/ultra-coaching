import {
	pgTable,
	text,
	real,
	date,
	timestamp,
	uuid,
	boolean,
	integer,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const races = pgTable('races', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	name: text('name').notNull(),
	distance: real('distance').notNull(),
	distanceType: text('distance_type')
		.$type<
			| '5k'
			| '10k'
			| 'half'
			| 'marathon'
			| '50k'
			| '50mi'
			| '100k'
			| '100mi'
			| 'custom'
		>()
		.notNull(),
	raceDate: date('race_date').notNull(),
	location: text('location'),
	elevationGain: real('elevation_gain'),
	isGoalRace: boolean('is_goal_race').default(false).notNull(),
	goalFinishTime: integer('goal_finish_time'),
	actualFinishTime: integer('actual_finish_time'),
	notes: text('notes'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
