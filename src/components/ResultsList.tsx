import React from "react";
import { Course } from "../types";
import CourseCard from "./CourseCard";

type Props = {
  courses: Course[];
  onSelect: (course: Course) => void;
};

export default function ResultsList({ courses, onSelect, onAddToCalendar }: {
  courses: Course[];
  onSelect: (course: Course) => void;
  onAddToCalendar: (course: Course) => void;
}) {
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.code + course.courseCode}
          course={course}
          onSelect={onSelect}
          onAddToCalendar={onAddToCalendar}
        />
      ))}
    </div>
  );
}