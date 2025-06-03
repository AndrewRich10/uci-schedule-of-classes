export type Course = {
  code: string;
  courseCode: string;
  title: string;
  term: string;
  geCategory: string[];
  units: number;
  instructor: string;
  time: string;
  location: string;
  status: string;
  enrolled: number;
  capacity: number;
  days: string[];
  modality: string;
  description: string;
  prerequisites?: string;
  discussionSections?: any[];
};
