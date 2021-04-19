interface Person {
    "id": number,
	"name"?: string,
	"height"?: string,
	"mass"?: string,
	"hair_color"?: string,
	"skin_color"?: string,
	"eye_color"?: string,
	"birth_year"?: string,
	"gender"?: string,
	"homeworld"?: string,
	"films"?: string[],
	"species"?: string[],
	"vehicles"?: string[],
	"starships"?: string[],
	"created"?: string,
	"edited"?: string,
	"url"?: string,
	"filmTitles"?: string[]
}

// after part 6
export const age = (birth_year: string | undefined): string => {
	if (birth_year) {
		if (birth_year !== "unknown") {
			const bby = parseInt(birth_year.substring(0, birth_year.length - 3));
			return ((bby + 4) as unknown) as string;
		} else {
			return "unknown";
		}
	} else {
		
		return "unknown";
	}
}

export default Person;