import {
	pgTable,
	text,
	integer,
	real,
	date,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { plannedWorkouts } from './training-plans';

export const workoutLogs = pgTable('workout_logs', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	plannedWorkoutId: uuid('planned_workout_id').references(
		() => plannedWorkouts.id,
		{ onDelete: 'set null' },
	),

	source: text('source')
		.$type<'manual' | 'garmin'>()
		.default('manual')
		.notNull(),
	garminActivityId: text('garmin_activity_id').unique(),

	loggedDate: date('logged_date').notNull(),
	workoutType: text('workout_type')
		.$type<
			| 'easy'
			| 'long'
			| 'tempo'
			| 'interval'
			| 'repetition'
			| 'recovery'
			| 'race'
			| 'cross'
			| 'other'
		>()
		.notNull(),

	distance: real('distance'),
	duration: integer('duration'),
	elevationGain: real('elevation_gain'),
	averagePace: integer('average_pace'),
	averageHeartRate: integer('average_heart_rate'),
	maxHeartRate: integer('max_heart_rate'),
	averageCadence: integer('average_cadence'),
	calories: integer('calories'),

	rpe: integer('rpe'),
	notes: text('notes'),
	feelingRating: integer('feeling_rating'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
