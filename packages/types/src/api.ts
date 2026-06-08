export interface ApiResponse<T> {
	data?: T;
	error?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
}

export interface CreateWorkoutLogInput {
	loggedDate: string;
	workoutType: string;
	distance?: number;
	duration?: number;
	elevationGain?: number;
	averagePace?: number;
	averageHeartRate?: number;
	rpe?: number;
	notes?: string;
	feelingRating?: number;
	plannedWorkoutId?: string;
}

export interface CreateWeightLogInput {
	loggedDate: string;
	weight: number;
	bodyFatPercent?: number;
	notes?: string;
}

export interface CreateRaceInput {
	name: string;
	distance: number;
	distanceType: string;
	raceDate: string;
	location?: string;
	elevationGain?: number;
	isGoalRace?: boolean;
	goalFinishTime?: number;
	notes?: string;
}

export interface UpdateAthleteProfileInput {
	vdot?: number;
	currentWeeklyMileage?: number;
	currentWeight?: number;
	goalRaceWeight?: number;
	height?: number;
	preferredUnits?: 'imperial' | 'metric';
	availableTrainingDays?: number;
	primaryTerrain?: 'road' | 'trail' | 'track' | 'mixed';
}
