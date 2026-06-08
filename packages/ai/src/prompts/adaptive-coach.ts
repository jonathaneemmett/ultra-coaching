interface AthleteContext {
	currentWeeklyMileage: number;
	vdot: number;
	goalRace?: {
		name: string;
		date: string;
		distance: string;
	};
	recentWorkouts?: {
		date: string;
		type: string;
		distance?: number;
		completed: boolean;
	}[];
	currentWeight?: number;
	goalWeight?: number;
}

export function buildAthleteContext(context: AthleteContext): string {
	const recentWorkoutsSummary = context.recentWorkouts
		?.map(
			(w) =>
				`- ${w.date}: ${w.type} ${
					w.distance
						? `(${w.distance}
  miles)`
						: ''
				} — ${w.completed ? 'completed' : 'missed'}`,
		)
		.join('\n');

	return `
  CURRENT ATHLETE CONTEXT:
  - VDOT: ${context.vdot}
  - Current Weekly Mileage: ${context.currentWeeklyMileage} miles/week
  ${
		context.goalRace
			? `- Goal Race: ${context.goalRace.name}
  (${context.goalRace.distance}) on ${context.goalRace.date}`
			: ''
  }
  ${
		context.currentWeight
			? `- Current Weight:
  ${context.currentWeight} lbs`
			: ''
  }
  ${
		context.goalWeight
			? `- Goal Race Weight: ${context.goalWeight}
  lbs`
			: ''
  }

  ${
		recentWorkoutsSummary
			? `RECENT
  WORKOUTS:\n${recentWorkoutsSummary}`
			: ''
  }
  `;
}
