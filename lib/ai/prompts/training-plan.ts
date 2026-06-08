interface PlanGenerationInput {
	raceName: string;
	raceDistance: string;
	raceDate: string;
	vdot: number;
	currentWeeklyMileage: number;
	availableDays: number;
	terrain: string;
	athleteName: string;
}

export function buildTrainingPlanPrompt(input: PlanGenerationInput): string {
	const weeksToRace = Math.ceil(
		(new Date(input.raceDate).getTime() - Date.now()) /
			(7 * 24 * 60 * 60 * 1000),
	);

	return `
  Generate a complete ${weeksToRace}-week training plan for
  ${input.athleteName}.

  ATHLETE PROFILE:
  - Race: ${input.raceName} (${input.raceDistance})
  - Race Date: ${input.raceDate} (${weeksToRace} weeks away)
  - Current VDOT: ${input.vdot}
  - Current Weekly Mileage: ${input.currentWeeklyMileage} miles/week
  - Available Training Days: ${input.availableDays} days/week
  - Primary Terrain: ${input.terrain}

  Return a JSON object in this exact format:
  {
    "planSummary": "Brief overview of the plan",
    "weeks": [
      {
        "weekNumber": 1,
        "theme": "Base Building",
        "totalMileage": 35,
        "workouts": [
          {
            "dayOfWeek": 1,
            "type": "easy",
            "distance": 6,
            "paceZone": "E",
            "targetPacePerMile": "10:30",
            "description": "Easy 6 miles at conversational pace"
          }
        ]
      }
    ]
  }

  Use Jack Daniels VDOT ${input.vdot} to calculate all training paces.
  Structure phases appropriately for ${input.raceDistance} ultra
  distance.
  Return only the JSON object, no other text.
  `;
}
