import React from "react";
import { Course } from "../types";

type Props = {
  course: Course | null;
  onClose: () => void;
};

export default function CourseDetailModal({ course, onClose }: Props) {
  if (!course) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg p-8 shadow-xl relative">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>&larr;</button>
        <h2 className="text-xl font-bold mb-2">
          {course.code} - {course.title}
          <span className="ml-3 text-sm text-gray-400 font-mono">#{course.courseCode}</span>
        </h2>
        <div className="text-gray-600 mb-2">{course.description}</div>
        <div className="mb-1"><b>Instructor:</b> {course.instructor}</div>
        <div className="mb-1"><b>Term:</b> {course.term}</div>
        {course.geCategory && course.geCategory.length > 0 && (
          <div className="mb-1">
            <b>GE Category:</b> {course.geCategory.join(", ")}
          </div>
        )}
        <div className="mb-1"><b>Code:</b> {course.courseCode}</div>
        <div className="mb-1"><b>Time:</b> {course.time}</div>
        <div className="mb-1"><b>Location:</b> {course.location}</div>
        <div className="mb-1"><b>Status:</b> {course.status}</div>
        <div className="mb-1"><b>Days:</b> {course.days.join(", ")}</div>
        <div className="mb-1"><b>Enrolled:</b> {course.enrolled}/{course.capacity}</div>
        <div className="mb-1"><b>Units:</b> {course.units}</div>
        <div className="mb-1"><b>Prerequisites:</b> {course.prerequisites || "None"}</div>
      </div>
    </div>
  );
}
