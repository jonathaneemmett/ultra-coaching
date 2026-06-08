export type WorkoutType =
	| 'easy'
	| 'long'
	| 'tempo'
	| 'interval'
	| 'repetition'
	| 'recovery'
	| 'race'
	| 'cross'
	| 'rest';

export type DanielsPhase = 'base' | 'quality1' | 'quality2' | 'quality3';

export type PaceZone = 'E' | 'M' | 'T' | 'I' | 'R';

export interface VdotPaces {
	easy: string;
	marathon: string;
	threshold: string;
	interval: string;
	repetition: string;
}

export interface PlanGenerationInput {
	raceName: string;
	raceDistance: string;
	raceDate: string;
	vdot: number;
	currentWeeklyMileage: number;
	availableDays: number;
	terrain: 'road' | 'trail' | 'track' | 'mixed';
}

export interface GeneratedWorkout {
	dayOfWeek: number;
	type: WorkoutType;
	distance?: number;
	paceZone?: PaceZone;
	targetPacePerMile?: string;
	description: string;
}

export interface GeneratedWeek {
	weekNumber: number;
	theme: string;
	totalMileage: number;
	workouts: GeneratedWorkout[];
}

export interface GeneratedPlan {
	planSummary: string;
	weeks: GeneratedWeek[];
}
