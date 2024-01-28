export interface Courses {
  readonly id: number;
  title: string;
  description: string;
  review: number;
  days: string;
  start: string;
  price: number;
  number: string;
  remote: boolean;
  image: string;
  teacher: string;
  students: string[];
  daysDifference?: number | undefined;
}