import React from "react";
import { Course } from "../types";

type Props = {
  calendarCourses: Course[];
  onRemove: (courseCode: string) => void;
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function getCoursesForDay(courses: Course[], day: string) {
  return courses.filter(c =>
    c.days.some(d => d.toLowerCase().startsWith(day.toLowerCase().slice(0, 3)))
  );
}

export default function CalendarPage({ calendarCourses, onRemove }: Props) {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-uci-blue">My Calendar</h2>
      <div className="grid grid-cols-5 gap-4">
        {weekdays.map(day => (
          <div key={day} className="bg-gray-100 rounded-xl p-4 min-h-[200px]">
            <div className="font-bold mb-2">{day}</div>
            {getCoursesForDay(calendarCourses, day).length === 0 ? (
              <div className="text-gray-400 text-sm">No Classes</div>
            ) : (
              getCoursesForDay(calendarCourses, day).map(course => (
                <div key={course.code + course.courseCode} className="bg-white rounded shadow px-2 py-1 mb-2">
                  <div className="text-sm font-semibold text-uci-blue">{course.code}</div>
                  <div className="text-xs text-gray-700">{course.title}</div>
                  <div className="text-xs">{course.time} ({course.location})</div>
                  <button
                    className="text-xs text-red-600 hover:underline mt-1"
                    onClick={() => onRemove(course.courseCode)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      {calendarCourses.length === 0 && (
        <div className="text-center text-gray-500 mt-8">Add classes from the search results to see them here!</div>
      )}
    </div>
  );
}
