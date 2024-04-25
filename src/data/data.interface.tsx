export interface People {
  people: Human[];
}

export interface Human {
  name: string;
  age?: number;
  city?: string;
  population?: number;
  isWorking?: boolean;
  details?: {
    education?: string;
    profession?: string;
    language?: string[];
  };
}