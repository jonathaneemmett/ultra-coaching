import {
	pgTable,
	text,
	integer,
	real,
	date,
	timestamp,
	uuid,
	boolean,
	jsonb,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { races } from './races';

export const trainingPlans = pgTable('training_plans', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	raceId: uuid('race_id').references(() => races.id, {
		onDelete: 'set null',
	}),

	name: text('name').notNull(),
	status: text('status')
		.$type<'active' | 'completed' | 'archived'>()
		.default('active')
		.notNull(),

	inputVdot: real('input_vdot').notNull(),
	inputWeeklyMileage: real('input_weekly_mileage').notNull(),
	inputAvailableDays: integer('input_available_days').notNull(),
	inputTerrain: text('input_terrain')
		.$type<'road' | 'trail' | 'track' | 'mixed'>()
		.notNull(),
	inputRaceDistance: text('input_race_distance').notNull(),

	startDate: date('start_date').notNull(),
	endDate: date('end_date').notNull(),
	totalWeeks: integer('total_weeks').notNull(),

	rawPlanJson: jsonb('raw_plan_json'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const plannedWorkouts = pgTable('planned_workouts', {
	id: uuid('id').primaryKey().defaultRandom(),
	planId: uuid('plan_id')
		.notNull()
		.references(() => trainingPlans.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	weekNumber: integer('week_number').notNull(),
	dayOfWeek: integer('day_of_week').notNull(),
	scheduledDate: date('scheduled_date').notNull(),

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
			| 'rest'
		>()
		.notNull(),

	targetDistance: real('target_distance'),
	targetDuration: integer('target_duration'),
	targetPace: integer('target_pace'),
	targetHeartRate: integer('target_heart_rate'),
	description: text('description').notNull(),
	danielsPhase: text('daniels_phase').$type<
		'base' | 'quality1' | 'quality2' | 'quality3'
	>(),

	isCompleted: boolean('is_completed').default(false).notNull(),
	isSkipped: boolean('is_skipped').default(false).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
