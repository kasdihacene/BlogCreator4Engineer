export interface Experience {
    mission: string;
    startDate: string;
    endDate: string;
    entreprise: string;
    logo: string;
    description: string;
    technologies: Technology[];
    socles: Socle[];

}

export interface Technology {
    type: string;
    occurrences: string[];
}

export interface Socle {
    type: string;
    occurrences: string[];
}