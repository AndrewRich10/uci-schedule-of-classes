import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import CalendarPage from "./pages/CalendarPage";
import { Course } from "./types";

export default function App() {
  const [calendarCourses, setCalendarCourses] = useState<Course[]>([]);

  const handleAddToCalendar = (course: Course) => {
    setCalendarCourses(prev =>
      prev.some(c => c.code === course.code && c.courseCode === course.courseCode)
        ? prev
        : [...prev, course]
    );
  };

  const handleRemoveFromCalendar = (courseCode: string) => {
    setCalendarCourses(prev =>
      prev.filter(c => c.courseCode !== courseCode)
    );
  };

  return (
    <Router>
      <nav className="flex justify-center gap-6 py-4 bg-gray-100">
        <Link to="/" className="font-bold text-uci-blue hover:underline">Search</Link>
        <Link to="/calendar" className="font-bold text-uci-blue hover:underline">Calendar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage onAddToCalendar={handleAddToCalendar} />} />
        <Route path="/calendar" element={
          <CalendarPage
            calendarCourses={calendarCourses}
            onRemove={handleRemoveFromCalendar}
          />
        } />
      </Routes>
    </Router>
  );
}
