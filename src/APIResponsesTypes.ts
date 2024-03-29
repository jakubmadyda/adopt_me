export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export interface Pet {
    id: number;
    name: string;
    animal: Animal;
    description: string;
    breed: string;
    images: string[];
    city: string;
    state: string;
    activeImage?: number;
}

export interface PetAPIResponse {
    numberOfResults: number;
    startIndex: number;
    endIndex: number;
    hasNext: boolean;
    pets: Pet[];
}

export interface BreedListApiResponse {
    animal: Animal;
    breeds: string[];
}