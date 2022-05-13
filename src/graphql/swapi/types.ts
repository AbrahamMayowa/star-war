export interface People {
        name: string;
        height: string;
        mass: string;
        gender: string;
        homeworld: string;
}

export interface PeopleResponse {
    peoples: People[];
    count: number;
    next: number | null;
}