export interface DashboardData {
	todayWorkout: {
		id: string;
		type: string;
		targetDistance?: number;
		targetDuration?: number;
		targetPace?: number;
		description: string;
	} | null;
	weeklyMileage: {
		completed: number;
		target: number;
	};
	weight: {
		current: number | null;
		goal: number | null;
		unit: 'imperial' | 'metric';
	};
	nextRace: {
		name: string;
		date: string;
		daysUntil: number;
		distance: string;
	} | null;
	complianceScore: number;
}
