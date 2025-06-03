import React, { useState } from "react";
import { Calendar, Clock, User, MapPin, Hash } from "lucide-react";
import { Course } from "../types";

type Props = {
  course: Course;
  onSelect: (course: Course) => void;
  onAddToCalendar?: (course: Course) => void; // Optional for ResultsPage
};

export default function CourseCard({ course, onSelect, onAddToCalendar }: Props) {
  const [showPrereqPopup, setShowPrereqPopup] = useState(false);

  const enrolledColor =
    course.enrolled < course.capacity
      ? "text-green-600"
      : "text-red-600";

  return (
    <div
      className="rounded-2xl shadow-lg bg-white overflow-hidden mb-6 cursor-pointer transition hover:shadow-xl"
      onClick={() => onSelect(course)}
    >
      {/* Header */}
      <div className="bg-uci-blue px-6 py-4 flex items-center justify-between">
        <div className="text-white text-lg font-bold tracking-wide">
          {course.code}  -  {course.title}
        </div>
        <div className="flex items-center gap-2">
          {/* Info icon or link */}
          <button
            className="text-white/80 hover:text-white text-lg"
            title="More info"
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <i className="lucide lucide-info"></i>
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-8 justify-between">
          {/* Left column */}
          <div className="flex flex-col gap-3 relative">
            <a
              href="#"
              className="text-blue-700 underline text-sm mb-1"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setShowPrereqPopup(true);
                setTimeout(() => setShowPrereqPopup(false), 1700);
              }}
            >
              View Prerequisites
            </a>
            {showPrereqPopup && (
              <div className="absolute z-10 left-0 mt-2 px-3 py-2 bg-blue-100 text-blue-900 text-xs rounded shadow">
                Prereqs soon to come
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Calendar className="w-4 h-4" />
              {course.days.join("/ ")}
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Clock className="w-4 h-4" />
              {course.time}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4" />
              <span className={enrolledColor}>
                {course.enrolled} / {course.capacity}
              </span>
            </div>
          </div>
          {/* Right column */}
          <div className="flex-1 flex flex-col gap-2 text-sm text-gray-800">
            <div className="flex gap-1 items-center">
              <span className="font-bold">Type:</span>
              <span>Lec (A)</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">Units:</span>
              <span>{course.units}</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">Instructor:</span>
              <span>{course.instructor}</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">Modality:</span>
              <span>{course.modality}</span>
            </div>
            <div className="flex gap-1 items-center">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{course.location}</span>
            </div>
            <div className="flex gap-1 items-center">
              <Hash className="w-4 h-4 text-gray-500" />
              <span>{course.courseCode}</span>
            </div>
            <div>
              <span className="font-bold">Restr:</span> <span>A</span>
            </div>
          </div>
          {/* Status */}
          <div className="flex items-start ml-2">
            <span className={`px-4 py-2 rounded-full text-xs font-bold ${course.status === "OPEN"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
              }`}>
              Status: {course.status}
            </span>
          </div>
        </div>
        {/* Add to Calendar Button */}
        {onAddToCalendar && (
          <div className="flex justify-end mt-4">
            <button
              className="bg-uci-blue text-white px-4 py-2 rounded hover:bg-blue-800 text-xs font-semibold"
              onClick={e => {
                e.stopPropagation();
                onAddToCalendar(course);
              }}
            >
              Add to Calendar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
