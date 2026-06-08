import {
	pgTable,
	text,
	integer,
	real,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const athleteProfiles = pgTable('athlete_profiles', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
		.unique(),

	vdot: real('vdot'),
	currentWeeklyMileage: real('current_weekly_mileage'),

	currentWeight: real('current_weight'),
	goalRaceWeight: real('goal_race_weight'),
	height: real('height'),

	preferredUnits: text('preferred_units')
		.$type<'imperial' | 'metric'>()
		.default('imperial')
		.notNull(),
	availableTrainingDays: integer('available_training_days')
		.default(5)
		.notNull(),
	primaryTerrain: text('primary_terrain')
		.$type<'road' | 'trail' | 'track' | 'mixed'>()
		.default('mixed')
		.notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
